import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ViewInterviews from "./pages/ViewInterviews";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
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
            <Team />
            <FAQ />
            <Footer />
            <ScrollToTop />
          </>
        } />
        <Route path="/interviews" element={<ViewInterviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
