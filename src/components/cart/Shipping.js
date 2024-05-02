import React, { Fragment, useState } from "react";
import styles from "./shipping.module.css";
import CheckoutSteps from "./CheckoutSteps";
import { FaHome } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import MetaData from "../labels/MetaData";
import ScreenVisual from "../labels/ScreenVisual";
const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Information" />
      <CheckoutSteps activeStep={0} />
      <ScreenVisual />
      <div className={styles["shipping-container"]}>
        <div className={styles["shipping-box"]}>
          <h2 className={styles["shipping-heading"]}>Shipping Details</h2>
          <form
            className={styles["shipping-form"]}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <FaHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <FaCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <IoLocationOutline />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <FaPhoneAlt />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <MdPublic />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Country</option>
                {Country &&
                  Country.getAllCountries().map((countries) => (
                    <option key={countries.name} value={countries.isoCode}>
                      {countries.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <FaWalking />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.name} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className={styles["submit-btn"]}
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
