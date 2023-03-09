/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar/NavBar';
import { createUser, getSingleUser, updateUser } from '../api/userData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const {
    setUser, uid, user, userLoading, displayName, email,
  } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  if (user === 'NO USER') {
    const payload = { uid, displayName, email };
    createUser(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateUser(patchPayload).then(() => {
        getSingleUser(uid).then(setUser);
      });
    });
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
