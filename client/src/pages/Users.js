import { useEffect, useState } from "react";

const Users = () => {
  const [userList, setUserList] = useState([]);

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
        userList.map((user, index) => (
          <div key={user._id}>
            <div>Full Name: {user?.fullname}</div>{" "}
            <div>Username: {user?.username}</div>{" "}
            <div>Email Id: {user?.email}</div> <br />
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default Users;
