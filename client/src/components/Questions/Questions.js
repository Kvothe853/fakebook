import { func } from "joi";
import { useState, useEffect } from "react";

const Questions = () => {
  const [questions, setQuestions] = useState(["Vienas"]);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((resp) => resp.json())
      .then((response) => setQuestions(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function addNewQuestion(e) {
    const tokenas = localStorage.getItem("token");
    e.preventDefault();
    if (newQuestionTitle && newQuestionContent) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "x-access-token": localStorage.getItem("token"),
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          user_id: 1,
          title: newQuestionTitle,
          content: newQuestionContent,
        }),
      };

      fetch("http://localhost:3000/questions", option)
        .then((res) => res.json())
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
    console.log(newQuestionTitle);
    console.log(newQuestionContent);
  }

  return (
    <div>
      <form onSubmit={addNewQuestion}>
        <label>Title</label>
        <input
          type="text"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
        <label>Content</label>
        <input
          type="text"
          value={newQuestionContent}
          onChange={(e) => setNewQuestionContent(e.target.value)}
        />
        <button>Ask a Question</button>
      </form>
      <ul>
        {questions.map((question, id) => (
          <li key={id}>{question.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
