const DateConverter = (props) => {
  const str = `${props.date}`;

  const years = str.slice(0, 10);
  const time = str.slice(11, 16);

  return (
    <div>
      {years} {time}
    </div>
  );
};

export default DateConverter;
