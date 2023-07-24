import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
