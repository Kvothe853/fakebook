import { useState, useEffect } from "react";
import QuestionsForm from "../Forms/QuestionsForm/QuestionsForm";
import styled from "styled-components";
import Question from "../Question/Question";
import Sorting from "../Sorting/Sorting";
import { ThreeDots } from "react-loader-spinner";

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionsMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const QuestionsSidebar = styled.div``;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const [sortingType, setSortingType] = useState("DESC");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    checkUsers();
    checkLoginStatus();
    refreshQuestions();
  }, []);

  function checkLoginStatus() {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }

  function checkUsers() {
    fetch(`http://localhost:3000/users/`)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          setUsers(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addNewQuestion(e, newQuestionTitle, newQuestionContent) {
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
            checkUsers();

            refreshQuestions();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function refreshQuestions() {
    fetch(`http://localhost:3000/questions/${sortingType}`)
      .then((resp) => resp.json())
      .then((response) => setQuestions(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const sorting = (type) => {
    fetch(`http://localhost:3000/questions/${type}`)
      .then((resp) => resp.json())
      .then((response) => setQuestions(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    setSortingType(type);
  };

  return (
    <QuestionsContainer>
      <QuestionsSidebar>
        {loginStatus && <QuestionsForm addNewQuestion={addNewQuestion} />}
      </QuestionsSidebar>
      <div>
        <Sorting func={sorting} />
      </div>
      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#6855E0"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ marginLeft: "25px" }}
          wrapperClassName=""
          visible={true}
        />
      )}
      <QuestionsMain>
        {questions.map((question, id) => (
          <Question
            key={id}
            question={question}
            id={id}
            qid={question.id}
            users={users}
          />
        ))}
      </QuestionsMain>
    </QuestionsContainer>
  );
};

export default Questions;
