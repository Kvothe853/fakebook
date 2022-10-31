import styled from "styled-components";
import { useState, useEffect } from "react";
import DateConverter from "../DateConverter/DateConverter";
import Avatar from "../Avatar/Avatar";

const StyledCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  border: solid 1px #ddd;
  padding: 20px;
`;

const CommentLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const CommentRightSide = styled.div``;

const Comment = (props) => {
  const comment = props.data;
  const [currentLikes, setCurrentLikes] = useState(comment.likes);

  const [edited, setEdited] = useState(false);

  const like = () => {
    setCurrentLikes(currentLikes + 1);
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        likes: currentLikes + 1,
        id: comment.id,
      }),
    };

    fetch(`http://localhost:3000/comments/likes/${comment.id}`, option).catch(
      (err) => console.log(err)
    );
  };

  const dislike = () => {
    setCurrentLikes(currentLikes - 1);
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        likes: currentLikes - 1,
        id: comment.id,
      }),
    };

    fetch(`http://localhost:3000/comments/likes/${comment.id}`, option).catch(
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    if (comment.edited) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  }, []);

  return (
    <StyledCommentBox>
      <CommentLeftSide>
        <Avatar name={[comment.firstName, comment.lastName]} />
        <div>{comment.comment}</div>
      </CommentLeftSide>
      <CommentRightSide>
        <DateConverter date={comment.date} />
        <button>Edit</button>
        {edited && <div>Edited.....</div>}
        <div>Likes: {currentLikes}</div>
        <div>
          <button onClick={like}>+</button>
          <button onClick={dislike}>-</button>
        </div>
      </CommentRightSide>
    </StyledCommentBox>
  );
};

export default Comment;
