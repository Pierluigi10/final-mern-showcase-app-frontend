import { useContext, useEffect } from "react";
import "./App.scss";
import AppContext from "./AppContext";

import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import PageWelcome from "./pages/PageWelcome";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import PageLogout from "./pages/PageLogout";
import PageAdmin from "./pages/PageAdmin";

function App() {
  const { currentUser, setCurrentUser, currentUserIsInGroup, backendUrl } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(`${backendUrl}/currentuser`, requestOptions);
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
      {currentUser.login && (
        <>
          <h1>MERN Showcase App</h1>
          {currentUserIsInGroup("loggedInUsers") && (
            <h2>
              {currentUser.firstName} {currentUser.lastName}
            </h2>
          )}
          <Nav />

          <div className="content">
            <Routes>
              <Route path="/" element={<PageWelcome />} />
              {currentUserIsInGroup("loggedOutUsers") && (
                <Route path="register" element={<PageRegister />} />
              )}
              {currentUserIsInGroup("loggedOutUsers") && (
                <Route path="login" element={<PageLogin />} />
              )}
              {currentUserIsInGroup("admins") && (
                <Route path="admin" element={<PageAdmin />} />
              )}
              {currentUserIsInGroup("loggedInUsers") && (
                <Route path="logout" element={<PageLogout />} />
              )}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
