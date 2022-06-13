import { createContext, useContext } from 'react';

const AppContext = createContext();

export function ContextProvider({ children }) {
  let sharedState = {
      clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
      stateKey: process.env.NEXT_PUBLIC_STATE_KEY,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      scope: process.env.NEXT_PUBLIC_SCOPE
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}