import React from "react";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import DetailAnime from "./pages/DetailAnime";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div className=" min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<DetailAnime />} />
      </Routes>
    </div>
  );
};

export default App;
