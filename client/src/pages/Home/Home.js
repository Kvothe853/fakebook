import Navbar from "../../components/Navbar/Navbar";
import Questions from "../../components/Questions/Questions";
import { useState, useEffect } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`;

const Home = () => {
  const [initialState, setInitialState] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <MainContainer>
        <h1>Questions</h1>
        <Questions />
      </MainContainer>
    </div>
  );
};

export default Home;
