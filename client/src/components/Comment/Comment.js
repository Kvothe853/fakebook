import styled from "styled-components";
import { useState, useEffect } from "react";
import DateConverter from "../DateConverter/DateConverter";
import Avatar from "../Avatar/Avatar";
import Modal from "react-modal";
import DeleteQuestionMessage from "../DeleteQuestionMessage/DeleteQuestionMessage";
import jwt_decode from "jwt-decode";
import CommentEdit from "../CommentEdit/CommentEdit";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  },
};

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
  const [edited, setEdited] = useState(comment.edited);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(comment.likes);
  const [loginStatus, setLoginStatus] = useState(false);
  const [activeUserInfo, setactiveUserInfo] = useState({});

  // modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const checkLoginStatus = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      setLoginStatus(true);
      const decodedUser = jwt_decode(localStorage.getItem("token"));
      setactiveUserInfo(decodedUser);
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    if (comment.edited === 1) {
      setEdited(true);
    } else {
      setEdited(false);
    }
    checkLoginStatus();
  }, []);

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

  return (
    <StyledCommentBox>
      <CommentLeftSide>
        <Avatar name={[comment.firstName, comment.lastName]} />
        <div>{comment.comment}</div>
      </CommentLeftSide>
      <CommentRightSide>
        <DateConverter date={comment.date} />
        {comment.user_id === activeUserInfo.id && (
          <CommentEdit
            updateComment={props.updateComment}
            commentContent={comment.comment}
            id={comment.id}
          >
            Edit
          </CommentEdit>
        )}
        {edited && loginStatus && <div>Edited.....</div>}
        <div>Likes: {currentLikes}</div>
        {loginStatus && (
          <div>
            <button onClick={like}>+</button>
            <button onClick={dislike}>-</button>
          </div>
        )}
        {comment.user_id === activeUserInfo.id && (
          <div>
            <button onClick={openModal}>&#10005;</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="delete question button"
            >
              <DeleteQuestionMessage
                text={"comment"}
                closeModal={closeModal}
                deleteQuestion={() => {
                  props.deleteComment(comment.id);
                }}
              />
            </Modal>
          </div>
        )}
      </CommentRightSide>
    </StyledCommentBox>
  );
};

export default Comment;
