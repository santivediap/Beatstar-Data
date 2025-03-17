import React from "react";
import { useSearchParams, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home"

const Main = () => {
  return <main>
    <Routes>
      <Route element={ <Home /> } path="/" />
    </Routes>
  </main>;
};

export default Main;
