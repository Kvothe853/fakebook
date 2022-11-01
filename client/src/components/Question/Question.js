import styled from "styled-components";
import DateConverter from "../DateConverter/DateConverter";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionBox = styled.div`
  border-bottom: solid 1px #ddd;
  padding: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
    border-color: #ddd;
  }
`;

const QuestionTitle = styled.h1`
  font-size: 18px;
`;

const QuestionContent = styled.p`
  //   width: 500px;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
`;

const QuestionBoxHeader = styled.div`
  display: flex;
  align-items: flex-center;
  margin-bottom: 20px;
  ${QuestionTitle} {
    flex: 4;
  }
  div {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
  }
`;

const StyledLink = styled.div`
  a {
    text-decoration: none;
    h1 {
      color: #333;
    }
    p {
      color: #777;
    }
    ${QuestionBoxHeader} {
      div {
        color: #333;
      }
    }
  }
`;

const Question = (props) => {
  const question = props.question;
  const questionId = props.id;
  const navigate = useNavigate();

  const navigateToQuestionContainer = () => {
    navigate(`./questions/${question.id}`, { state: question });
  };

  return (
    <StyledLink>
      <QuestionBox key={questionId} onClick={navigateToQuestionContainer}>
        <QuestionBoxHeader>
          <QuestionTitle>{question.title}</QuestionTitle>
          <div>
            <DateConverter date={question.date} />
          </div>
        </QuestionBoxHeader>
        <QuestionContent>{question.content}</QuestionContent>
      </QuestionBox>
      {/* </Link> */}
    </StyledLink>
  );
};

export default Question;
