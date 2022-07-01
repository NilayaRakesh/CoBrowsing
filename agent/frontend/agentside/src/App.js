import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePageContainerView from "./components/HomePageContainerView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageContainerView />} />
      </Routes>
    </Router>
  );
}

export default App;
