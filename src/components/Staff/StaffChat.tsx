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
import { ChatInboxItem } from "../../interfaces/ChatInboxItem";

interface StaffChatUserDetails {
  userId: number;
  name: string;
  role: string;
}

interface StaffChatProps {
  setChatState: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: StaffChatUserDetails;
}

const StaffChat = ({ setChatState, userDetails }: StaffChatProps) => {
  const [staffChats, setStaffChats] = useState<StaffDetails[]>([]);
  const [myInbox, setMyInbox] = useState<ChatInboxItem[]>([]);
  const [staffCollapsed, setStaffCollapsed] = useState<boolean>(true);
  const [inboxCollapsed, setInboxCollapsed] = useState<boolean>(false);

  useEffect(() => {
    getStaffMyColleagues(userDetails.userId)
      .then((res) => {
        setStaffChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getMyChatInbox(userDetails.userId)
      .then((res) => {
        setMyInbox(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails.userId]);

  const truncatePreview = (message: string) => {
    return message.length > 30 ? `${message.substring(0, 30)}...` : message;
  };

  return (
    <div className="flex flex-col fixed bottom-4 right-4 z-10 h-[30rem] w-80 rounded border border-slate-400 bg-white">
      <div className="flex justify-between p-1 rounded-t bg-gradient-to-br from-sky-700 to-blue-400 text-white">
        <h3>IBDirect Chat</h3>
        <button onClick={() => setChatState(false)}>
          <CloseOutlined />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <section>
          <div className="flex justify-between p-1 bg-slate-200 border-b border-slate-400">
            <h4>My Inbox</h4>
            <button
              aria-label={inboxCollapsed ? "Show My Inbox" : "Hide My Inbox"}
              onClick={() => setInboxCollapsed(!inboxCollapsed)}
            >
              {inboxCollapsed ? (
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
          {!inboxCollapsed && (
            <ol>
              {myInbox.length ? (
                myInbox.map((inbox) => (
                  <li
                    className="p-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-400 border-b border-slate-300"
                    key={inbox.senderId}
                  >
                    <button className="flex flex-col w-full text-justify">
                      <div className="flex justify-between">
                        <p>
                          {inbox.senderName} - {inbox.senderRole}
                        </p>
                        <span
                          className="w-6 rounded-full bg-red-400 text-center"
                          aria-label="unread messages"
                        >
                          {inbox.unreadMessages}
                        </span>
                      </div>
                      <div>
                        <p>
                          {truncatePreview("inbox.content test test test test")}
                        </p>
                        <time>{parseIsoToDateTime(inbox.mostRecent)}</time>
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
                  <p>
                    {staff.name} - {staff.role}
                  </p>
                  <button
                    className="h-7 w-7 rounded-full bg-blue-300 hover:bg-blue-400 active:bg-blue-600 active:text-white text-center"
                    aria-label={`open staff chat ${staff.name}`}
                  >
                    <ChatBubbleOutline fontSize="small" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default StaffChat;
