import { json, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import RegularButton from "../Buttons/RegularButton";
import CommentsForm from "../Forms/CommentsForm/CommentsForm";

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
  const [comments, setComments] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [newComment, setNewComment] = useState("");

  const checkLoginStatus = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${question.id}`)
      .then((resp) => resp.json())
      .then((response) => setComments(response))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <Main>
      <QuestionContainer>
        <QuestionTitle>{question.title}</QuestionTitle>
        <QuestiontContent>{question.content}</QuestiontContent>
      </QuestionContainer>
      <CommentsContainer>
        {comments.map((comment, id) => (
          <Comment key={id} data={comment} />
        ))}
      </CommentsContainer>
      {loginStatus && <CommentsForm addNewComment={addNewComment} />}
    </Main>
  );
};

export default Test;
