import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  user-select: none;
  padding: 0 24px;
  img {
    max-width: 600px;
    width: 100%;
  }
`;

const Error = () => {
  return (
    <StyledDiv>
      <img
        src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png"
        alt="error"
      />
    </StyledDiv>
  );
};

export default Error;
