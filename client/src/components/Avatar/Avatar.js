import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: darkblue;
  color: #fff;
  margin-right: 15px;
`;

const Avatar = ({ name }) => {
  const convertedName = `${name[0].slice(0, 1)}${name[1].slice(0, 1)}`;
  return <StyledAvatar>{convertedName.toUpperCase()}</StyledAvatar>;
};

export default Avatar;
