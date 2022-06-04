import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ value, onChangeCallBack }) {
  return (
    <PhoneInput
      country={"vn"}
      value={value}
      onChange={(phone) => onChangeCallBack(phone)}
    />
  );
}
