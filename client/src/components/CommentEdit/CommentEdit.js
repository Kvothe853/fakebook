import Modal from "react-modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

Modal.setAppElement("#root");

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

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

const CommentEdit = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState(props.commentContent);
  // modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>EDIT</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="update comment"
      >
        <form
          onSubmit={(e) => {
            props.updateComment(e, newComment, props.id);
            closeModal();
          }}
        >
          <label>Comment</label>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </div>
  );
};

export default CommentEdit;
