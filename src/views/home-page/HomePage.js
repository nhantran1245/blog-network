import React, { useEffect, useState } from "react";
import PageContent from "../../components/page-content/PageContent";
import SideHeader from "../../components/side-header/SideHeader";
import background from "../../asset/img/bootstrap4.png";
import "./styles.scss";

export default function HomePage() {
  const [isMediumSize, setIsMediumSize] = useState( window.innerWidth <= 600);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      if (window.innerWidth <= 600) {
        setIsMediumSize(true);
      } else {
        setIsMediumSize(false);
      }
    })
  }, []);
  
  return (
    <div className="wrapper">
      {!isMediumSize && <SideHeader />}
      <PageContent isMediumSize={isMediumSize}>
        <div id="background-section">
          <img src={background} className="img-fluid" alt="..." style={{height: "500px", width: "100%"}}/>
        </div>
      </PageContent>
    </div>
  )
}
