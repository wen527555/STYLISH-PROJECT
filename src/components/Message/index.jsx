import { styled } from "styled-components";
import { useCallback, useState } from "react";
import loadingImg from "./MsgImg/loading.gif";

const useMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const showMsgWithTimeout = useCallback((message, timeout = 2000) => {
    setShowMessage(true);
    setNewMessage(message);
    setTimeout(() => {
      setShowMessage(false);
    }, timeout);
  }, []);
  return {
    showMessage,
    newMessage,
    showMsgWithTimeout,
  };
};

const MessageOverlay = ({ show, message }) => {
  if (!show) return null;
  return (
    <Overlay>
      <MessageContent>{message}</MessageContent>
    </Overlay>
  );
};

const LoadingOverlay = ({ show, message }) => {
  if (!show) return null;
  return (
    <Overlay>
      <LoadingContent>
        <LoadingGif src={loadingImg} />
        {message}
      </LoadingContent>
    </Overlay>
  );
};

export { useMessage, MessageOverlay, LoadingOverlay };

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContent = styled.div`
  background-color: rgba(244, 242, 242, 0.8);
  width: 400px;
  border-radius: 5px;
  height: 100px;
  color: #622222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingGif = styled.img`
  width: 80px;
  height: 80px;
`;

const LoadingContent = styled.div`
  border-radius: 5px;
  font-size: 30px;
  height: 100px;
  color: #622222;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
