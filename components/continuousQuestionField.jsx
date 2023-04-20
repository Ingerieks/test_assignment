export default function ContinuousQuestionField(props) {
    let continuousQuestions = props.field.question;
    return (
        <p className="mb-1">{continuousQuestions}</p>
        );
  }