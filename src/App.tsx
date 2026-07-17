import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home, Login, Register, NotFound, SignOut } from "@/pages";
import MainLayout from "@/layouts/MainLayout";
import {Helmet} from "react-helmet";


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <main>
          <Routes>
            <Route
              path="/"
              element={
                  <Home />
              }
            />
            <Route
              path="*"
              element={
                  <NotFound />
              }
            />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
