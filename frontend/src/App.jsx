import Header from "./components/Header";
import Login from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  Navigate,
} from "react-router-dom";
import { useGlobalContext } from "./context/globalState";

function App() {
  const { loading } = useGlobalContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/dashboard" element={<h1>Hi</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
