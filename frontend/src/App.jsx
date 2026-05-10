import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import ActivityManager from "./pages/ActivityManager";
import BudgetDashboard from "./pages/BudgetDashboard";
import PublicTrip from "./pages/PublicTrip";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
        <Route path="/activities" element={<ActivityManager />} />
        <Route path="/budget" element={<BudgetDashboard />} />
        <Route path="/public/:shareToken" element={<PublicTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;