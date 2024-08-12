import styled from "styled-components";

const categories = [
  { label: "女裝", value: "women" },
  { label: "男裝", value: "men" },
  { label: "配件", value: "accessories" },
];

const handleCategoryClick = (event) => {
  const category = event.target.getAttribute("data-category");
  if (category) {
    window.location.href = `homepage.html?category=${category}`;
  }
};

const HeaderList = () => {
  return (
    <HeaderListContainer onClick={handleCategoryClick}>
      {categories.map((category, index) => (
        <HeaderItem key={index}>
          <HeaderItemBtn data-category={category.value}>
            {category.label}
          </HeaderItemBtn>
        </HeaderItem>
      ))}
    </HeaderListContainer>
  );
};

export default HeaderList;

export const HeaderListContainer = styled.ul`
  width: 451px;
  height: 28px;
  padding: 20px 1px 2px 59px;
  display: flex;
  margin: 0;

  @media (max-width: 1279.9px) {
    width: auto;
    height: 50px;
    padding: 17px 0px 17px 0px;
    background-color: #313538;
    box-sizing: border-box;
    margin: 0;
    justify-content: space-between;
    align-items: center;
  }
`;
export const HeaderItem = styled.li`
  width: 150px;
  text-align: center;
  position: relative;
  box-sizing: border-box;
  list-style: none;

  &:not(:last-child)::after {
    content: "";
    color: black;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    border-left: 1px solid black;
  }

  @media (max-width: 1279.9px) {
    flex: 1;
    height: 20px;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 79%;
      border-left: 1px solid #808080;
    }
  }
`;

export const HeaderItemBtn = styled.button`
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  letter-spacing: 30px;
  line-height: 28px;
  font-weight: 400;
  padding: 0px 0px 0px 28px;

  &:hover {
    color: #8b572a;
  }

  @media (max-width: 1279.9px) {
    line-height: 16px;
    font-size: 16px;
    color: #828282;
    letter-spacing: 0px;
    height: auto;
    padding: 0;
    font-weight: 400;

    &:hover {
      color: #fff;
    }
  }
`;
