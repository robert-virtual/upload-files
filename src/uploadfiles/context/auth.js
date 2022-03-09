import { createContext } from "react";
import { useStorage } from "../hooks/useStorage";

const AuthContext = createContext({
  atoken: "",
  rtoken: "",
  setatoken: () => {},
  setrtoken: () => {},
});
export function AuthProvider({ children }) {
  const { atoken, setatoken } = useStorage(null, "atoken");
  const { rtoken, setrtoken } = useStorage(null, "rToken");

  return (
    <AuthContext.Provider value={{ atoken, rtoken, setatoken, setrtoken }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
