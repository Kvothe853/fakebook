import Navbar from "../../components/Navbar/Navbar";
import Questions from "../../components/Questions/Questions";
import { useState, useEffect } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: -1px auto 0;
`;

const Home = () => {
  const [initialState, setInitialState] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <MainContainer>
        <Questions />
      </MainContainer>
    </div>
  );
};

export default Home;
