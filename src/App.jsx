import Home from './Components/Home/Home'
import "./Components/Home/Home.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MealDetails from './Components/MealDetails';
import LeftMenu from './Components/LeftMenu';

function App() {

  return (
    <>
      <Router>
        <LeftMenu />
        <Routes>
          <Route path="/mealdetails/:mealID" element={<MealDetails></MealDetails>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
