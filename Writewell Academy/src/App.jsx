import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insights from "./pages/Insights"
import Contact from "./pages/Contact";
import Classes from "./pages/Classes";
import FeedbackList from "./components/feedback";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Insights" element={<Insights />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/feedback" element={<FeedbackList />} />
    </Routes>
  );
}

export default App;
