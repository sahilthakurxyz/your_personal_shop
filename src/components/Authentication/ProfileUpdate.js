import React, { Fragment, useState, useEffect } from "react";
import styles from "./profileUpdate.module.css";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Person2Icon from "@mui/icons-material/Person2";
import {
  loadUser,
  updateClearErrors,
  updateProfile,
} from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { updateProfileReset } from "../../redux/reducers/profileReducer";
import { ButtonSpinner } from "../../basics/Spinner";
import MetaData from "../labels/MetaData";

const ProfileUpdate = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/userProfile.png");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(e.target.files[0]);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (user && user.avatar && user.avatar.url) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(updateClearErrors());
    }

    if (isUpdated) {
      alert.success("Profile update successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);
  return (
    <Fragment>
      <MetaData title="Upadate Profile" />

      <div className={styles["updateProfile-container"]}>
        <div className={styles["updateProfile-box"]}>
          <div className={styles["updateProfile-heading"]}>PROFILE UPDATE</div>
          <form
            className={styles["updateProfile-form"]}
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className={styles["updateProfile-name"]}>
              <Person2Icon />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className={styles["updateProfile-email"]}>
              <MailOutlineIcon />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div id={styles["updateProfileImage"]}>
              <img src={avatarPreview} alt="Avatar Preview" />

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <button
              type="submit"
              className={styles["submit-btn-updateProfile"]}
              name="updateProfile"
            >
              {loading ? (
                <ButtonSpinner border={"#1515eb"} borderTop={"red"} />
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileUpdate;
