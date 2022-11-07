import Navbar from "../../components/Navbar/Navbar";
import Question from "../../components/Question/Question";
import { useLinkClickHandler, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Test from "../../components/Test/Test";
import Layout from "../../components/Layout/Layout";

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

const QuestionContainer = (props) => {
  const questionId = useParams().id;
  return (
    <div>
      <Navbar />
      <Layout>
        <Test />
      </Layout>
    </div>
  );
};

export default QuestionContainer;
