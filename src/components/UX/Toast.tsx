import { Alert } from "flowbite-react";

interface ToastProps {
  color: string;
  message: string;
  handleErrorState: () => void;
}

const Toast = ({ color, message, handleErrorState }: ToastProps) => {
  if (message === "") {
    message = "An error has occurred";
  }

  return (
    <Alert color={color} onDismiss={() => handleErrorState()}>
      <p>{message}</p>
    </Alert>
  );
};

export default Toast;
