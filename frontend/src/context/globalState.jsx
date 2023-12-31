import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const handle_login_register = async (login, formValues, setFormValues) => {
    const { name, email, password } = formValues;
    const values = login ? { email, password } : { name, email, password };

    setLoginLoading(true);

    try {
      const response = await axios.post(
        `/api/user/${login ? "login" : "register"}`,
        values
      );
      setUser(response.data);
    } catch (error) {
      setFormValues({ ...formValues, password: "" });
      console.log(error);
    }
    setLoginLoading(false);
  };

  const checkUser = async () => {
    try {
      const response = await axios.get("/api/user/checkUser");
      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.log(error.response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <AppContext.Provider
      value={{ handle_login_register, user, loading, loginLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
