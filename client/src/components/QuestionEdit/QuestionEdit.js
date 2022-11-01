import Modal from "react-modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  },
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const QuestionEdit = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState(props.questionTitle);
  const [newQuestionContent, setNewQuestionContent] = useState(
    props.questionContent
  );
  const [activeUserInfo, setactiveUserInfo] = useState({});

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const checkLoginStatus = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      const decodedUser = jwt_decode(localStorage.getItem("token"));
      setactiveUserInfo(decodedUser);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const updateQuestion = (e) => {
    e.preventDefault();

    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: newQuestionTitle,
        content: newQuestionContent,
      }),
    };

    fetch(`http://localhost:3000/questions/${props.id}`, option)
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    window.location.href = "http://localhost:3001/";
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>EDIT</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="update question"
      >
        <div>
          <button onClick={closeModal}>&#10005;</button>
          <StyledForm
            onSubmit={(e) => {
              updateQuestion(e);
            }}
          >
            <input
              type="text"
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
            />
            <textarea
              name="content"
              value={newQuestionContent}
              onChange={(e) => setNewQuestionContent(e.target.value)}
            />

            <button type="submit">Edit</button>
          </StyledForm>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionEdit;
