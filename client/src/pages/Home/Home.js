import Navbar from "../../components/Navbar/Navbar";
import Questions from "../../components/Questions/Questions";
import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: -1px auto 0;
  border-color: #ddd;
`;

const Home = () => {
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
