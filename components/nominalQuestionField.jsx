export default function NominalQuestionField(props) {
    const nominalQuestions = props.field.question;
    //console.log(nominalOptions);
    return (
        <p className="mb-1" >{nominalQuestions}</p>
        );
}