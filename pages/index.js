import Image from "next/image";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ContinuousQuestionField from "../components/continuousQuestionField";
import NominalQuestionField from "../components/nominalQuestionField";
import ContinuousChoiceField from "../components/continuousChoiceField";
import NominalChoiceField from "../components/nominalChoiceField";

export default function DisplayField() {
  const [questions, setQuestions] = useState([]);
  const [decision, setDecision] = useState("");
  const [answers, setAnswers] = useState({});
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    const url = "https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "token 9307bfd5fa011428ff198bb37547f979",
      },
    })
      .then((response) => response.json())
      .then((responseBody) => {
        setModelName(responseBody.data.attributes.name);
        setQuestions(responseBody.data.attributes.metadata.attributes);
      });
  }, []);

  const setAnswer = (fieldName, fieldValue) => {
    answers[fieldName] = fieldValue;
    setAnswers(answers);
  };

  //console.log(questions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      data: {
        type: "scenario",
        attributes: {
          input: answers,
        },
      },
    };

    const url = "https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token 9307bfd5fa011428ff198bb37547f979",
        "content-type": "application/vnd.api+json",
      },
      body: JSON.stringify(requestBody),
    }) 
      .then((response) => response.json())
      .then((responseBody) => {
        console.log(responseBody)
        setDecision(responseBody.data.attributes.decision);
      });
  };

  return (
    <div className="flex flex-row justify-evenly mt-10">
      <form
        onSubmit={handleSubmit}
        className="pt-6 pl-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
      >
        <h1 className="font-bold">{modelName}</h1>
        {questions.map((item) => (
          <div key={item.name} className="field-items">
            <Field setAnswer={setAnswer} field={item} />
          </div>
        ))}
        <div className="button-container">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="submit"
          >
            Clear
          </button>
        </div>
      </form>
      <div className="flex text-5xl mt-20">
        <h1>{decision}</h1>
      </div>
    </div>
  );
}

function Field(props) {
  //console.log(props.field);
  if (props.field.type === "Continuous") {
    return (
      <div>
        <ContinuousQuestionField
          field={props.field}
          setAnswer={props.setAnswer}
        />
        <ContinuousChoiceField
          field={props.field}
          setAnswer={props.setAnswer}
        />
      </div>
    );
  } else if (props.field.type === "Nominal") {
    return (
      <div>
        <NominalQuestionField field={props.field} setAnswer={props.setAnswer} />
        <NominalChoiceField field={props.field} setAnswer={props.setAnswer} />
      </div>
    );
  } else {
    console.log("Type not found");
  }
}
