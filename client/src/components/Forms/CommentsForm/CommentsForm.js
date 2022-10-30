import styled from "styled-components";
import { useState } from "react";

const StyledLabel = styled.label`
  margin-bottom: 15px;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: solid 1px #ddd;
  margin: 0 5px;
  padding: 20px;
`;

const StyledTextarea = styled.textarea`
  resize: vertical;
  padding: 5px;
  min-height: 200px;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  color: rgb(104, 85, 224);
  border: solid 1px rgb(104, 85, 224);
  background: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 15px;
  align-self: flex-end;
  &:hover {
    transition: 0.2s;
    color: #fff;
    background: rgb(104, 85, 224);
  }
`;

const CommentsForm = ({ addNewComment }) => {
  const [newComment, setNewComment] = useState("");

  return (
    <StyledForm
      onSubmit={(e) => {
        addNewComment(e, newComment);
        setNewComment("");
      }}
    >
      <StyledLabel>Add Comment</StyledLabel>
      <StyledTextarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
};

export default CommentsForm;
