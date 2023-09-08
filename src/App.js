import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/Authentication/Signup";
import SignIn from "./pages/Authentication/SignIn";
import { useState, useEffect } from "react";
import JobSeekerProfile from "./pages/JobSeeker/JobSeekerProfile";
import CompanyVacancy from './pages/Company/CompanyVacancy';
import NotFound from './pages/NotFound';
import AccountInfo from './pages/JobSeeker/AccountInfo';
import CompanyPage from './pages/Company/CompanyPage';
import JobListsAndPost from "./pages/Company/JobListsAndPost";

import AddJobPost from './pages/Company/AddJobPost';
// import CompanyViewJobPost from './pages/Company/CompanyViewJobPost';

import SidebarOptionsCompany from './components/SidebarOptionsCompany';
import HtmlToPdfConverter from "./pages/HtmlToPdfConverter";
import FollowersList from "./pages/test";

import { NotificationContext } from "./context/notificationContext";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import HomePage from "./pages/JobSeeker/HomePage";

// changed by any
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const [allNotifications, setAllNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

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
    <NotificationContext.Provider value={{allNotifications, setAllNotifications, unreadNotifications, setUnreadNotifications, unreadNotificationsCount, setUnreadNotificationsCount}}>
      
    <Routes>
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/register" element={<SignUp />} />
      <Route path="/jobseeker/:jobseeker_id" element={<JobSeekerProfile />} />
      <Route path="/company/:company_id" element={<CompanyPage />} />
      <Route path="/companyJobPosts/:company_id" element={<JobListsAndPost/>}/>
      <Route path="/home/:jobseeker_id" element={<HomePage/>}/>
      <Route path="/jobseeker/:jobseeker_id/accountInfo" element={<AccountInfo/>}/>
      
      <Route path="/companyPage" element={<CompanyPage/>}/>

      <Route path="/companySidebar" element={<SidebarOptionsCompany/>}/>
      <Route path="/companyVacancy/:company_id" element={<CompanyVacancy/>}/>
      <Route path="/addJobPost/:company_id" element={<AddJobPost/>}/>
      {/* <Route path="/companyViewJobPost/:jobpost_id" element={<CompanyViewJobPost/>}/> */}
      <Route path="/h2p" element={<HtmlToPdfConverter/>}/>
      <Route path="/f" element={<FollowersList/>}/>
      <Route path="*" element={<NotFound/>}/>

      <Route path="/application/:jobseeker_id" element={<ResumeBuilder/>}/>
      
    </Routes>
    </NotificationContext.Provider>
    //</BrowserRouter>
  );
}
export default App;
