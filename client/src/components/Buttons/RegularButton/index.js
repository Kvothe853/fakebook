import styled from "styled-components";

const StyledButton = styled.button`
  margin: 5px;
`;

const RegularButton = ({ text, children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default RegularButton;
