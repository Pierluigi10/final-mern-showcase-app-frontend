import { useContext, useEffect } from "react";
import "./App.scss";
import AppContext from "./AppContext";

import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import PageWelcome from "./pages/PageWelcome";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";

function App() {
  const { setCurrentUser,backendUrl } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(
      `${backendUrl}/currentuser`,
        requestOptions
      );
      if (response.ok) {
        const user = await response.json();
        // console.log(user);
        setCurrentUser((prev) => ({ ...prev, ...user }));
      } else {
        console.log(response);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Nav />
      <div className="content">
        <Routes>
          <Route path="/" element={<PageWelcome />} />
          <Route path="register" element={<PageRegister />} />
          <Route path="login" element={<PageLogin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
