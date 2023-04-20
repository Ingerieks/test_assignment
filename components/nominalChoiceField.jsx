export default function NominalChoiceField(props) {
  const nominalOptions = props.field.domain.values;

  const changeHandler = (e) =>
    props.setAnswer(props.field.name, e.target.value);

  return (
    <>
      <div key={props.field.name}>
        <div className="choice-field">
          {nominalOptions.map((option) => (
            <>
              <input
                onChange={changeHandler}
                className="mb-5 ml-5"
                type="radio"
                value={option}
                name={props.field.name}
              />
              <label className="ml-1">{option}</label>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
