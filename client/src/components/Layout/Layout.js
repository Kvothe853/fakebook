import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;

const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default Layout;
