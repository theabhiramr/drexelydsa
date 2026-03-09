import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* Background stays fixed and behind everything */}
      <div className="fixed top-0 left-0 w-full h-screen bg-background-secondary -z-10" />

      <div className="flex flex-col gap-20">
        {" "}
        {/* Added flex, flex-col, and a larger gap */}
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
