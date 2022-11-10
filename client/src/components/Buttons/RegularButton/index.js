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
  const func = props.func;
  const closeModal = props.closeModal ? props.closeModal : "";

  const fullFunction = () => {
    func();
    closeModal();
  };

  if (props.className === "linkBtn") {
    if (props.closeModal) {
      return <LinkButton onClick={fullFunction}>{props.children}</LinkButton>;
    } else {
      return <LinkButton onClick={func}>{props.children}</LinkButton>;
    }
  } else {
    return <StyledButton onClick={fullFunction}>{props.children}</StyledButton>;
  }
};

export default RegularButton;
