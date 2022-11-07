import Modal from "react-modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import RegularButton from "../Buttons/RegularButton";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  },
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px;
  width: 400px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  border: solid 1px #999;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
  color: #555;
  &:focus {
    background: none repeat scroll 0 0 #ffffff;
    outline-width: 0;
  }
`;

const StyledTextarea = styled.textarea`
  min-height: 150px;
  width: 100%;
  margin-bottom: 20px;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  border: solid 1px #999;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
  color: #555;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
  resize: vertical;
  &:focus {
    background: none repeat scroll 0 0 #ffffff;
    outline-width: 0;
  }
`;

const StyledEdit = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    transition: 0.2s ease-out;
    color: rgb(104, 85, 224);
  }
`;

const StyledExitBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  &:hover {
    color: red;
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
          <StyledExitBtn onClick={closeModal}>&#10005;</StyledExitBtn>
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

            {/* <button type="submit">Edit</button> */}
            <RegularButton className="linkBtn" type="submit">
              Update
            </RegularButton>
          </StyledForm>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionEdit;
