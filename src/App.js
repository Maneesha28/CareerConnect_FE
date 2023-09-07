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
import CompanyProfile from "./pages/CompanyProfile";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccountInfo from './pages/JobSeeker/AccountInfo';

import CompanyAccountInfo from './pages/Company/CompanyAccountInfo';
import CompanyInfo from './pages/Company/CompanyInfo';
import CompanyPage from './pages/Company/CompanyPage';
import CompanyReviews from './pages/Company/CompanyReviews';
import CompanyVacancy from './pages/Company/CompanyVacancy';

import AddJobPost from './pages/Company/AddJobPost';
import JobPost from './pages/Company/JobPost';

import ViewCompanyPage from './pages/JobSeeker/ViewCompanyPage';
import ViewJobPost from './pages/JobSeeker/ViewJobPost';
import ViewCompanyReviews from './pages/JobSeeker/ViewCompanyReviews';
import ViewCompanyVacancies from './pages/JobSeeker/ViewCompanyVacancies';
import ViewShortListedJobs from './pages/JobSeeker/ViewShortListedJobs';

import SidebarOptionsCompany from './components/SidebarOptionsCompany';
import JobListsAndPost from "./pages/Company/JobListsAndPost";

import { NotificationContext } from "./context/notificationContext";

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
      <Route path="/companyJobPosts/:company_id" element={<JobListsAndPost />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/jobseeker/:jobseeker_id/accountInfo" element={<AccountInfo/>}/>
      
      <Route path="/companyPage" element={<CompanyPage/>}/>
      <Route path="/companyInfo/:company_id" element={<CompanyInfo/>}/>

      <Route path="/companyAccountInfo" element={<CompanyAccountInfo/>}/>
      <Route path="/companyReviews/:company_id" element={<CompanyReviews/>}/>
      <Route path="/companyVacancy/:company_id" element={<CompanyVacancy/>}/>

      <Route path="/companySidebar" element={<SidebarOptionsCompany/>}/>

      <Route path="/addJobPost/:company_id" element={<AddJobPost/>}/>
      <Route path="/companyViewJobPost/:company_id" element={<JobPost isLoggedInUser={true} isJobSeeker={false} jobseeker_id={3} jobpost_id={18}/>}/>

      <Route path="/viewCompanyPage/*" element={<ViewCompanyPage/>}/>
      <Route path="/viewJobPost/:jobpost_id" element={<ViewJobPost/>}/>
      <Route path="/viewCompanyReviews" element={<ViewCompanyReviews/>}/>
      <Route path="/viewCompanyVacancies" element={<ViewCompanyVacancies/>}/>
      <Route path="/viewShortlistedJobs" element={<ViewShortListedJobs/>}/>
      <Route path="*" element={<NotFound/>}/>
      
    </Routes>
    </NotificationContext.Provider>
    //</BrowserRouter>
  );
}
export default App;
