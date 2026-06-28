import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; // added useNavigate
import Home from "./pages/Home";
import Auth from "./pages/Auth.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage";
import InterviewHistory from "./pages/InterviewHistory";
import Pricing from "./pages/Pricing";
import InterviewReport from "./pages/InterviewReport";

// Use environment variable with fallback to production URL
export const ServerUrl = import.meta.env.VITE_SERVER_URL || "https://prohire-ai.onrender.com";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // new

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
        // Added: redirect to auth on 401
        if (error.response?.status === 401) {
          navigate("/auth");
        }
      }
    };
    getUser();
  }, [dispatch, navigate]); // added navigate dependency

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/history" element={<InterviewHistory />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/report/:id" element={<InterviewReport />} />
    </Routes>
  );
}

export default App;