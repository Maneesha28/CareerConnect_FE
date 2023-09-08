import React, { createContext, useContext, useState } from 'react';

const FetchListContext = createContext();

export function FetchProvider({ children }) {
  const [fetch, setFetch] = useState(true); // Initial value

  return (
    <FetchListContext.Provider value={{ fetch, setFetch }}>
      {children}
    </FetchListContext.Provider>
  );
}

export function useFetch() {
  return useContext(FetchListContext);
}
