import styled from "styled-components";
import DateConverter from "../DateConverter/DateConverter";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useTransition } from "react";
import Avatar from "../Avatar/Avatar";

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  &:hover {
    transition: 0.2s ease-out;
    border-color: #ddd;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const QuestionContent = styled.div`
  padding: 15px;
`;

const StyledLink = styled.div`
  a {
    text-decoration: none;
    h1 {
      color: #333;
    }
    p {
      color: #777;
    }
  }
`;

const StyledP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 2px;
  }
`;

const DateAndCommentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: fit-content;
  font-size: 12px;
`;

const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 11px;
  background: #f4f4f4;
`;

const QuestionTitle = styled.h1`
  font-size: 1.1em;
  color: #444;
  margin-bottom: 8px;
`;

const QuestionParagraph = styled.div`
  font-size: 0.95em;
  color: #555;
`;

const Question = (props) => {
  const [questionAuthor, setQuestionAuthor] = useState(["Random", "User"]);

  const question = props.question;
  const questionId = props.id;

  useEffect(() => {
    fetch(`http://localhost:3000/users/${question.user_id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          setQuestionAuthor(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const navigateToQuestionContainer = () => {
    navigate(`./questions/${question.id}`, { state: question });
  };

  const maxLength = 300;
  const text = question.content;

  return (
    <StyledLink>
      <QuestionBox key={questionId} onClick={navigateToQuestionContainer}>
        <QuestionInfo>
          <Avatar
            name={[
              `${questionAuthor[0].firstName}`,
              `${questionAuthor[0].lastName}`,
            ]}
          />
          <DateAndCommentsDiv>
            <DateConverter date={question.date} />
            <div>
              <StyledP>
                <span>{question.total_question_comments}</span>
                <FontAwesomeIcon icon={faCommentDots} color="#999" />
              </StyledP>
            </div>
          </DateAndCommentsDiv>
        </QuestionInfo>
        <QuestionContent>
          <QuestionTitle>{question.title}</QuestionTitle>
          <QuestionParagraph>
            {text.length > maxLength
              ? `${text.substring(0, maxLength)}...`
              : `${text}`}
            {/* {text} */}
          </QuestionParagraph>
        </QuestionContent>
      </QuestionBox>
      {/* </Link> */}
    </StyledLink>
  );
};

export default Question;
