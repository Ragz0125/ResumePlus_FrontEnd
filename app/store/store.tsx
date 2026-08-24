"use client";
import { Grid } from "@mui/material";
import { createContext, useEffect, useState } from "react";

let initialContext = {
  loginModal: true,
};

export const AppContext = createContext(null);

const AppStore = ({ children }: any) => {
  const [token, setToken] = useState<any>(undefined);
  const [state, setState] = useState<any>({
    loginModal: false,
    openModal: true,
  });
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    setState({ ...state, isLoggedIn: token ? true : false });
  }, [token]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppStore;
