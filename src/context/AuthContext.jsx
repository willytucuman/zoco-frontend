import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
