import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import RegularButton from "../Buttons/RegularButton";
import Comment from "../Comment/Comment";
import CommentsForm from "../Forms/CommentsForm/CommentsForm";
import DeleteQuestionMessage from "../DeleteQuestionMessage/DeleteQuestionMessage";
import jwt_decode from "jwt-decode";
import Modal from "react-modal";

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

const Main = styled.main`
  padding: 20px;
  max-width: 1280px;
  margin: 0 auto;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #333;
  margin: 5px 5px 20px 5px;
  padding: 20px;
`;

const QuestionTitle = styled.h1`
  margin-bottom: 5px;
  color: #444;
  font-size: 22px;
`;

const QuestiontContent = styled.p`
  color: #777;
`;

/// comments
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Test = (props) => {
  const question = useLocation().state;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeUserInfo, setactiveUserInfo] = useState({});

  // modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //check login status
  const checkLoginStatus = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      setLoginStatus(true);
      const decodedUser = jwt_decode(localStorage.getItem("token"));
      setactiveUserInfo(decodedUser);
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // getting comments
  useEffect(() => {
    fetch(`http://localhost:3000/comments/${question.id}`)
      .then((resp) => resp.json())
      .then((response) => setComments(response))
      .catch((err) => console.log(err));
  }, []);

  //adding new comment
  const addNewComment = (e, newComment) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    if (newComment) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      };

      fetch(`http://localhost:3000/comments/${question.id}`, option)
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            fetch(`http://localhost:3000/comments/${question.id}`)
              .then((resp) => resp.json())
              .then((response) => setComments(response))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // delete question
  const deleteQuestion = () => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };

    fetch(`http://localhost:3000/questions/${question.id}`, option)
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    closeModal();
    window.location.href = "http://localhost:3001/";
  };

  const deleteComment = (id) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };

    fetch(`http://localhost:3000/comments/${id}`, option)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          fetch(`http://localhost:3000/comments/${question.id}`)
            .then((resp) => resp.json())
            .then((response) => setComments(response))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Main>
      <QuestionContainer>
        {question.user_id === activeUserInfo.id && (
          <div>
            <RegularButton className={"linkBtn"} func={openModal}>
              &#10005;
            </RegularButton>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="delete question button"
            >
              <DeleteQuestionMessage
                text={"question"}
                closeModal={closeModal}
                deleteQuestion={deleteQuestion}
              />
            </Modal>
          </div>
        )}

        <QuestionTitle>{question.title}</QuestionTitle>
        <QuestiontContent>{question.content}</QuestiontContent>
      </QuestionContainer>
      <CommentsContainer>
        {comments.map((comment, id) => (
          <Comment key={id} data={comment} deleteComment={deleteComment} />
        ))}
      </CommentsContainer>
      {loginStatus && <CommentsForm addNewComment={addNewComment} />}
    </Main>
  );
};

export default Test;
