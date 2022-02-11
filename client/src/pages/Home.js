import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [idLen, setIdLen] = useState(1);

  const [userList, setUserList] = useState([
    { id: 1, fullname: "", username: "", email: "" },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newUserList = [...userList];
    newUserList[index][name] = value;
    setUserList(newUserList);
  };

  const addMoreUsers = () => {
    setUserList([
      ...userList,
      { id: idLen + 1, fullname: "", username: "", email: "" },
    ]);
    setIdLen(idLen + 1);
  };

  const removeUser = (index) => {
    const newUserList = [...userList];
    newUserList.splice(index, 1);
    setUserList(newUserList);
  };

  async function submitUsers(event) {
    event.preventDefault();

    const response = await fetch("/addUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        userList.map((user) => ({
          fullname: user.fullname,
          username: user.username,
          email: user.email,
        }))
      ),
    });

    const data = await response.json();
    if (data.status == "success") {
      navigate("/users");
    } else {
      alert("error");
    }
  }

  return (
    <div>
      <h1>Add Users</h1>
      <form onSubmit={submitUsers}>
        {userList.map((user, index) => (
          <div key={user.id}>
            <input
              id="fullname"
              name="fullname"
              // value={user.fullname}
              onChange={(e) => handleChange(e, index)}
              type="text"
              placeholder="Full Name"
              required
            />{" "}
            <input
              id="username"
              name="username"
              // value={user.username}
              onChange={(e) => handleChange(e, index)}
              type="text"
              placeholder="Username"
              required
            />{" "}
            <input
              id="email"
              name="email"
              // value={user.email}
              onChange={(e) => handleChange(e, index)}
              type="email"
              placeholder="Email"
              required
            />{" "}
            {userList.length > 1 ? (
              <button onClick={() => removeUser(index)}>Remove</button>
            ) : null}
            <br />
          </div>
        ))}
        <button onClick={addMoreUsers}>Add More</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
