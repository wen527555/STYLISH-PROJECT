import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

const ThankyouPage = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  return (
    <ThankyouContainer>
      <ThankyouContext>訂單已完成！感謝您的購買</ThankyouContext>
      <ThankyouContext>訂單編號：{orderId}</ThankyouContext>
    </ThankyouContainer>
  );
};

export default ThankyouPage;

const ThankyouContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ThankyouContext = styled.div`
  color: #3f3a3a;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
`;

// const BackToHomeLink = styled.a`

// `;
