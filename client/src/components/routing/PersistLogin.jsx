import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  selectPersist,
  setCredentialsThunk,
} from "../../redux/slices/authSlice";
import { useRefreshTokenMutation } from "../../redux/api/refreshApiSlice";
import { Loader } from "../";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken] = useRefreshTokenMutation();
  const token = useSelector(selectCurrentToken);
  const persist = useSelector(selectPersist);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken()
          .unwrap()
          .then(async (response) => {
            await dispatch(
              setCredentialsThunk({
                token: response.accessToken,
                user: response.user,
                persist: localStorage.getItem("persist") || false,
              })
            ).unwrap();
          });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      const timerId = setTimeout(verifyRefreshToken, 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
