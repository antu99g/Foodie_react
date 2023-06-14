import { Routes, Route } from "react-router-dom";
import { Home, List, Dish } from "../pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Basic error page for 404 status
  const Page404 = () => {
    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: 200 }}>404</h1>
        <h1 style={{ textAlign: "center" }}>Page not found</h1>
      </>
    );
  };

  return (
    <div>
      {/* Initializaation for notifications  */}
      <ToastContainer
        autoClose={2000}
        newestOnTop={false}
        closeOnClick={true}
        theme="colored"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        position={"top-center"}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<List page="favorites" />} />
        <Route path="/area/:area" element={<List page="area" />} />
        <Route path="/category/:category" element={<List page="category" />} />
        <Route path="/dish/:id" element={<Dish />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
