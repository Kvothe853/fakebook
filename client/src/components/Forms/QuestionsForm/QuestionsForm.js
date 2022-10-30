import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: #555;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 15px;
`;

const StyledText = styled.textarea`
  color: oranage;
  height: 200px;
  margin-bottom: 15px;
  resize: vertical;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionsForm = ({ addNewQuestion }) => {
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");

  return (
    <StyledForm
      onSubmit={(e) => {
        addNewQuestion(e, newQuestionTitle, newQuestionContent);
        setNewQuestionTitle("");
        setNewQuestionContent("");
      }}
    >
      <StyledDiv>
        <StyledLabel>Title</StyledLabel>
        <StyledInput
          type="text"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel>Content</StyledLabel>
        <StyledText
          name="content"
          value={newQuestionContent}
          onChange={(e) => setNewQuestionContent(e.target.value)}
        ></StyledText>
      </StyledDiv>
      <button>Ask a Question</button>
    </StyledForm>
  );
};

export default QuestionsForm;
