import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";

const PageLogin = () => {
  const { currentUser, setCurrentUser, currentUserIsInGroup } =
    useContext(AppContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginFormMessage, setLoginFormMessage] = useState("");

  const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);

  const loadNotYetApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3003/notyetapprovedusers",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setNotYetApprovedUsers((prev) => [...data.users]);
    }
  };

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(
        "http://localhost:3003/currentuser",
        requestOptions
      );
      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
      loadNotYetApprovedUsers();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e) => {
    const _login = e.target.value;
    setLogin(_login);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  // const handleLoginButton = (e) => {
  //   e.preventDefault();
  //   console.log("login on backend");
  // };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };
    const response = await fetch("http://localhost:3003/login", requestOptions);
    if (!response.ok) {
      setLogin("");
      setPassword("");
      setLoginFormMessage("Bad Login");
    } else {
      const _currentUser = await response.json();
      // console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  const handle_approveUserButton = async (id) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      "http://localhost:3003/approveuser",
      requestOptions
    );
    if (response.ok) {
      await response.json();
      loadNotYetApprovedUsers();
    }
  };

  const handleLogoutButton = async (e) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      "http://localhost:3003/logout",
      requestOptions
    );
    if (response.ok) {
      setLogin("");
      setPassword("");
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  return (
    <div>
      {currentUser.login && (
        <>
          <h1>FINAL MERN Showcase App</h1>

          {currentUserIsInGroup("loggedOutUsers") && (
            <>
              <form>
                <fieldset>
                  <legend>Login</legend>
                  <div className="loginFormMessage">{loginFormMessage}</div>
                  <div className="row">
                    <label htmlFor="login">Name</label>
                    <input
                      type="text"
                      id="login"
                      value={login}
                      onChange={handleLogin}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={handlePassword}
                      value={password}
                    />
                  </div>
                  <div className="buttonRow">
                    <button onClick={handleLoginButton}>Login</button>
                  </div>
                </fieldset>
              </form>
            </>
          )}

          {currentUserIsInGroup("loggedInUsers") && (
            <div>
              <button onClick={handleLogoutButton}>Logout</button>
            </div>
          )}
          {currentUserIsInGroup("loggedOutUsers") && (
            <div className="panel">Welcome to this site.</div>
          )}
          {currentUserIsInGroup("notApprovedUsers") && (
            <>
              <div className="panel">
                <h3>Thank you for registering!</h3>
                An administrator will approve your account as soon as possible.
              </div>
            </>
          )}
          {currentUserIsInGroup("members") && (
            <>
              <div className="panel">
                <h3>Current Site News for Members</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Neque explicabo voluptate quia asperiores sit! Vel molestiae
                  labore ratione non dolores? Exercitationem soluta quo id
                  laboriosam, autem perferendis? Fuga, suscipit ipsa.
                </p>
              </div>
            </>
          )}
          {currentUserIsInGroup("contentEditors") && (
            <>
              <div className="panel">
                <h3>Content Editor Section:</h3>
                <div>
                  <button>Edit Welcome Page</button>
                </div>
                <div>
                  <button>Create New Page</button>
                </div>
              </div>
            </>
          )}

          {currentUserIsInGroup("admins") && (
            <>
              <div className="panel">
                <h3>Admin Section:</h3>
                <h4>{notYetApprovedUsers.length} Users to Approve:</h4>
                <table className="minimalistBlack">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {notYetApprovedUsers.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>
                            <button
                              onClick={() => handle_approveUserButton(user._id)}
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PageLogin;
