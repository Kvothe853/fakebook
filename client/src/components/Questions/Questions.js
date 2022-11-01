import { useState, useEffect } from "react";
import QuestionsForm from "../Forms/QuestionsForm/QuestionsForm";
import styled from "styled-components";
import Question from "../Question/Question";

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionsMain = styled.main`
  flex: 4;
  display: flex;
  flex-direction: column;
  border: solid 1px #ddd;
  border-bottom: 0;
`;

const QuestionsSidebar = styled.div`
  flex: 2;
  border: solid 1px #ddd;
  padding: 15px;
  border-right: 0;
`;

const Questions = () => {
  const [questions, setQuestions] = useState(["Vienas"]);
  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);

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
    fetch("http://localhost:3000/questions")
      .then((resp) => resp.json())
      .then((response) => setQuestions(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function addNewQuestion(e, newQuestionTitle, newQuestionContent) {
    const tokenas = localStorage.getItem("token");
    e.preventDefault();

    if (newQuestionTitle && newQuestionContent) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: newQuestionTitle,
          content: newQuestionContent,
        }),
      };

      fetch("http://localhost:3000/questions", option)
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            fetch("http://localhost:3000/questions")
              .then((resp) => resp.json())
              .then((response) => setQuestions(response))
              .catch((err) => console.log(err))
              .finally(() => setLoading(false));
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <QuestionsContainer>
      <QuestionsSidebar>
        <h3>Ask a Question</h3>
        {loginStatus && <QuestionsForm addNewQuestion={addNewQuestion} />}
      </QuestionsSidebar>
      <QuestionsMain>
        {questions.map((question, id) => (
          <Question key={id} question={question} id={id} qid={question.id} />
        ))}
      </QuestionsMain>
    </QuestionsContainer>
  );
};

export default Questions;
