import Navbar from "../../components/Navbar/Navbar";
import Questions from "../../components/Questions/Questions";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";

const MainContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  border-color: #ddd;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <MainContainer>
          <Questions />
        </MainContainer>
      </Layout>
    </div>
  );
};

export default Home;
