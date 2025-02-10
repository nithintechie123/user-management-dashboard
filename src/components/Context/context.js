import { createContext } from "react";

const UserContext = createContext(
    {
      theme: false,
      toggleTheme: () => {

      },
      modelIsOpen: false,

    }
  
);

export const UserProvider = UserContext.Provider;

export default UserContext;
