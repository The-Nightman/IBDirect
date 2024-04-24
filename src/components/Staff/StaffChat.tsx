import { CloseOutlined } from "@mui/icons-material";

interface StaffChatProps {
  setChatState: React.Dispatch<React.SetStateAction<boolean>>;
}

const StaffChat = ({ setChatState }: StaffChatProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-10 h-[30rem] w-72 rounded border border-slate-400 bg-white">
      <div className="flex justify-between p-1 rounded-t bg-gradient-to-br from-sky-700 to-blue-400 text-white">
        <h3>IBDirect Chat</h3>
        <button onClick={() => setChatState(false)}>
          <CloseOutlined />
        </button>
      </div>
      StaffChat
    </div>
  );
};

export default StaffChat;
