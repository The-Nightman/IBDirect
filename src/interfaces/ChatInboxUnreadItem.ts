export interface ChatInboxUnreadItem {
  mostRecent: string;
  senderId: number;
  unreadMessages: number;
  senderName: string;
  senderRole: string;
  content: string;
}
