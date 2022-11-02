import styled from "styled-components";

const StyledForm = styled.form`
  margin: 20px 0;
`;

const Sorting = (props) => {
  return (
    <StyledForm>
      <label>Sort by: </label>
      <select
        onChange={(e) => props.func(e.target.value)}
        name="order"
        id="order"
      >
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
        <option value="MOST">Most comments</option>
        <option value="LEAST">Least comments</option>
      </select>
    </StyledForm>
  );
};

export default Sorting;
