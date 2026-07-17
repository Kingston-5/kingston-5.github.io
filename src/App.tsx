import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home, Login, Register, NotFound, SignOut } from "@/pages";
import MainLayout from "@/layouts/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <main>
          <Routes>
            <Route
              path="/logout"
              element={
                <MainLayout>
                  {" "}
                  <SignOut />{" "}
                </MainLayout>
              }
            />
            <Route
              path="/"
              element={
                <MainLayout>
                  {" "}
                  <Home />{" "}
                </MainLayout>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
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
