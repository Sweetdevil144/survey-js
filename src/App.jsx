import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SurveyComponent from "./components/SurveyComponent";
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <h1>Survey Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link to="/survey/self">Self Feedback</Link>
            </li>
            <li>
              <Link to="/survey/individual">Individual Feedback</Link>
            </li>
            <li>
              <Link to="/survey/team">Team Feedback</Link>
            </li>
            <li>
              <Link to="/survey/peer">Peer Feedback</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/survey/self" element={<SurveyComponent surveyUrl="http://localhost:3000/api/survey/self" />} />
          <Route path="/survey/individual" element={<SurveyComponent surveyUrl="https://localhost:3000/api/survey/individual" />} />
          <Route path="/survey/team" element={<SurveyComponent surveyUrl="http://localhost:3000/api/survey/team" />} />
          <Route path="/survey/peer" element={<SurveyComponent surveyUrl="http://localhost:3000/api/survey/peer" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
