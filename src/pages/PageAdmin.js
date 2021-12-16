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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handle_deleteUserButton = async (id) => {
    const response = await fetch(`${backendUrl}/deleteuser`, {
      method: "delete",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      loadNotYetApprovedUsers();
      loadApprovedUsers();
    }
  };

  const loadNotYetApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${backendUrl}/notyetapprovedusers`,
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
      `${backendUrl}/users`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setApprovedUsers(data);
    }
  };

  return (
    <div className="panel">
      <h2>Admin Section</h2>
      <h4>Users to Approve: {notYetApprovedUsers.length} </h4>
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

                  <button onClick={() => handle_deleteUserButton(user._id)}>
                    Delete users
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Users: {approvedUsers.length} </h4>
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
                <td>
                  <button onClick={() => handle_deleteUserButton(user._id)}>
                    Delete users
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PageAdmin;
