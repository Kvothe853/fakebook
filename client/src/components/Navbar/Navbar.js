import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import Modal from "react-modal";
import Login from "../../pages/Auth/Login";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommenting } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const NavbarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #ddd;
`;

const StyledNav = styled.nav`
  max-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  padding: 20px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  user-select: none;
  font-size: 22px;
  color: rgb(104, 85, 224);
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

const Navbar = () => {
  // login
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      setLoginStatus(true);
    }
  }, []);

  // modal
  const [modalIsOpen, setIsOpen] = useState(false);
  //notifications
  const message = (text) => toast(`${text}`);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function logout() {
    setLoginStatus(false);
    closeModal();
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  function testas() {
    setLoginStatus(true);
  }

  return (
    <NavbarContainer>
      <StyledNav>
        <StyledLink to={"/"}>
          <FontAwesomeIcon icon={faCommenting} color="rgb(104, 85, 224)" />{" "}
          Fakebook
        </StyledLink>
        <div>
          <div>
            {!loginStatus && (
              <div>
                <RegularButton className={"linkBtn"} func={openModal}>
                  Log in
                </RegularButton>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Login modal"
                >
                  <Login
                    closeModal={closeModal}
                    func={testas}
                    notification={message}
                  />
                </Modal>
              </div>
            )}
            {loginStatus && (
              <RegularButton className={"linkBtn"} func={logout}>
                Logout
              </RegularButton>
            )}
          </div>
          <div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastStyle={{
                backgroundColor: "rgba(104, 85, 224, 0.7)",
                color: "#fff",
              }}
            />
          </div>
        </div>
      </StyledNav>
    </NavbarContainer>
  );
};

export default Navbar;
