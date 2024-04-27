import {
  ChatBubbleOutline,
  CloseOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getStaffMyColleagues } from "../../api/getStaffMyColleagues";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { getMyChatInbox } from "../../api/getMyChatInbox";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { ChatInbox } from "../../interfaces/ChatInbox";
import ChatWindow from "./ChatWindow";
import { getPatientMyStaff } from "../../api/getPatientMyStaff";

interface ChatUserDetails {
  userId: number;
  name: string;
  role: string;
}

interface InboxTabsCollapse {
  inboxCollapsed: boolean;
  unreadCollapsed: boolean;
  recentCollapsed: boolean;
}

interface ChatHubProps {
  setChatState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: ChatUserDetails;
  parentOnlineUsers: number[];
}

const ChatHub = ({
  setChatState,
  userDetails,
  parentOnlineUsers,
}: ChatHubProps) => {
  const [staffChats, setStaffChats] = useState<StaffDetails[]>([]);
  const [myInbox, setMyInbox] = useState<ChatInbox>({
    unreadChats: [],
    recentChats: [],
  });
  const [staffCollapsed, setStaffCollapsed] = useState<boolean>(true);
  const [inboxTabsCollapsed, setInboxTabsCollapsed] =
    useState<InboxTabsCollapse>({
      inboxCollapsed: false,
      unreadCollapsed: true,
      recentCollapsed: true,
    });
  const [chatWindowState, setChatWindowState] = useState<boolean>(false);
  const [selectedUserData, setSelectedUserData] = useState<ChatUserDetails>({
    userId: 0,
    name: "",
    role: "",
  });
  const [onlineUsers, setOnlineUsers] = useState<number[]>(parentOnlineUsers);

  useEffect(() => {
    if (userDetails.role === "Patient") {
      getPatientMyStaff(userDetails.userId)
        .then((res) => {
          setStaffChats(
            Object.values(res.data).filter(
              (staff) => staff !== null
            ) as StaffDetails[]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getStaffMyColleagues(userDetails.userId)
        .then((res) => {
          setStaffChats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getMyChatInbox(userDetails.userId)
      .then((res) => {
        setMyInbox(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails.userId]);

  useEffect(() => {
    setOnlineUsers(parentOnlineUsers);
  }, [parentOnlineUsers]);

  const truncatePreview = (message: string) => {
    return message.length > 30 ? `${message.substring(0, 30)}...` : message;
  };

  const handleOpenChat = (id: number, role: string, name: string) => {
    setSelectedUserData({ userId: id, role, name });
    setChatWindowState(true);
  };

  return (
    <div className="flex flex-col fixed bottom-4 right-4 z-10 h-[30rem] w-80 rounded border border-slate-400 bg-white">
      <div className="flex justify-between p-1 rounded-t bg-gradient-to-br from-sky-700 to-blue-400 text-white">
        <h3>IBDirect Chat</h3>
        <button title="Close" aria-label="Close chat window" onClick={() => setChatState(false)}>
          <CloseOutlined />
        </button>
      </div>
      {chatWindowState ? (
        <ChatWindow
          chatUsers={{
            currentId: userDetails.userId,
            currentName: userDetails.name,
            currentRole: userDetails.role,
            recipientId: selectedUserData.userId,
            recipientName: selectedUserData.name,
            recipientRole: selectedUserData.role,
          }}
          setChatWindowState={setChatWindowState}
          setSelectedUserData={setSelectedUserData}
        />
      ) : (
        <div className="flex-grow overflow-y-auto">
          <section aria-live="polite">
            <div className="flex justify-between p-1 bg-neutral-300 border-b border-slate-400">
              <h4>
                My Inbox <span className="sr-only">Unread messages:</span>
                <span
                  className="inline-block w-6 mr-1 rounded-full bg-red-400 text-center"
                  aria-label="unread messages"
                >
                  {myInbox.unreadChats.length}
                </span>
                <span className="sr-only">Recent chats:</span>
                <span
                  className="inline-block w-6 rounded-full bg-blue-300 text-center"
                  aria-label="unread messages"
                >
                  {myInbox.recentChats.length}
                </span>
              </h4>
              <button
                aria-label={
                  inboxTabsCollapsed.inboxCollapsed
                    ? "Show My Inbox"
                    : "Hide My Inbox"
                }
                onClick={() =>
                  setInboxTabsCollapsed({
                    ...inboxTabsCollapsed,
                    inboxCollapsed: !inboxTabsCollapsed.inboxCollapsed,
                  })
                }
              >
                {inboxTabsCollapsed.inboxCollapsed ? (
                  <>
                    Show <ExpandMoreOutlined />
                  </>
                ) : (
                  <>
                    Hide <ExpandLessOutlined />
                  </>
                )}
              </button>
            </div>
            {!inboxTabsCollapsed.inboxCollapsed && (
              <>
                <section>
                  <div className="flex justify-between p-1 bg-slate-200 border-b border-slate-400">
                    <h5>
                      Unread Chats{" "}
                      <span
                        className="inline-block w-6 rounded-full bg-red-400 text-center"
                        aria-label="unread messages"
                      >
                        {myInbox.unreadChats.length}
                      </span>
                    </h5>
                    <button
                      aria-label={
                        inboxTabsCollapsed.unreadCollapsed
                          ? "Show My Unread Chats"
                          : "Hide My Unread Chats"
                      }
                      onClick={() =>
                        setInboxTabsCollapsed({
                          ...inboxTabsCollapsed,
                          unreadCollapsed: !inboxTabsCollapsed.unreadCollapsed,
                        })
                      }
                    >
                      {inboxTabsCollapsed.unreadCollapsed ? (
                        <>
                          Show <ExpandMoreOutlined />
                        </>
                      ) : (
                        <>
                          Hide <ExpandLessOutlined />
                        </>
                      )}
                    </button>
                  </div>
                  {!inboxTabsCollapsed.unreadCollapsed && (
                    <ol>
                      {myInbox.unreadChats.length ? (
                        myInbox.unreadChats.map((unreadChat) => (
                          <li
                            className="p-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-400 border-b border-slate-300"
                            key={unreadChat.senderId}
                          >
                            <button
                              className="flex flex-col w-full text-justify"
                              onClick={() =>
                                handleOpenChat(
                                  unreadChat.senderId,
                                  unreadChat.senderName,
                                  unreadChat.senderRole
                                )
                              }
                            >
                              <div className="flex justify-between">
                                <div className="flex">
                                  <span
                                    className={`h-3 w-3 mr-1 place-self-center rounded-full border border-slate-300/75 shadow-sm shadow-slate-400 ${
                                      onlineUsers.includes(unreadChat.senderId)
                                        ? "bg-lime-500 animate-pulse"
                                        : "bg-slate-400"
                                    }`}
                                  />
                                  <p>
                                    {`${unreadChat.senderName} - ${unreadChat.senderRole}`}
                                  </p>
                                  <span className="sr-only">
                                    {onlineUsers.includes(unreadChat.senderId)
                                      ? " is Online"
                                      : " is Offline"}
                                  </span>
                                </div>
                                <span
                                  className="w-6 rounded-full bg-red-400 text-center"
                                  aria-label="unread messages"
                                >
                                  {unreadChat.unreadMessages}
                                </span>
                              </div>
                              <div>
                                <p>{truncatePreview(unreadChat.content)}</p>
                                <time>
                                  {parseIsoToDateTime(unreadChat.mostRecent)}
                                </time>
                              </div>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="p-1 bg-slate-100 border-b border-slate-300">
                          <p>No new messages</p>
                        </li>
                      )}
                    </ol>
                  )}
                </section>
                <section>
                  <div className="flex justify-between p-1 bg-slate-200 border-b border-slate-400">
                    <h5>
                      Recent Chats{" "}
                      <span
                        className="inline-block w-6 rounded-full bg-blue-300 text-center"
                        aria-label="unread messages"
                      >
                        {myInbox.recentChats.length}
                      </span>
                    </h5>
                    <button
                      aria-label={
                        inboxTabsCollapsed.recentCollapsed
                          ? "Show My Recent Chats"
                          : "Hide My Recent Chats"
                      }
                      onClick={() =>
                        setInboxTabsCollapsed({
                          ...inboxTabsCollapsed,
                          recentCollapsed: !inboxTabsCollapsed.recentCollapsed,
                        })
                      }
                    >
                      {inboxTabsCollapsed.recentCollapsed ? (
                        <>
                          Show <ExpandMoreOutlined />
                        </>
                      ) : (
                        <>
                          Hide <ExpandLessOutlined />
                        </>
                      )}
                    </button>
                  </div>
                  {!inboxTabsCollapsed.recentCollapsed && (
                    <ol>
                      {myInbox.recentChats.length ? (
                        myInbox.recentChats.map((recentChat) => (
                          <li
                            className="p-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-400 border-b border-slate-300"
                            key={recentChat.senderId}
                          >
                            <button
                              className="flex flex-col w-full text-justify"
                              onClick={() =>
                                handleOpenChat(
                                  recentChat.senderId,
                                  recentChat.senderRole,
                                  recentChat.senderName
                                )
                              }
                            >
                              <div className="flex justify-between">
                                <div className="flex">
                                  <span
                                    className={`h-3 w-3 mr-1 place-self-center rounded-full border border-slate-300/75 shadow-sm shadow-slate-400 ${
                                      onlineUsers.includes(recentChat.senderId)
                                        ? "bg-lime-500 animate-pulse"
                                        : "bg-slate-400"
                                    }`}
                                  />
                                  <p>
                                    {`${recentChat.senderName} - ${recentChat.senderRole}`}
                                  </p>
                                  <span className="sr-only">
                                    {onlineUsers.includes(recentChat.senderId)
                                      ? " is Online"
                                      : " is Offline"}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p>{truncatePreview(recentChat.content)}</p>
                                <time>
                                  {parseIsoToDateTime(recentChat.mostRecent)}
                                </time>
                              </div>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="p-1 bg-slate-100 border-b border-slate-300">
                          <p>No recent chats</p>
                        </li>
                      )}
                    </ol>
                  )}
                </section>
              </>
            )}
          </section>
          <section aria-live="polite">
            <div className="flex justify-between p-1 bg-neutral-300 border-b border-slate-400">
              <h4>My Staff</h4>
              <button
                aria-label={
                  staffCollapsed ? "Show Staff Chats" : "Hide Staff Chats"
                }
                onClick={() => setStaffCollapsed(!staffCollapsed)}
              >
                {staffCollapsed ? (
                  <>
                    Show <ExpandMoreOutlined />
                  </>
                ) : (
                  <>
                    Hide <ExpandLessOutlined />
                  </>
                )}
              </button>
            </div>
            {!staffCollapsed && (
              <ul>
                {staffChats.map((staff) => (
                  <li
                    className="flex justify-between p-1 bg-slate-100 border-b border-slate-300"
                    key={staff.staffId}
                  >
                    <div className="flex place-items-center">
                      <span
                        className={`h-3 w-3 mr-1 place-self-center rounded-full border border-slate-300/75 shadow-sm shadow-slate-400 ${
                          onlineUsers.includes(staff.staffId)
                            ? "bg-lime-500 animate-pulse"
                            : "bg-slate-400"
                        }`}
                      />
                      <p>{`${staff.name} - ${staff.role}`}</p>
                      {onlineUsers.includes(staff.staffId)
                        ? " is Online"
                        : " is Offline"}
                    </div>
                    <button
                      className="h-7 w-7 rounded-full bg-blue-300 hover:bg-blue-400 active:bg-blue-600 active:text-white text-center"
                      aria-label={`open staff chat ${staff.name}`}
                      onClick={() =>
                        handleOpenChat(staff.staffId, staff.role, staff.name)
                      }
                    >
                      <ChatBubbleOutline fontSize="small" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ChatHub;
