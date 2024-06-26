import {
  ArrowBackOutlined,
  CheckCircle,
  RemoveCircle,
  SendOutlined,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { messageConnection } from "../../SignalR/messageConnection";
import { HubConnection } from "@microsoft/signalr";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast } from "../";

interface ChatUsersData {
  currentId: number;
  currentName: string;
  currentRole: string;
  recipientId: number;
  recipientName: string;
  recipientRole: string;
}

interface ChatUserDetails {
  userId: number;
  name: string;
  role: string;
}

interface ChatWindowProps {
  chatUsers: ChatUsersData;
  setChatWindowState: (state: boolean) => void;
  setSelectedUserData: (data: ChatUserDetails) => void;
  handleUpdateReadChats: (id: number) => void;
}

const ChatWindow = ({
  chatUsers,
  setChatWindowState,
  setSelectedUserData,
  handleUpdateReadChats,
}: ChatWindowProps) => {
  const [chatThread, setChatThread] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatConnection, setChatConnection] = useState<HubConnection | null>(
    null
  );
  const [error, setError] = useState<ErrorState>({
    state: false,
    message: "",
  });
  const messageAreaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleUpdateReadChats(chatUsers.recipientId);

    const connection = messageConnection(
      chatUsers.currentId,
      chatUsers.recipientId
    );

    connection
      .start()
      .then(() => {
        setChatConnection(connection);
      })
      .catch((_err) => {
        setError({
          ...error,
          state: true,
          message:
            "An error has occurred while trying to connect to chat services",
        });
      });

    connection.on("ReceiveMessageThread", (messages: ChatMessage[]) => {
      setChatThread(messages);
    });

    connection.on("NewMessage", (message: ChatMessage) => {
      setChatThread((prev) => [...prev, message]);
    });

    return () => {
      connection.off("ReceiveMessageThread");
      connection.off("NewMessage");
      connection.stop();
    };
  }, []);

  useEffect(() => {
    const notesAreaResize = () => {
      if (messageAreaRef.current) {
        messageAreaRef.current.style.height = "2rem";
        messageAreaRef.current.style.height =
          messageAreaRef.current.scrollHeight + "px";
      }
    };

    notesAreaResize();
    messageAreaRef.current?.addEventListener("input", notesAreaResize);

    return () => {
      messageAreaRef.current?.removeEventListener("input", notesAreaResize);
    };
  }, [message]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatThread]);

  const handleCloseChat = () => {
    setSelectedUserData({ userId: 0, name: "", role: "" });
    setChatWindowState(false);
  };

  const handleSendMessage = () => {
    const newMessage: ChatMessage = {
      content: message,
      dateSent: new Date().toISOString(),
      senderId: chatUsers.currentId,
      senderName: chatUsers.currentName,
      senderRole: chatUsers.currentRole,
      recipientId: chatUsers.recipientId,
      recipientName: chatUsers.recipientName,
      recipientRole: chatUsers.recipientRole,
      read: false,
    };
    chatConnection
      ?.invoke("SendMessage", newMessage)
      .then((_res) => {
        setMessage("");
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError({
            ...error,
            state: true,
            message:
              "An error has occurred while trying to send the message, please try again later or contact an administrator",
          });
        } else {
          setError({ state: true, message: err.response.data });
        }
      });
  };

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

  return (
    <section className="flex flex-grow flex-col overflow-y-auto">
      <div className="flex justify-between p-1 bg-slate-200 border-b border-slate-400">
        <button title="Back to Inbox" onClick={handleCloseChat}>
          <ArrowBackOutlined fontSize="inherit" /> Inbox
        </button>
        <h4>{`${chatUsers.recipientName} - ${chatUsers.recipientRole}`}</h4>
      </div>
      <section
        className="flex-grow overflow-y-scroll border-b border-slate-400"
        aria-live="polite"
        tabIndex={0}
      >
        <ul>
          {chatThread.map((message) => {
            if (message.senderId === chatUsers.currentId) {
              return (
                <li key={message.id}>
                  <section
                    aria-label={`You said ${parseIsoToDateTime(
                      message.dateSent
                    )}`}
                  >
                    <div className="m-1 py-1 px-2 rounded-2xl bg-blue-300">
                      {message.content}
                    </div>
                    <div
                      className="flex justify-between mx-2 text-xs text-neutral-700"
                      aria-hidden
                    >
                      <span>
                        {message.senderName}{" "}
                        <span
                          className="text-sm"
                          title={message.read ? "Read" : "Unread"}
                          aria-label={message.read ? "Read" : "Unread"}
                        >
                          {message.read ? (
                            <CheckCircle
                              className="text-blue-500"
                              fontSize="inherit"
                            />
                          ) : (
                            <RemoveCircle
                              className="text-neutral-400"
                              fontSize="inherit"
                            />
                          )}
                        </span>
                      </span>
                      <span>{parseIsoToDateTime(message.dateSent)}</span>
                    </div>
                  </section>
                </li>
              );
            } else {
              return (
                <li key={message.id}>
                  <section
                    aria-label={`${
                      message.senderName
                    } said ${parseIsoToDateTime(message.dateSent)}`}
                  >
                    <div className="m-1 py-1 px-2 rounded-2xl bg-slate-200">
                      {message.content}
                    </div>
                    <div
                      className="flex justify-between mx-2 text-xs text-neutral-700"
                      aria-hidden
                    >
                      <span>{message.senderName}</span>
                      <span>{parseIsoToDateTime(message.dateSent)}</span>
                    </div>
                  </section>
                </li>
              );
            }
          })}
          <div aria-hidden ref={messagesEndRef} />
        </ul>
        {error.state && (
          <Toast
            color={"failure"}
            message={error.message}
            handleErrorState={closeErrorState}
          />
        )}
      </section>
      <form
        className="flex justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="chatInput" className="sr-only">
          Message content
        </label>
        <textarea
          className="max-h-48 p-1 rounded-xl resize-none overflow-hidden"
          id="chatInput"
          placeholder="Write a message..."
          ref={messageAreaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="flex place-items-center mr-1 px-1 rounded-full bg-slate-200 hover:bg-blue-300 active:bg-blue-600 active:text-white"
          aria-label="Send Message"
          onClick={handleSendMessage}
        >
          Send
          <SendOutlined />
        </button>
      </form>
    </section>
  );
};

export default ChatWindow;
