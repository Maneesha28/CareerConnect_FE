import React, { createContext, useContext, useState } from 'react';

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const [fetch, setFetch] = useState(true); // Initial value

  return (
    <FetchContext.Provider value={{ fetch, setFetch }}>
      {children}
    </FetchContext.Provider>
  );
}

export function useFetch() {
  return useContext(FetchContext);
}
