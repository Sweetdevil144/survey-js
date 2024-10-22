import { useEffect, useState, useCallback } from 'react';
import { SurveyModel } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { surveyParser } from '../assets/surveyParser';
import { DefaultFonts } from "survey-creator-core";

export default function SurveyComponent({ surveyUrl }) {
  const [surveyData, setSurveyData] = useState(null);

  const fetchSurveyData = async () => {
    try {
      const res = await fetch(surveyUrl);
      const data = await res.json();
      const updatedData = await surveyParser(data);
      setSurveyData(updatedData);
    } catch (error) {
      console.error('Error fetching survey:', error);
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, [surveyUrl]);

  const handleResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  const survey = new SurveyModel(surveyData);
  survey.onComplete.add(handleResults);
  DefaultFonts.push(
      "Montserrat, sans-serif"
  );

  return <Survey model={survey} />;
}
