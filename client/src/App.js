import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import QuestionContainer from "./pages/QuestionContainer/QuestionContainer";
import Error from "./pages/Error/Error";
import EditQuestion from "./pages/EditQuestion/EditQuestion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/:id" element={<QuestionContainer />} />
      <Route path="/edit/question/:id" element={<EditQuestion />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
