import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useForm({
    name: "",
    password: "",
    password2: "",
    email: "",
  });
  const [dragging, setDragging] = useState(false);
  const [profile, setProfile] = useState();
  function logFiles(file) {
    setProfile(file);
  }
  async function UploadPicture() {
    console.log("antes de enviar:", values);

    const form = new FormData();
    if (profile) {
      form.append("image", profile, profile.name);
    }
    form.append("name", values.name);
    form.append("email", values.email);
    form.append("password", values.password);

    const res = await fetch(`${process.env.REACT_APP_API_LOCAL}/users`, {
      body: form,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status === 200) {
      navigate("login");
    }
    const data = await res.json();

    console.log("res: ", data);
  }
  return (
    <div className="contenedor">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h2>Crear Cuenta</h2>
        <h2>
          <Link to="login">Login</Link>
        </h2>
      </div>
      <div>
        <div className="user">
          {!profile ? (
            <section
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                logFiles(e.dataTransfer.files[0]);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragging(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              className={"drop-zone " + (dragging && "dragging")}
            >
              Arraste su foto de perfil
            </section>
          ) : (
            <img width={200} src={URL.createObjectURL(profile)} alt="" />
          )}
          <div>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={values.name}
              onChange={setValues}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              value={values.email}
              onChange={setValues}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={setValues}
            />
            <input
              type="password"
              placeholder="confirm password"
              name="password2"
              value={values.password2}
              onChange={setValues}
            />
            <button onClick={UploadPicture}>Crear Cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
