import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";
import { ImEyeBlocked, ImEye } from "react-icons/im";

const PageLogin = () => {
  const { setCurrentUser, backendUrl } = useContext(AppContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginFormMessage, setLoginFormMessage] = useState("");
  const [passwordsInputType, setPasswordsInputType] = useState("password");

  const navigate = useNavigate();

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
    const response = await fetch(`${backendUrl}/login`, requestOptions);
    if (!response.ok) {
      setLogin("");
      setPassword("");
      setLoginFormMessage("Bad Login");
    } else {
      const _currentUser = await response.json();
      // console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      navigate("/");
    }
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === "password" ? "text" : "password"
    );
  };

  return (
    <div>
      <h2>Login Page</h2>

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
              type={passwordsInputType}
              id="password"
              value={password}
              onChange={handlePassword}
            />
            <span className="eyes-icon" onClick={handleShowPasswordButton}>
              {passwordsInputType === "password" ? <ImEye /> : <ImEyeBlocked />}
            </span>
          </div>
          <div className="buttonRow">
            <button onClick={handleLoginButton}>Login</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PageLogin;
