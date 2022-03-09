import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";
import useForm from "../hooks/useForm";

function Login() {
  const { rToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (rToken) {
      navigate("/");
    }
  }, [navigate, rToken]);

  const [values, setValues] = useForm({ email: "", password: "" });
  async function sendData() {
    console.log("rToken:", rToken);
    const res = await fetch(
      `${process.env.REACT_APP_AUTH_SERVER_LOCAL}/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      }
    );
    console.log(res);
    const data = await res.json();
    const { token, refreshToken } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    console.log("rToken:", rToken);
    console.log("res:", data);
  }
  return (
    <div className="contenedor">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h2>Login</h2>
        <h2>
          <Link to="/account">Crear Cuenta</Link>
        </h2>
      </div>
      <input
        type="text"
        name="email"
        placeholder="email"
        value={values.email}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={values.password}
        onChange={setValues}
      />
      <button onClick={sendData}>Iniciar session</button>
      <div></div>
    </div>
  );
}
export default Login;
