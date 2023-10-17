import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username,
//         password,
//       });
//       console.log(response.data); // Assuming the response contains user data or a success message
//       // Handle successful login or redirect to profile page
//     } catch (error) {
//       console.error(error); // Handle error
//     }
//   };

axios({
  method: "POST",
  data: {
    username: loginUsername,
    password: loginPassword,
  },
  withCredentials: true,
  url: "http://localhost:3000/login",
}).then((res) => {
    console.log(res);
}).catch((error) => {
    console.error("Error making the request:", error);
});;

  return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };


<div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={Login}>Submit</button>
      </div>
  )
  
  }
export default Login;
