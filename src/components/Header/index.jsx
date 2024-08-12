import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";
import HeaderList from "./HeaderList";
import HeaderIcons from "./HeaderIcon";
import searchImage from "./headerImg/search.png";
import { useNavigate } from "react-router";

const Header = () => {
  const [isMobileInputVisible, setMobileInputVisible] = useState(false);
  const [isComposing, setIsComposing] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const inputMobileRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isMobileInputVisible) {
      inputMobileRef.current?.focus();
    }
  }, [isMobileInputVisible]);

  const handleMobileSearchClick = () => {
    setMobileInputVisible((prevInputVisible) => !prevInputVisible);
  };

  const handleSearchKeyUp = (event) => {
    if (event.key === "Enter" && !isComposing) {
      if (searchKeyword) {
        const url = new URL(window.location.href);
        url.pathname = "/homepage.html";
        url.searchParams.set("query", searchKeyword);
        window.location.assign(url.href);
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionend = () => {
    setTimeout(() => {
      setIsComposing(false);
    }, 3);
  };

  const handleBlur = () => {
    setMobileInputVisible(false);
  };

  const handleKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleCartLink = () => {
    navigate("/cart");
  };

  const handleMemberLink = () => {
    navigate("/member");
  };

  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderLogo />
          <MobileSearchContainer>
            <MobileInput
              ref={inputMobileRef}
              isVisible={isMobileInputVisible}
              value={searchKeyword}
              onChange={handleKeywordChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionend}
              onKeyUp={handleSearchKeyUp}
              onBlur={handleBlur}
              placeholder="西裝"
            />
            <MobileSearchImg
              src={searchImage}
              onClick={handleMobileSearchClick}
            />
          </MobileSearchContainer>
          <HeaderList />
        </HeaderLeft>
        <HeaderRight>
          <DesktopSearchContainer>
            <SearchInput
              placeholder="西裝"
              isVisible={isMobileInputVisible}
              value={searchKeyword}
              onChange={handleKeywordChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionend}
              onKeyUp={handleSearchKeyUp}
            />
            <SearchImg src={searchImage} />
          </DesktopSearchContainer>
          <HeaderIcons
            onCartClick={handleCartLink}
            onMemberClick={handleMemberLink}
          />
        </HeaderRight>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  grid-row: 1/2;
  margin: 0;
  background-color: white;
  width: 100%;
  height: 140px;
  border-bottom: 40px solid #313538;
  box-sizing: border-box;
  padding: 26px 54px 26px 60px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (max-width: 1279.9px) {
    padding: 0px;
    flex-direction: column;
    height: 102px;
    border-bottom: none;
    position: fixed;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  width: 766px;
  @media (max-width: 1279.9px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  column-gap: 37px;
  margin-left: auto;
  padding-top: 2px;
`;

const MobileSearchContainer = styled.div`
  display: none;
  @media (max-width: 1279.9px) {
    display: block;
    position: fixed;
    right: 10px;
    top: 6px;
    height: 52px;
    width: auto;
  }
`;

const MobileInput = styled.input`
  @media (max-width: 1279.9px) {
    width: calc(100vw - 20px);
    outline: none;
    font-size: 20px;
    height: 40px;
    border-radius: 20px;
    color: #8b572a;
    padding: 10px 54px 10px 17px;
    box-sizing: border-box;
    border: 1px solid #979797;
    transition: 0.5s;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    &:focus {
      border: 2px solid #8b572a;
    }

    &::placeholder {
      color: #bfbdbd;
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
    }
  }
`;

const MobileSearchImg = styled.img`
  @media (max-width: 1279.9px) {
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    right: 6px;
    top: 0px;
  }
`;

const DesktopSearchContainer = styled.div`
  position: relative;

  @media (max-width: 1279.9px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  font-size: 20px;
  color: #8b572a;
  width: 214px;
  height: 44px;
  border: 1px solid #979797;
  padding: 15px 53px 10px 20px;
  border-radius: 20px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border: 2px solid #8b572a;
  }

  &::placeholder {
    color: #bfbdbd;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
  }
`;
const SearchImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  padding-right: 10px;
  cursor: pointer;
`;
