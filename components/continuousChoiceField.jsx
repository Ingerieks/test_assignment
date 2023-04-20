export default function ContinuousChoiceField(props) {
    const continuousOptionsLower = props.field.domain.lower;
    const continuousOptionsUpper = props.field.domain.upper;
    
    return (
      <>
        <input
          onChange={(e) => props.setAnswer(props.field.name, e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
          type="number"
          min={continuousOptionsLower}
          max={continuousOptionsUpper}
        />
      </>
    );
  }
  
  