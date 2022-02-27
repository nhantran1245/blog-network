import React from "react";
import "./styles.scss";

export default function PageContent(props) {
  const { isMediumSize, children } = props;
  const styles = isMediumSize ? { paddingLeft: "0px" } : { paddingLeft : "300px"}
  return (
    <div id="PageContent" style={{...styles}}>
      {children}
    </div>
  )
}
