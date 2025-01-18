import "./App.css";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
// import Browse from "./pages/Browse";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import notAvailable from "./assets/not-available.jpg";

// import { Outlet } from "react-router-dom";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1300) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener to handle screen resizing
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <Provider store={appStore}>
      {isMobile ? (
        <div className="flex justify-center text-center mt-44 text-4xl font-bold text-slate-400">
          <div className="">
            <div className="flex justify-center">
              <img src={notAvailable} className="h-56" />
            </div>
            <div>App not available on Phones or Tablets.</div>
            <div>Open in Laptop or Desktop</div>
          </div>
        </div>
      ) : (
        <div className="">
          <div>
            <Header />
          </div>
          <div>
            <Outlet />
            {/* <Browse /> */}
          </div>
        </div>
      )}
    </Provider>
  );
}

export default App;
