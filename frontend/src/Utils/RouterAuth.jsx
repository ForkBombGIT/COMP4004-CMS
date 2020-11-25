import React, { useEffect, useContext, createContext, useState } from "react";
import { Client } from "Server/";
import { Route, Redirect } from "react-router-dom";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return Client.authenticate({
      strategy: "local",
      email,
      password,
    })
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((e) => {
        console.error(`Couldn't be logged in ${e}`);
        return null;
      });
  };

  const reAuthenticate = () => {
    return Client.reAuthenticate()
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((e) => {
        console.error(`Couldn't be re-authenticated ${e}`);
        return null;
      });
  };

  const signout = () => {
    return Client.logout()
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((e) => {
        console.error(`Couldn't be logged out ${e}`);
        return null;
      });
  };

  useEffect(() => {
    reAuthenticate();
  }, []);

  return {
    user,
    signin,
    reAuthenticate,
    signout,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  const [authenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    auth
      .reAuthenticate()
      .then(() => {
        setAuthenticating(false);
      })
      .catch(() => {
        setAuthenticating(false);
      });
  }, []);
  return (
    !authenticating && (
      <Route
        {...rest}
        render={
          ({ location }) =>
            auth.user &&
            location.pathname.split("/")[1] === auth.user.user_role ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              />
            )
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
    )
  );
};
