import styled from "styled-components";
import { useState, useEffect } from "react";
import DateConverter from "../DateConverter/DateConverter";

const StyledCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  border: solid 1px #ddd;
  padding: 20px;
`;

const Comment = (props) => {
  const comment = props.data;

  return (
    <StyledCommentBox>
      <div>{comment.comment}</div>
      <DateConverter date={comment.date} />
    </StyledCommentBox>
  );
};

export default Comment;
