import { createContext } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;