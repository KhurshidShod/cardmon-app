import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./pages/login";
import { ToastContainer } from "react-bootstrap";
import HomePage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route index path="/home" element={<HomePage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
