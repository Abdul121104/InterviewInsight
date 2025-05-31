import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ViewInterviews from "./pages/ViewInterviews";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import SubmitInterview from "./pages/SubmitInterview";
import { AuthProvider } from "./lib/auth-context";
import { GoogleCallback } from "./components/GoogleCallback";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <HowItWorks />
              <Features />
              <Testimonials />
              <FAQ />
              <Footer />
              <ScrollToTop />
            </>
          } />
          <Route path="/interviews" element={<ViewInterviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/submit-interview" element={
            <ProtectedRoute>
              <SubmitInterview />
            </ProtectedRoute>
          } />
          <Route path="/post-interview" element={
            <ProtectedRoute>
              <SubmitInterview />
            </ProtectedRoute>
          } />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
