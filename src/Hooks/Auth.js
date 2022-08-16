import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const AuthContext = createContext();

/* 
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userScope, setUserScope] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
        setUserToken(null);
        setUserEmail(null);
        setUserScope(null);
        return;
    }
    if (userData.token) {
        setUserToken(userData.token);
    }
    if (userData.email) {
        setUserEmail(userData.email);
    }
    if (userData.scope) {
        setUserScope(userData.scope);
    }
  }, [isAuthLoading]);

  const navigate = useNavigate();

  // call this function when you want to register the user
  const register = async (email, password) => {
    setIsAuthLoading(true);
    const registerResult = await registerUser(email, password);
    setIsAuthLoading(false);
    return registerResult;
  };

  // call this function when you want to authenticate the user
  const login = async (email, password, redirectLocation = "/") => {
    setIsAuthLoading(true);
    const loginResult = await loginUser(email, password);
    if (loginResult.success) {
      setUserData(loginResult.token, loginResult.scope, loginResult.email);
      navigate(redirectLocation, { replace: true });
    }
    setIsAuthLoading(false);
    return loginResult;
  };

  // call this function to sign out logged in user
  const logout = async (redirectLocation = "/") => {
    setIsAuthLoading(true);
    await removeUserData(); // This has to be awaited for the useEffect to work
    setIsAuthLoading(false);
    navigate(redirectLocation, { replace: true });
  };

  const verifyAdmin = async () => {
    if (!userToken) {
        return false;
    }
    setIsAuthLoading(true);
    const isAdminResult = await validateAdmin(userToken);
    setIsAuthLoading(false);
    if (isAdminResult.success) {
        if (isAdminResult.isAdmin) {
            setUserScope("admin");
        }
      return isAdminResult.isAdmin;
    }
    return false;
  };

  /*  
    https://reactjs.org/docs/hooks-reference.html#usememo
    Memoization is essentially caching. The variable value will only be recalculated if the 
    variables in the watched array change.
  */

  /* const value = {
    user,
    verifyAdmin,
    login,
    logout,
    register,
  }; 
  
  JN: Same result as doing the useMemo. But with useMemo, we save some memory in react.
  */

  const value = useMemo(
    () => ({
      user: userToken,
      email: userEmail,
      scope: userScope,
      verifyAdmin,
      login,
      logout,
      register,
    }),
    [userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const registerUser = async (email, password) => {
  const url = `${urlEndpoint}/auth/registration`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const loginUser = async (email, password) => {
  const url = `${urlEndpoint}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const validateAdmin = async (userToken) => {
  const url = `${urlEndpoint}/auth/validate-admin`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      [process.env.REACT_APP_TOKEN_HEADER_KEY]: userToken,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const setUserData = (token, scope, email) => {
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, scope, email})
  );
};

const removeUserData = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getUserData = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
