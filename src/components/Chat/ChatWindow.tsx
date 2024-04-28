import { ArrowBackOutlined, SendOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { messageConnection } from "../../SignalR/messageConnection";
import { HubConnection } from "@microsoft/signalr";

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
}

const ChatWindow = ({
  chatUsers,
  setChatWindowState,
  setSelectedUserData,
}: ChatWindowProps) => {
  const [chatThread, setChatThread] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatConnection, setChatConnection] = useState<HubConnection | null>(
    null
  );
  const messageAreaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const connection = messageConnection(
      chatUsers.currentId,
      chatUsers.recipientId
    );

    connection
      .start()
      .then(() => {
        console.log("SignalR connection started");
        setChatConnection(connection);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      });
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
                      <span>{`${message.senderName} - ${message.senderRole}`}</span>
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
                      <span>{`${message.senderName} - ${message.senderRole}`}</span>
                      <span>{parseIsoToDateTime(message.dateSent)}</span>
                    </div>
                  </section>
                </li>
              );
            }
          })}
          <div aria-hidden ref={messagesEndRef} />
        </ul>
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
