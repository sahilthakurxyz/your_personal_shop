import React, { Fragment, useState } from "react";
import styles from "./userprofile.module.css";
import OpenUserProfile from "./OpenUserProfile";
import { useSelector } from "react-redux";
const UserProfile = () => {
  const [openOption, setOpenOption] = useState(false);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const handleOpenProfile = () => {
    setOpenOption(true);
  };

  return (
    <Fragment>
      {!loading && (
        <div>
          {isAuthenticated ? (
            <div tabIndex="0">
              <div
                className={styles["user-profile"]}
                onClick={handleOpenProfile}
              >
                <img src={user.avatar.url} alt="profile" />
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <div
              className={styles["no-user-profile"]}
              onClick={handleOpenProfile}
            >
              <img src={"/userprofile.png"} alt="default" />
              <p>Sign In</p>
            </div>
          )}

          {openOption && (
            <OpenUserProfile
              onClose={() => setOpenOption(false)}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
