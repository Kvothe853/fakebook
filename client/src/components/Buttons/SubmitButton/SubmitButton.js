import styled from "styled-components";

const ButtonStyled = styled.button`
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

const SubmitButton = (props) => {
  if (props.func) {
    return <ButtonStyled onClick={props.func}>{props.children}</ButtonStyled>;
  } else {
    return <ButtonStyled>{props.children}</ButtonStyled>;
  }
};

export default SubmitButton;
