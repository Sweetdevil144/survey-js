import { useEffect, useState, useCallback } from 'react';
import { SurveyModel } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { surveyParser } from '../assets/surveyParser';
import { DefaultFonts } from "survey-creator-core";
import { marked } from "marked";

const renderer = {
  image: function (src, _, alt) {
    console.log(JSON.stringify(src))
    console.log(alt)
    return `<img src="${src.href}" alt="${alt === undefined ? "Image ALT" : alt}" style="border-radius: 50%; width: 30px; height: 30px;" />`;
  }
};

marked.use({ renderer });

export default function SurveyComponent({ surveyUrl }) {
  const [surveyData, setSurveyData] = useState(null);

  const fetchSurveyData = async () => {
    try {
      const res = await fetch(surveyUrl);
      const data = await res.json();
      const updatedData = await surveyParser(data);
      console.log(updatedData)
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

  survey.onTextMarkdown.add((_, options) => {
    let str = marked(options.text);
    options.html = str;
  });

  DefaultFonts.push("Montserrat, sans-serif");

  return <Survey model={survey} />;
}
