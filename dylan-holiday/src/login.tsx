import axios from "axios";
import { FormEvent, useState } from "react";

function ApiRequester() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResponseText("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/Login", {
        username: username,
        password: password,
      });
      setResponseText(JSON.stringify(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseText(error.message);
      } else {
        setResponseText(String(error));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Send Request</button>
      </form>

      {responseText && <p>Response: {responseText}</p>}
    </>
  );
}

export default ApiRequester;