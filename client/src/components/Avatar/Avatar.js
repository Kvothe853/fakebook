import styled from "styled-components";

const StyledAvatar = styled.div`
  padding: 5px 7px;
  border-left: solid 2px #444;
  border-color: rgb(104, 85, 224);
  color: #444;
  font-weight: 400;
  font-size: 14px;
`;

const Avatar = ({ name }) => {
  const convertedName = `${name[0]} ${name[1].slice(0, 1)}.`;
  return <StyledAvatar>{convertedName}</StyledAvatar>;
};

export default Avatar;
