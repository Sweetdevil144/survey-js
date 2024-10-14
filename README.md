# **Survey Implementation using SurveyJS**

I am planning to integrate the SurveyJS data in the Backend which will be collected in JSON format from the frontend using SurveyJS. This survey will collect information on user satisfaction, features used, and additional comments initially and may be further modified as per request from Vishal or others.

I will create a separate branch within the Repo `trumio-web-react` as `feature/surveyJS` and will do additions within the branch before creating a PR. I’m thinking of creating a separate route initially for better editing options which will be further migrated to a planned component after completion of implementation.

## **Objectives**

* **Develop a flexible survey** that can capture user satisfaction levels, features used, and open-ended feedback.  
* **Create a modifiable survey schema** that can be easily adjusted based on project requirements or feedback.  
* **Document test cases** for various user scenarios and ensure robust survey performance.

---

## **Proposed Workflow**

### **1\. Initial Survey Design**

* **Objective**: Understand the key questions and design an initial structure for the survey.  
* **Action Plan**:  
  * Define the types of questions:  
    * **Radio Buttons**: To collect satisfaction levels (e.g., 1-5 scale).  
    * **Multi-select Options**: For users to select features they have used.  
    * **Text Input**: To allow users to leave additional comments.  
  * **Deliverable**: Create an initial survey schema in JSON format, using SurveyJS's schema definition.

---

### **2\. Schema Review and Modifications**

* **Objective**: Review the initial survey structure and propose improvements based on feedback.  
* **Action Plan**:  
  * Conduct a review of the JSON schema.  
  * Propose modifications to enhance user experience (e.g., add or refine options for satisfaction levels and multi-select features).  
  * **Deliverable**: Submit a modified survey schema (JSON) with the proposed changes.

---

### **3\. Survey Implementation in SurveyJS**

* **Objective**: Implement the finalized survey schema in SurveyJS and ensure smooth functionality.  
* **Action Plan**:  
  * Use the finalized JSON schema to build the survey using the **SurveyJS library**.  
  * Implement various types of questions (radio buttons, multi-select, and text input).  
  * Ensure compatibility with different devices (mobile, desktop).  
  * **Deliverable**: A fully functional survey hosted on the SurveyJS platform.

---

### **4\. Feedback Capture and Testing**

* **Objective**: Capture feedback and validate survey performance through testing.  
* **Action Plan**:  
  * Collect feedback responses and ensure data integrity.  
  * Create **test case scenarios** (e.g., edge cases, different input combinations).  
  * Document results from testing and make necessary adjustments.  
  * **Deliverable**: Documented test cases and captured feedback in JSON format from SurveyJS.

---

## **Tools and Resources**

* **SurveyJS**: For building and customizing the survey.  
* **JSON Schema**: To define and structure the survey questions.  
* **Testing Tools**: Basic browser testing tools to validate survey functionality on different platforms.

## **Timeline**

| Task | Duration | Estimated Completion |
| ----- | ----- | ----- |
| Initial Survey Design | 1 week | October 10 \- 16 |
| Schema Review & Modifications | 2 days | October 17 \- 19 |
| SurveyJS Implementation | 4 days | October 20 \- 23 |
| Feedback Capture & Testing | 5 days | October 24 \- 28 |

---

## **Next Steps**

1. Review this proposal and finalize the initial survey schema.  
2. Begin the design phase and prepare the initial JSON schema.  
3. Incorporate feedback and proceed with the SurveyJS implementation.

