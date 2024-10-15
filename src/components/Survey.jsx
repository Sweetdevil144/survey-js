import { useCallback } from 'react';
import { SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";
import 'survey-core/defaultV2.min.css';
import surveyJSON from "../assets/surveyJSON";

export default function SurveyComponent() {
  const survey = new SurveyModel(surveyJSON);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  survey.onComplete.add(alertResults);
  return <Survey model={survey} />;
}
