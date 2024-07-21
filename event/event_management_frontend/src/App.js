import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventListAttendee from "./components/EventListAttendee";
import Register from "./components/Register";
import Logging from "./components/Logging";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addEvent" element={<EventForm/>}/>
        <Route path="/viewEvent" element={<EventList/>}/>
        <Route path="/Register/:eventid" element={<Register/>}/>
        <Route path="/EventListAttendee" element={<EventListAttendee/>}/>
        <Route path="/logging" element={<Logging/>}/>
      </Routes>
    </Router>
  );
}

export default App;
