import styled from "styled-components";

const StyledForm = styled.form`
  border: solid 1px #33;
`;

const Register = () => {
  return (
    <StyledForm>
      <label>First Name</label>
      <input type="text" />
    </StyledForm>
  );
};

export default Register;
