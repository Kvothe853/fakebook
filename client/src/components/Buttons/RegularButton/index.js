import styled from "styled-components";

const StyledButton = styled.button`
  margin: 5px;
`;

const LinkButton = styled.button`
  color: rgb(104, 85, 224);
  border: solid 1px rgb(104, 85, 224);
  background: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    color: #fff;
    background: rgb(104, 85, 224);
  }
`;

const RegularButton = (props) => {
  if (props.className === "linkBtn") {
    return <LinkButton onClick={props.func}>{props.children}</LinkButton>;
  } else {
    return <StyledButton onClick={props.func}>{props.children}</StyledButton>;
  }
};

export default RegularButton;
