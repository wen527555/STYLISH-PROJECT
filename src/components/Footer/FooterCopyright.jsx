import styled from "styled-components";

const FooterCopyright = () => {
  return (
    <Copyright>
      <div>@2018. All rights reserved.</div>
    </Copyright>
  );
};

export default FooterCopyright;

const Copyright = styled.div`
  font-size: 12px;
  text-align: center;
  margin: 17px 0px 16px 30px;
  font-weight: 400;
  height: 17px;
  width: 149px;
  color: #828282;

  @media (max-width: 1279px) {
    width: 124px;
    margin: 0px 0px 8px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;
    width: 100%;

    font-size: 10px;
    line-height: 14px;
    margin-bottom: 28px;
  }
`;
