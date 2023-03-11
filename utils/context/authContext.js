// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createUser, getSingleUser, updateUser } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const verifyUser = (fbUser) => {
    const { uid, displayName, email } = fbUser;
    const payload = { uid, displayName, email };
    createUser(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateUser(patchPayload).then(() => {
        getSingleUser(fbUser.uid).then(() => {
          setUser(fbUser);
        });
      });
    });
  };
  // This Function tests if a User has logged in previously

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        await getSingleUser(fbUser.uid).then(async (response) => {
          if (Object.keys(response).length === 0) {
            verifyUser(fbUser);
          } else {
            setUser(fbUser);
          }
        });
      } else {
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
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
