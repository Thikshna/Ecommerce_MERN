import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState("");
  const handleLogin = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  return (
    <div>
      <input name="email" onChange={handleLogin} />
      <input name="password" onChange={handleLogin} />
      <button
        onClick={() => {
          fetch("http://localhost:3001/api/user/login", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("result", result);
            });
        }}
      > login
      </button>
    </div>
  );
}

export default Login;
