import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "./uploadfiles/context/auth";
function App() {
  const { rToken, setRToken } = useContext(AuthContext);
  function cerrarSession() {
    setRToken(null);
  }
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <nav>
        <span className="text-5xl">Users App</span>
        <ul>
          <Link to="/products">Products</Link>
          {rToken ? (
            <button onClick={cerrarSession}>Cerrar Session</button>
          ) : (
            <button>
              <Link to="/account">Iniciar Session</Link>
            </button>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
