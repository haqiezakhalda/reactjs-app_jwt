import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EditData from "./components/EditData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-data" element={<EditData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
