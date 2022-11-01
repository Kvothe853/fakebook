import RegularButton from "../Buttons/RegularButton";

const DeleteQuestionMessage = (props) => {
  return (
    <div>
      <h2>Are you sure you want to delete this {props.text}?</h2>
      {/* <button onClick={props.closeModal}>No</button>
      <button onClick={props.deleteQuestion}>Yes</button> */}
      <RegularButton className="linkBtn" func={props.closeModal}>
        No
      </RegularButton>
      <RegularButton
        className="linkBtn"
        func={props.deleteQuestion}
        closeModal={props.closeModal}
      >
        Yes
      </RegularButton>
    </div>
  );
};

export default DeleteQuestionMessage;
