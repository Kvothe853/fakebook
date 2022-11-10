import styled from "styled-components";

const FormsContainer = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: flex-end;
  align-items: center;
`;

const SortingForm = styled.form`
  margin: 10px 0;
`;

const SelectBox = styled.select`
  background-color: #ffffff;
  padding: 2px;
  border: 1px solid #d4dbe3;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  color: #4e4e4e;
  min-height: 18px;
  &:focus {
    outline: none;
    border-color: darken(#d4dbe3, 10%);
  }
`;

const StyledLabel = styled.label`
  font-size: 12px;
  color: #777;
`;

const Sorting = (props) => {
  return (
    <FormsContainer>
      <SortingForm>
        <StyledLabel>SORT BY </StyledLabel>
        <SelectBox
          onChange={(e) => props.func(e.target.value)}
          name="order"
          id="order"
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
          <option value="MOST">Most comments</option>
          <option value="LEAST">Least comments</option>
        </SelectBox>
      </SortingForm>
    </FormsContainer>
  );
};

export default Sorting;
