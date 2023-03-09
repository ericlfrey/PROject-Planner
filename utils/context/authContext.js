// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getSingleUser } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        setUid(fbUser.uid);
        setDisplayName(fbUser.displayName);
        setEmail(fbUser.email);
        await getSingleUser(fbUser.uid).then(async (response) => {
          if (Object.keys(response).length === 0) {
            setUser('NO USER');
          } else {
            setUser(fbUser);
          }
        });
      } else {
        setUser(false);
      }
    });
  }, []);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      uid,
      displayName,
      email,
      setUser,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [displayName, email, uid, user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
