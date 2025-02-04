import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import LeftMenu from './Components/LeftMenu';
import MealDetails from './Components/MealDetails';

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
