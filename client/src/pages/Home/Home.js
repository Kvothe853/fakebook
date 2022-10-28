import Navbar from "../../components/Navbar/Navbar";
import Questions from "../../components/Questions/Questions";
import { useState, useEffect } from "react";

const Home = () => {
  const [initialState, setInitialState] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <div>Sveiki visi</div>
      <h1>Questions</h1>
      <Questions />
    </div>
  );
};

export default Home;
