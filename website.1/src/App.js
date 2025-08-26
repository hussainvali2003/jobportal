import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import Jobs from "./Components/Jobs";
import Jobcard from "./Components/Jobcard";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import Recruiterlog from "./Components/Recruiterlog";
import Hire from "./Components/TalentedCandidate";
import Footer from "./Components/Footer";
import NonIT from "./Components/NonIT";
import Userjobs from "./Components/Userjobs";
import PostJobs from "./Components/PostJob";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Contact from "./Components/Contact";
import About from "./Components/About";
import StatsSection from "./Components/StatsSection";
import Services from "./Components/Services";
import Faqs from "./Components/Faqs";
import Settings from "./Components/Settings";
import AddRecruiter from "./Components/AddRecruiter";
import ManageJobs from "./Components/ManageJobs";
import ManageRecruiters from "./Components/ManageRecruiter";
import RecruiterDashboard from "./Components/RecruiterDasboard";
import JoinAsEmployer from "./Components/JoinAsEmployer";
import RecruiterForgetPassword from "./Components/RecruiterForgetPassword";
import RecruiterResetPassword from "./Components/RecruiterResetPassword";
import Payment from "./Components/Payment";
import TermsAndConditions from "./Components/TermsAndConditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import MyApplication from "./Components/MyApplication";
import ReviewComponent from "./Components/Review";
import ManageUsers from "./Components/ManageUsers";
import MainProfile from "./Components/MainProfile";
import { ProfileCompletionProvider } from "./Context/ProfileCompletionContext";
import ApplicationsDashboard from "./Components/ApplicationsDashboard";
import Notification from "./Components/Notification";


function AppWrapper() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const noNavbarPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ];
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/jobs");
        setJobs(response.data);
        setError('');
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <>
      {isHomePage && showNavbar && (
        <div className="background-wrapper">
          <div className="top-section">
            <Navbar userRole={userRole} handleLogout={handleLogout} />
            <Search jobs={jobs} loading={loading} />
          </div>
        </div>
      )}
      {!isHomePage && showNavbar && <Navbar userRole={userRole} handleLogout={handleLogout} />}
      <ProfileCompletionProvider>
        <Routes>
          <Route path="/" element={
            <>
              <Jobcard />
              <Hire />
              <StatsSection />
              <ReviewComponent />
              <Footer />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mainProfile" element={<MainProfile />} />
          <Route path="/recruiter-login" element={<Recruiterlog setUserRole={setUserRole} />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/NonIT" element={<NonIT />} />
          <Route path="/jobs" element={<Jobs jobs={jobs} loading={loading} error={error} />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/About" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/manage-recruiters" element={<ManageRecruiters />} />
          <Route path="/recruiter-forgot-password" element={<RecruiterForgetPassword />} />
          <Route path="//recruiter-reset-password" element={<RecruiterResetPassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/terms&conditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/my-applications" element={<MyApplication />} />
          <Route path="/joinemployers" element={<JoinAsEmployer />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-applications" element={<ApplicationsDashboard />} />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/add-recruiter"
            element={userRole === "ADMIN" ? <AddRecruiter /> : <Recruiterlog setUserRole={setUserRole} />}
          />
          <Route
            path="/recruiter-dashboard"
            element={
              userRole === "RECRUITER" || userRole === "ADMIN"
                ? <RecruiterDashboard />
                : <Recruiterlog setUserRole={setUserRole} />
            }
          />
          <Route
            path="/user-jobs"
            element={userRole ? <Userjobs /> : <Login setUserRole={setUserRole} />}
          />
          <Route path="/profile" element={<MainProfile />} />
        </Routes>
      </ProfileCompletionProvider>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
export default App;
