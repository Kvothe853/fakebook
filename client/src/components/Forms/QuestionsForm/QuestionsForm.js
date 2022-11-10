import styled from "styled-components";
import { useState } from "react";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const StyledLabel = styled.label`
  color: #555;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  border: solid 1px #999;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
  color: #555;
  &:focus {
    background: none repeat scroll 0 0 #ffffff;
    outline-width: 0;
  }
`;

const StyledText = styled.textarea`
  min-height: 150px;
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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
          placeholder="Type your title here..."
          type="text"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
      </StyledDiv>
      <StyledDiv>
        <StyledLabel>Content</StyledLabel>
        <StyledText
          placeholder="What's on your mind?"
          name="content"
          value={newQuestionContent}
          onChange={(e) => setNewQuestionContent(e.target.value)}
        ></StyledText>
      </StyledDiv>
      <ButtonContainer>
        <SubmitButton>Ask a Question</SubmitButton>
      </ButtonContainer>
    </StyledForm>
  );
};

export default QuestionsForm;
