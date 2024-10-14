import { SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";
import 'survey-core/defaultV2.min.css';
import surveyJSON from "../assets/surveyJSON";

export default function SurveyComponent() {
  const survey = new SurveyModel(surveyJSON);
  survey.onComplete.add(function (result) {
    console.log("Survey results: " + JSON.stringify(result.data));
  });

  return <Survey model={survey} />;
}
