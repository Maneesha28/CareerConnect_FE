import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/JobSeeker/Profile';
import AccountInfo from './pages/JobSeeker/AccountInfo';
import AchievementInfo from './pages/JobSeeker/AchievementInfo';
import EduInfo from './pages/JobSeeker/EduInfo';
import ProjectInfo from './pages/JobSeeker/ProjectInfo';
import WorkInfo from './pages/JobSeeker/WorkInfo';
import PublicationInfo from './pages/JobSeeker/PublicationInfo';
import SkillInfo from './pages/JobSeeker/SkillInfo';
import PersonalInfo from './pages/JobSeeker/PersonalInfo';
// changed by any
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    // see if browser router is needed for proper working
    // urls are searched & matched in top down fashion (I guess), so "/" need to at first position 
    // if any "localhost:3001/" is used
    //<BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/register" element={<SignUp />} />
      <Route path="/jobseeker/:jobseeker_id" element={<JobSeekerProfile />} />
      <Route path="/company/:company_id" element={<CompanyProfile />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/accountInfo" element={<AccountInfo/>}/>
      <Route path="/achievementInfo" element={<AchievementInfo/>}/>
      <Route path="/educationalInfo" element={<EduInfo/>}/>
      <Route path="/projectInfo" element={<ProjectInfo/>}/>
      <Route path="/workInfo" element={<WorkInfo/>}/>
      <Route path="/publicationInfo" element={<PublicationInfo/>}/>
      <Route path="/skillInfo" element={<SkillInfo/>}/>
      <Route path="/personalInfo" element={<PersonalInfo/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    //</BrowserRouter>
  );
}
export default App;
