import styled from "styled-components";
import { useEffect, useState } from "react";
const appworksApi = "https://api.appworks-school.tw/api/1.0";
import { useMessage, MessageOverlay } from "../../components/Message";

const Member = () => {
  const fbAccessToken = localStorage.getItem("accessToken");
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState(fbAccessToken || "");
  const { showMessage, newMessage, showMsgWithTimeout } = useMessage();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, []);
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) return;
      (function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = () => {
          window.fbAsyncInit = () => {
            window.FB.init({
              appId: import.meta.env.VITE_FB_APP_ID,
              cookie: true,
              xfbml: true,
              version: import.meta.env.VITE_FB_APP_VERSION,
            });

            window.FB.getLoginStatus(async (res) => {
              console.log("res", res);
              if (res.status === "connected") {
                console.log(
                  "res.authResponse.accessToken",
                  res.authResponse.accessToken
                );
                await fetchUserInfo(res.authResponse.accessToken);
              }
            });
            window.FB.AppEvents.logPageView();
          };
        };
      })(document, "script", "facebook-jssdk");
    };
    loadFacebookSDK();
  }, []);

  const fetchUserInfo = async (accessToken) => {
    try {
      const res = await fetch(`${appworksApi}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "facebook",
          access_token: accessToken,
        }),
      });
      if (!res.ok) {
        throw new Error(`Error:${res.status}`);
      }
      const data = await res.json();
      setAccessToken(data.data.access_token);
      setUserInfo(data.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFBLogin = () => {
    window.FB.login(
      (res) => {
        if (res.status === "connected") {
          fetchUserInfo(res.authResponse.accessToken);
        } else {
          showMsgWithTimeout("登入失敗！");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  const handleFBLogout = () => {
    if (accessToken) {
      window.FB.logout(function () {
        localStorage.removeItem("accessToken");
        setAccessToken("");
        showMsgWithTimeout("登出成功！");
        setUserInfo({});
      });
    }
  };

  return (
    <MemberContainer>
      <MessageOverlay show={showMessage} message={newMessage} />
      {accessToken?.length > 0 ? (
        <MemberBox>
          <UserImg src={userInfo.picture} />
          <UserName>{userInfo.name}</UserName>
          <UserEmail>{userInfo.email}</UserEmail>
          <LogoutBtn onClick={handleFBLogout}>登出</LogoutBtn>
        </MemberBox>
      ) : (
        <LoginBtn onClick={handleFBLogin}>FACEBOOK 登入</LoginBtn>
      )}
    </MemberContainer>
  );
};

export default Member;

const MemberContainer = styled.div`
  width: 960px;
  padding: 20px 0px 20px 0px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MemberBox = styled.div`
  width: 450px;
  height: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginBtn = styled.button`
  background-color: #3f52c1;
  color: white;
  border-radius: 5px;
  border: none;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const LogoutBtn = styled.button`
  background-color: #3f3a3a;
  color: white;
  border-radius: 5px;
  border: none;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 20px;
`;

const UserName = styled.div`
  color: #3f3a3a;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const UserEmail = styled.div`
  color: #3f3a3a;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 50px;
`;
