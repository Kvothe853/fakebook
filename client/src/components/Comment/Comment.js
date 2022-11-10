import styled from "styled-components";
import { useState, useEffect } from "react";
import DateConverter from "../DateConverter/DateConverter";
import Avatar from "../Avatar/Avatar";
import Modal from "react-modal";
import DeleteQuestionMessage from "../DeleteQuestionMessage/DeleteQuestionMessage";
import jwt_decode from "jwt-decode";
import CommentEdit from "../CommentEdit/CommentEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
  flex-direction: column;
  margin: 5px 15px 8px 15px;
  border: solid 1px #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 10px;
`;

const CommentContent = styled.div`
  padding: 20px;
  border-bottom: solid 1px #ddd;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const CommentEditContainer = styled.div`
  display: flex;
`;

const CommentLikesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  margin-right: 10px;
  button {
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
    color: #777;
    height: 20px;
    &:nth-of-type(1) {
      margin-bottom: -2px;
      &:hover {
        color: #4bb543;
      }
    }
    &:nth-of-type(2) {
      margin-top: -2px;
      &:hover {
        color: #ed4337;
      }
    }
  }
`;

const StyledDeleteButton = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  &:hover {
    transition: 0.2s ease-out;
    color: #d11a2a;
  }
`;

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
      <CommentHeader>
        <Avatar name={[comment.firstName, comment.lastName]} />
        <DateConverter date={comment.date} />
      </CommentHeader>
      <CommentContent>
        <div>{comment.comment}</div>
      </CommentContent>
      <CommentInfo>
        <CommentLikesContainer>
          {loginStatus && (
            <StyledButtonsContainer>
              <button onClick={like}>
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
              <button onClick={dislike}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </StyledButtonsContainer>
          )}
          <div>Likes: {currentLikes}</div>
        </CommentLikesContainer>
        <CommentEditContainer>
          {edited && loginStatus && <div>Edited.....</div>}
          {comment.user_id === activeUserInfo.id && (
            <CommentEdit
              updateComment={props.updateComment}
              commentContent={comment.comment}
              id={comment.id}
            >
              Edit
            </CommentEdit>
          )}
          {comment.user_id === activeUserInfo.id && (
            <div>
              <StyledDeleteButton onClick={openModal}>
                <FontAwesomeIcon icon={faTrashCan} />
              </StyledDeleteButton>
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
        </CommentEditContainer>
      </CommentInfo>
    </StyledCommentBox>
  );
};

export default Comment;
