import Modal from "react-modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
  padding: 15px;
  width: 400px;
`;

const StyledInput = styled.input`
  padding: 5px;
  width: 300px;
  margin: 5px 0;
  border: solid 1px #333;
`;

const StyledTextarea = styled.textarea`
  border: solid 1px #333;
  padding: 5px;
  width: 300px
  width: 100%;
`;

const StyledEdit = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  &:hover {
    transition: 0.2s ease-out;
    color: rgb(104, 85, 224);
  }
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
      <StyledEdit onClick={openModal}>
        <FontAwesomeIcon icon={faEdit} />
      </StyledEdit>
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
            <StyledInput
              type="text"
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
            />
            <StyledTextarea
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
