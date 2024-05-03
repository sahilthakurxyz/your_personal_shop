import React from "react";
import styles from "./footer.module.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { FaAngleDoubleUp } from "react-icons/fa";
const Footer = () => {
  return (
    <div className={styles["footer-main-container"]}>
      <a href="#navmenu_mainContainer" style={{ textDecoration: "none" }}>
        <div className={styles["nav-footer-backToTop"]}>
          <div>
            <p>back to top</p>
            <FaAngleDoubleUp />
          </div>
        </div>
      </a>
      <div className={styles["nav-footer-contactPage"]}>
        <div className={styles["footer-about-section"]}>
          <div>
            <p>Know About Us</p>
            <div>
              <a href="https://www.instagram.com/freaky_fred_creep08/">
                comming soon...
              </a>
            </div>
          </div>
          <div>
            <p>About us</p>
            <div>
              <a href="https://www.linkedin.com/in/sahil-thakur-735181203/">
                comming soon...
              </a>
            </div>
          </div>
          <div>
            <p>Social Url</p>
            <div>
              <a href="https://www.instagram.com/freaky_fred_creep08/">
                Instagram
              </a>
              <a href="https://www.facebook.com/profile.php?id=100007402210241">
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/sahil-thakur-735181203/">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <p>Lets Us Help you</p>
            <div>
              <a href="https://www.instagram.com/freaky_fred_creep08/">
                comming soon...
              </a>
            </div>
          </div>
        </div>
        <div className={styles["footer-totalCountry-bussiness"]}>
          <div className={styles["footer-totalCountry-marginTop"]}>
            <p>
              Total Countries Bussiness and Languages here all the countries and
              cities where our bussiness are runnings
            </p>
            <p>(India)</p>
          </div>
        </div>
      </div>
      <div className={styles["nav-footer-copyRights"]}>
        <div>
          <span>
            <CopyrightIcon />
          </span>
          Copy Rights @2024
        </div>
      </div>
    </div>
  );
};

export default Footer;
