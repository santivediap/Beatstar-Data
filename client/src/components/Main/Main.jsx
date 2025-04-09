import React from "react";
import { useSearchParams, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home"
import Songs from "./Songs";

const Main = () => {
  return <main>
    <Routes>
      <Route element={ <Home /> } path="/" />
      <Route element={ <Songs /> } path="/song-search" />
    </Routes>
  </main>;
};

export default Main;
