import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { ImEyeBlocked, ImEye } from "react-icons/im";

const PageRegister = () => {
  const { setCurrentUser, currentUserIsInGroup, backendUrl } =
    useContext(AppContext);

  const [signupFormField_login, setSignupFormField_login] = useState("");
  const [signupFormField_password1, setSignupFormField_password1] =
    useState("");
  const [signupFormField_password2, setSignupFormField_password2] =
    useState("");
  const [signupFormField_firstName, setSignupFormField_firstName] =
    useState("");
  const [signupFormField_lastName, setSignupFormField_lastName] = useState("");
  const [signupFormField_email, setSignupFormField_email] = useState("");
  const [passwordsInputType1, setPasswordsInputType1] = useState("password");
  const [passwordsInputType2, setPasswordsInputType2] = useState("password");

  // SIGNUP FORM FIELD HANDLERS
  const handle_signupFormField_login = (e) => {
    let login = e.target.value;
    setSignupFormField_login(login);
  };
  const handle_signupFormField_password1 = (e) => {
    let password1 = e.target.value;
    setSignupFormField_password1(password1);
  };

  const handleShowPasswordButton1 = () => {
    setPasswordsInputType1(
      passwordsInputType1 === "password" ? "text" : "password"
    );
  };
  const handle_signupFormField_password2 = (e) => {
    let password2 = e.target.value;
    setSignupFormField_password2(password2);
  };

  const handleShowPasswordButton2 = () => {
    setPasswordsInputType2(
      passwordsInputType2 === "password" ? "text" : "password"
    );
  };
  const handle_signupFormField_firstName = (e) => {
    let firstName = e.target.value;
    setSignupFormField_firstName(firstName);
  };
  const handle_signupFormField_lastName = (e) => {
    let lastName = e.target.value;
    setSignupFormField_lastName(lastName);
  };
  const handle_signupFormField_email = (e) => {
    let email = e.target.value;
    setSignupFormField_email(email);
  };

  const handle_signupForm_signupButton = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: signupFormField_login,
          password1: signupFormField_password1,
          password2: signupFormField_password2,
          firstName: signupFormField_firstName,
          lastName: signupFormField_lastName,
          email: signupFormField_email,
        },
      }),
    };
    const response = await fetch(`${backendUrl}/signup`, requestOptions);
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setSignupFormField_login("");
      setSignupFormField_password1("");
      setSignupFormField_password2("");
      setSignupFormField_firstName("");
      setSignupFormField_lastName("");
      setSignupFormField_email("");
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      {currentUserIsInGroup("loggedOutUsers") && (
        <>
          <form>
            <fieldset>
              <legend>Signup</legend>
              <div className="row">
                <label htmlFor="signupFormField_login">Login</label>
                <input
                  type="text"
                  id="signupFormField_login"
                  value={signupFormField_login}
                  onChange={handle_signupFormField_login}
                />
              </div>
              <div className="row">
                <label htmlFor="signupFormField_password1">Password 1</label>
                <input
                  type={passwordsInputType1}
                  id="signupFormField_password1"
                  value={signupFormField_password1}
                  onChange={handle_signupFormField_password1}
                />
                <span className="eyes-icon" onClick={handleShowPasswordButton1}>
                  {passwordsInputType1 === "password" ? (
                    <ImEye />
                  ) : (
                    <ImEyeBlocked />
                  )}
                </span>
              </div>
              <div className="row">
                <label htmlFor="signupFormField_password2">Password 1</label>
                <input
                  type={passwordsInputType2}
                  id="signupFormField_password2"
                  value={signupFormField_password2}
                  onChange={handle_signupFormField_password2}
                />
                <span className="eyes-icon" onClick={handleShowPasswordButton2}>
                  {passwordsInputType2 === "password" ? (
                    <ImEye />
                  ) : (
                    <ImEyeBlocked />
                  )}
                </span>
              </div>
              <div className="row">
                <label htmlFor="signupFormField_firstName">First Name</label>
                <input
                  type="text"
                  id="signupFormField_firstName"
                  value={signupFormField_firstName}
                  onChange={handle_signupFormField_firstName}
                />
              </div>
              <div className="row">
                <label htmlFor="signupFormField_lastName">Last Name</label>
                <input
                  type="text"
                  id="signupFormField_lastName"
                  value={signupFormField_lastName}
                  onChange={handle_signupFormField_lastName}
                />
              </div>
              <div className="row">
                <label htmlFor="signupFormField_email">E-Mail</label>
                <input
                  type="text"
                  id="signupFormField_email"
                  value={signupFormField_email}
                  onChange={handle_signupFormField_email}
                />
              </div>
              <div className="buttonRow">
                <button onClick={handle_signupForm_signupButton}>Submit</button>
              </div>
            </fieldset>
          </form>
        </>
      )}
    </div>
  );
};

export default PageRegister;
