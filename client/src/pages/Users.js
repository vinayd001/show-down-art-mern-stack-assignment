import { useEffect, useState } from "react";

const Users = () => {
  const [userList, setUserList] = useState([]);

  const table = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const th = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };

  const td = th;

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setUserList(res.data.users);
        }
      })
      .catch(() => {
        console.log("Error fetching users");
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <br />
      {userList.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th style={th}>Email</th>
              <th style={th}>Fullname</th>
              <th style={th}>Username</th>
            </tr>
            {userList.map((user) => (
              <tr key={user._id}>
                <td style={td}>{user?.email}</td>
                <td style={th}>{user?.fullname}</td>
                <td style={th}>{user?.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found</div>
      )}
      {/* {userList.length > 0 ? (
        userList.map((user, index) => (
          <div key={user._id}>
            <div>Full Name: {user?.fullname}</div>{" "}
            <div>Username: {user?.username}</div>{" "}
            <div>Email Id: {user?.email}</div> <br />
          </div>
        ))
      ) : (
        <div>No users found</div>
      )} */}
    </div>
  );
};

export default Users;
