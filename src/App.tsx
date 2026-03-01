import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-background-secondary -z-10" />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
