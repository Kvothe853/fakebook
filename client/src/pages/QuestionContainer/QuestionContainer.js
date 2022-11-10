import Navbar from "../../components/Navbar/Navbar";
import QuestionFunc from "../../components/QuestionFunc/QuestionFunc";
import Layout from "../../components/Layout/Layout";

const QuestionContainer = (props) => {
  return (
    <div>
      <Navbar />
      <Layout>
        <QuestionFunc />
      </Layout>
    </div>
  );
};

export default QuestionContainer;
