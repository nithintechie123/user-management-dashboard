import { createContext } from "react";

const UserContext = createContext(
    {
      theme: false,
      toggleTheme: () => {
        
      },

    }
  
);

export const UserProvider = UserContext.Provider;

export default UserContext;
