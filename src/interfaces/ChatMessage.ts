export interface ChatMessage {
  id?: number;
  content: string;
  dateSent: string;
  senderId: number;
  senderName: string;
  senderRole: string;
  recipientId: number;
  recipientName: string;
  recipientRole: string;
  read: boolean;
}
