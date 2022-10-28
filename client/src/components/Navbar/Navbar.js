import styled from "styled-components";
import RegularButton from "../Buttons/RegularButton";
import Register from "../../pages/Auth/Register";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { func } from "joi";

Modal.setAppElement("#root");

const NavbarContainer = styled.div`
  padding: 14px;
  border-bottom: solid 1px #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 240px;
`;

const StyledInput = styled.input`
  padding: 5px;
  border: solid 1px #333;
  &:focus {
    outline: none;
    border solid 1px #333;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Navbar = () => {
  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // register
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  //
  const [loginStatus, setLoginStatus] = useState(false);

  function login(e) {
    e.preventDefault();

    if (email && password) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      fetch("http://localhost:3000/auth/login", option)
        .then((res) => res.json())
        .then((response) => {
          setLoginStatus(true);
          test(response);
          localStorage.setItem("token", response.token);
        })
        .catch((err) => console.log(err));
    }

    setEmail("");
    setPassword("");
  }

  function register(e) {
    e.preventDefault();
    if (
      registerFirstName &&
      registerLastName &&
      registerEmail &&
      registerPassword
    ) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          password: registerPassword,
        }),
      };

      fetch("http://localhost:3000/auth/register", option)
        .then((res) => res.json())
        .then((response) => test(response))
        .catch((err) => console.log(err));
    }

    setRegisterFirstName("");
    setRegisterLastName("");
    setRegisterEmail("");
    setRegisterPassword("");
  }

  function logout() {
    localStorage.removeItem("token");
    setLoginStatus(false);
  }

  function test(data) {
    console.log(data);
  }

  return (
    <NavbarContainer>
      <div>Home</div>
      <div>
        <RegularButton>Login</RegularButton>
        <RegularButton>Register</RegularButton>
        <button onClick={logout}>Log out</button>
      </div>
      <StyledForm onSubmit={login}>
        Login
        <hr />
        <StyledDiv>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StyledDiv>
        <StyledDiv>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledDiv>
        <button>Submit</button>
      </StyledForm>
      <StyledForm onSubmit={register}>
        Register
        <hr />
        <StyledDiv>
          <label>First Name</label>
          <input
            type="text"
            value={registerFirstName}
            onChange={(e) => setRegisterFirstName(e.target.value)}
          />
        </StyledDiv>
        <StyledDiv>
          <label>Last Name</label>
          <input
            type="text"
            value={registerLastName}
            onChange={(e) => setRegisterLastName(e.target.value)}
          />
        </StyledDiv>
        <StyledDiv>
          <label>Email</label>
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </StyledDiv>
        <StyledDiv>
          <label>Password</label>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </StyledDiv>
        <button>Submit</button>
      </StyledForm>
    </NavbarContainer>
  );
};

export default Navbar;
