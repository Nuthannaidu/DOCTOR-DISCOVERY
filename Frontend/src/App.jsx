import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorListing from "./pages/DoctorListing";
import DoctorDetail from "./pages/DoctorDetail";
import DoctorRegistration from "./pages/DoctorRegistration";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={<DoctorRegistration />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/doctors" element={<DoctorListing />} />
      
      </Routes>
    </Router>
  );
}

export default App;
