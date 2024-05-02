import React, { useEffect, useState, Fragment } from "react";
import styles from "./passwordUpdate.module.css";
import { IoIosEyeOff } from "react-icons/io";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { IoIosEye } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { MdVpnKey } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  updateClearErrors,
  updatePassword,
} from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../labels/MetaData";
import { ButtonSpinner } from "../../basics/Spinner";
import { updatePasswordReset } from "../../redux/reducers/profileReducer";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(updateClearErrors());
    }

    if (isUpdated) {
      alert.success("Password update successfully");

      navigate("/");
      dispatch(updatePasswordReset());
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      <MetaData title="Update Password" />
      <div className={styles["updatePassword-container"]}>
        <div className={styles["updatePassword-box"]}>
          <div className={styles["updatePassword-heading"]}>
            Update Password
          </div>
          <form
            className={styles["updatePassword-form"]}
            onSubmit={handleUpdatePasswordSubmit}
          >
            <div className={styles["update-password"]}>
              <MdVpnKey />
              <input
                type={visible1 ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Old Password"
              />
              <div
                className={styles["update-password-eye"]}
                onClick={() => {
                  setVisible1(!visible1);
                }}
              >
                {visible1 ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <div className={styles["update-password"]}>
              <LockOpenIcon />
              <input
                type={visible2 ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <div
                className={styles["update-password-eye"]}
                onClick={() => {
                  setVisible2(!visible2);
                }}
              >
                {visible2 ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <div className={styles["update-password"]}>
              <RiLockPasswordFill />
              <input
                type={visible3 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <div
                className={styles["update-password-eye"]}
                onClick={() => {
                  setVisible3(!visible3);
                }}
              >
                {visible3 ? <IoIosEye /> : <IoIosEyeOff />}
              </div>
            </div>
            <Link to="/password/forget">Forget Password ?</Link>
            <button
              type="submit"
              className={styles["submit-btn-updatePassword"]}
            >
              {loading ? (
                <ButtonSpinner border={"#1515eb"} borderTop={"red"} />
              ) : (
                "Confirm"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordUpdate;
