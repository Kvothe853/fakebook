import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px;
  width: 400px;
`;

const StyledTextarea = styled.textarea`
  min-height: 150px;
  width: 100%;
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

const StyledEdit = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  &:hover {
    transition: 0.2s ease-out;
    color: rgb(104, 85, 224);
  }
`;

const StyledExitBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  &:hover {
    color: red;
  }
`;

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
      <StyledEdit onClick={openModal}>
        <FontAwesomeIcon icon={faEdit} />
      </StyledEdit>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="update comment"
      >
        <div>
          <StyledExitBtn onClick={closeModal}>&#10005;</StyledExitBtn>
          <StyledForm
            onSubmit={(e) => {
              props.updateComment(e, newComment, props.id);
              closeModal();
            }}
          >
            <StyledTextarea
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <RegularButton className="linkBtn" type="submit">
              Update
            </RegularButton>
          </StyledForm>
        </div>
      </Modal>
    </div>
  );
};

export default CommentEdit;
