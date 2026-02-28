import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-background-secondary -z-10" />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
