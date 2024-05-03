import React from "react";
import styles from "./contact.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Typography } from "@mui/material";
import ScreenVisual from "../labels/ScreenVisual";
const Contact = () => {
  return (
    <div className={styles["contact-us"]}>
      <ScreenVisual />
      <Typography>Contact Us </Typography>
      <div>
        <div className={styles["facebook"]}>
          <FacebookIcon />
          <a href="https://www.facebook.com/profile.php?id=100007402210241">
            <p>Facebook</p>
          </a>
        </div>
        <div className={styles["instagram"]}>
          <InstagramIcon />
          <a href="https://www.instagram.com/freaky_fred_creep08/">
            <p>Instagram</p>
          </a>
        </div>
        <div className={styles["github"]}>
          <GitHubIcon />
          <a href="https://github.com/sahilthakurxyz">
            <p>Github</p>
          </a>
        </div>
        <div className={styles["whatsapp"]}>
          <WhatsAppIcon />
          <a href="">
            <p>6006642472</p>
          </a>
        </div>
        <div className={styles["telegram"]}>
          <TelegramIcon />
          <a href="">
            <p>Telegram</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
