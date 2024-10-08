import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import EditNote from "./components/EditNote";
import CreateNote from "./components/CreateNote";
import Header from "./pages/Header";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar/>
              <Header />
              <Home />
              
             
            </ProtectedRoute>
          }
        />
        <Route path="/api/notes" element={<CreateNote />} />
        <Route path="/api/notes/edit/:id" element={<EditNote />} />

        <Route path="/login" element={<Login />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
