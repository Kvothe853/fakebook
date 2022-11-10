import styled from "styled-components";
import { useState } from "react";

const StyledLabel = styled.label`
  margin-bottom: 15px;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

const StyledTextarea = styled.textarea`
  min-height: 200px;
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

const StyledButton = styled.button`
  color: rgb(104, 85, 224);
  border: solid 1px rgb(104, 85, 224);
  background: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
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
      {/* <StyledLabel>Add Comment</StyledLabel> */}
      <StyledTextarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="What are your thoughts?"
      />
      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
};

export default CommentsForm;
