import { ChatInboxUnreadItem } from "./ChatInboxUnreadItem";
import { ChatInboxRecentItem } from "./ChatInboxRecentItem";

export interface ChatInbox {
  unreadChats: ChatInboxUnreadItem[];
  recentChats: ChatInboxRecentItem[];
}
