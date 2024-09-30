import React, { createContext, useState } from "react";

export const AppContext = createContext({
  type: null,
  setType: (value: any) => {},
});

const AppContextProvider: React.FC<any> = ({ children }: any) => {
  const [type, setType] = useState(null);

  return (
    <AppContext.Provider value={{ type, setType }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
