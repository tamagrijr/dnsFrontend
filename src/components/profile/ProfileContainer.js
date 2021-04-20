import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAsyncEffect from "use-async-effect";

import Profile from "./Profile";
import {
  userInfo,
  updateAccount,
  deleteAccount,
} from "../../store/loginInformaiton";

export default function ProfileContainer() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);

  const deleteAccountProp = (token) => {
    dispatch(deleteAccount(token));
  };
  const updateAccountProp = (token, userInfo) => {
    dispatch(updateAccount(token, userInfo));
  };
  useAsyncEffect(() => {
    dispatch(userInfo(token));
  }, []);

  const user = useSelector((state) => state.user.user);
  const props = { ...user, token, updateAccountProp, deleteAccountProp };

  if (!props.email) return null;
  return (
    <>
      <Profile props={props} />
    </>
  );
}
