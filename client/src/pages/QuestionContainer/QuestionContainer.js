import Navbar from "../../components/Navbar/Navbar";
import Question from "../../components/Question/Question";
import { useLinkClickHandler, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Test from "../../components/Test/Test";

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

const QuestionContainer = (props) => {
  const questionId = useParams().id;
  return (
    <div>
      <Navbar />
      <Test />
    </div>
  );
};

export default QuestionContainer;
