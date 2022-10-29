import styled from "styled-components";
import { useState, useEffect } from "react";

const FormsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseModalButton = styled.button`
  align-self: flex-end;
  border: none;
  background: transparent;
  color: rgb(104, 85, 224);
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 22px;
  height: 22px;
  position: absolute;
  right: 5px;
  top: 5px;
`;

const StyledForm = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-bottom: 12px;
  padding: 8px;
  border: solid 1px #ddd;
  border-radius: 4px;
  color: #333;
  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  color: #666;
  margin: 6px 0;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  // align-self: center;
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 400;
  margin: 5px 0px 0;
  padding: 8px 16px;
  transition: 0.2s;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
  &:hover {
    color: #fff;
    background: rgb(104, 85, 224);
  }
`;

const RegisterMessage = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const EmptyButton = styled.button`
  border: none;
  background: none;
  margin-left: -5px;
  font-weight: bold;
  color: #444;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    color: rgb(104, 85, 224);
  }
`;

const StyledMessage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: red;
`;

const Login = ({ closeModal, func, notification }) => {
  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  // register
  const [currentFormLogin, setCurrentFormLogin] = useState(true);
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  //notifications

  if (loginStatus && localStorage.getItem("token") !== "undefined")
    closeModal();

  function login(e) {
    e.preventDefault();
    if (!email || !password) notification("Please fill all fields");

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
          if (response.err) {
            console.log("error");
            notification("Incorrect Email or Password");
          } else {
            setLoginStatus(true);
            func();
            localStorage.setItem("token", response.token);
            notification("Login successful!");
          }
        })
        .catch((err) => console.log(err));
    }

    setEmail("");
    setPassword("");
  }

  function register(e) {
    e.preventDefault();
    if (
      !registerFirstName ||
      !registerLastName ||
      !registerEmail ||
      !registerPassword
    )
      notification("Please fill all fields");
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
        .then((response) => {
          closeModal();
          notification("Registration Successful, you can Log In now");
        })
        .catch((err) => console.log(err));

      setRegisterFirstName("");
      setRegisterLastName("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  }

  const changeForms = () => {
    setCurrentFormLogin(false);
  };

  return (
    <div>
      <FormsContainer>
        <CloseModalButton onClick={closeModal}>&#10005;</CloseModalButton>
        {currentFormLogin && (
          <StyledForm onSubmit={login}>
            <StyledDiv>
              <StyledLabel>Email</StyledLabel>
              <StyledInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>Password</StyledLabel>
              <StyledInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </StyledDiv>
            <StyledButton>Log In</StyledButton>
            <RegisterMessage>
              Not registered?{" "}
              <EmptyButton onClick={changeForms}>Create an account</EmptyButton>
            </RegisterMessage>
          </StyledForm>
        )}
        {!currentFormLogin && (
          <StyledForm onSubmit={register}>
            <StyledDiv>
              <StyledLabel>First Name</StyledLabel>
              <StyledInput
                type="text"
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>Last Name</StyledLabel>
              <StyledInput
                type="text"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>Email</StyledLabel>
              <StyledInput
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>Password</StyledLabel>
              <StyledInput
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </StyledDiv>
            <StyledButton>Register</StyledButton>
          </StyledForm>
        )}
      </FormsContainer>
    </div>
  );
};

export default Login;
