import { useEffect, useState, useCallback } from 'react';
import { SurveyModel } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { surveyParser } from '../assets/surveyParser';
import { DefaultFonts } from "survey-creator-core";
import { marked } from "marked";

const renderer = {
  image: function (src) {
    if (src.text) {
      return `
        <div class="leader-container" style="display: flex; align-items: center;">
          <img src="${src.href}" alt="${src.text}" 
            style="border-radius: 50%; width: 42px; height: 42px;" class="leader_image" />
          <span class="leader_name" style="margin-left: 10px;">${src.text}</span>
        </div>
      `;
    } else {
      return `
        <div class="smiley-container" style="display: flex; align-items: center;">
          <img src="${src.href}" alt="smiley_image" 
            style="border-radius: 50%; width: 42px; height: 42px;" class="smiley_image" />
        </div>
      `;
    }
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
      setSurveyData(updatedData);
      console.log(updatedData)
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
  
  survey.onAfterRenderQuestion.add((survey, options) => {
    if (options.question.rateType === "smileys") {
      const smileyLabels = options.htmlElement.querySelectorAll('.sd-rating__item-smiley');
      smileyLabels.forEach((label, index) => {
        label.innerHTML = ''; 
        const img = document.createElement('img');
        img.src = `/public/emojis/smiley_${index + 1}.svg`;
        img.alt = `Smiley ${index + 1}`;
        img.className = 'emoji_image';
        img.style.height = '42px';
        img.style.width = '42px';
        label.appendChild(img);
        img.addEventListener('click', function () {
          options.question.value = index + 1;
        });
      });
    }
  });
  
  DefaultFonts.push("Montserrat, sans-serif");

  return <Survey model={survey} />;
}
