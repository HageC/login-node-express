import React, { useContext, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, isLoading] = useState(true);

  const handle_login_register = async (login, formValues) => {
    const { name, email, password } = formValues;
    const values = login ? { email, password } : { name, email, password };
    try {
      const response = await axios.post(
        `/api/user/${login ? "login" : "register"}`,
        values
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ handle_login_register }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
