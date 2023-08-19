import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/Authentication/Signup";
import SignIn from "./pages/Authentication/SignIn";
import { useEffect } from "react";
import JobSeekerProfile from "./pages/JobSeeker/JobSeekerProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccountInfo from './pages/JobSeeker/AccountInfo';

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
      <Route path="/jobseeker/:jobseeker_id/accountInfo" element={<AccountInfo/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    //</BrowserRouter>
  );
}
export default App;
