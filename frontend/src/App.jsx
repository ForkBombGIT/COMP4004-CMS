import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import AppRouter from "./AppRouter";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer
        className="z-30"
        transition={Slide}
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
