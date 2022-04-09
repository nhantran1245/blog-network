import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ onChangeCallBack }) {
  return (
    <PhoneInput
      country={"vn"}
      onChange={(phone) => onChangeCallBack(phone)}
    />
  );
}
