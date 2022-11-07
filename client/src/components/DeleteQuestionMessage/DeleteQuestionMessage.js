import RegularButton from "../Buttons/RegularButton";
import styled from "styled-components";
import { symbol } from "joi";

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: ;
  }
`;

const Styledh2 = styled.h2`
  color: #555;
  font-size: 22px;
  margin-bottom: 15px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  button {
    margin: 0 5px;
  }
`;

const DeleteQuestionMessage = (props) => {
  return (
    <StyledModal>
      <Styledh2>Are you sure you want to delete this {props.text}?</Styledh2>
      {/* <button onClick={props.closeModal}>No</button>
      <button onClick={props.deleteQuestion}>Yes</button> */}
      <ButtonsContainer>
        <RegularButton
          className="linkBtn"
          func={props.deleteQuestion}
          closeModal={props.closeModal}
        >
          Yes
        </RegularButton>
        <RegularButton className="linkBtn" func={props.closeModal}>
          No
        </RegularButton>
      </ButtonsContainer>
    </StyledModal>
  );
};

export default DeleteQuestionMessage;
