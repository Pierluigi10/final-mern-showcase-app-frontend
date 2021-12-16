import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";

const PageAdmin = () => {
  const { backendUrl } = useContext(AppContext);
  const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      loadNotYetApprovedUsers();
      loadApprovedUsers();
    })();
  }, []);

  const handle_approveUserButton = async (id) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(`${backendUrl}/approveuser`, requestOptions);
    if (response.ok) {
      await response.json();
      loadNotYetApprovedUsers();
    
    }
  };

  const loadNotYetApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/notyetapprovedusers`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setNotYetApprovedUsers((prev) => [...data.users]);
    }
  };

  const loadApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setApprovedUsers(data);
    }
  };

  return (
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
                  <button onClick={() => handle_approveUserButton(user._id)}>
                    Approve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>{approvedUsers.length} Users:</h4>
      <table className="minimalistBlack">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            
          </tr>
        </thead>
        <tbody>
          {approvedUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PageAdmin;
