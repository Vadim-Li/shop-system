import React, { useState } from "react";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisibility);

  return (
    <div
      className="scroll-to-top"
      style={{ position: "fixed", bottom: "20px", right: "20px" }}
    >
      {isVisible && (
        // <button
        //   onClick={scrollToTop}
        //   style={{
        //     backgroundColor: "#F5F5F5",
        //     border: "1px solid #A6A6A6",
        //     width: "45px",
        //     height: "45px",
        //     cursor: "pointer",
        //     textAlign: "center",
        //   }}
        // >
        //   <div>
        //     <i className="fa fa-caret-up"></i>
        //   </div>
        //   Top
        // </button>
        <div
          style={{
            width: "45px",
            height: "45px",
            border: "1px solid #A6A6A6",
            textAlign: "center",
            backgroundColor: "#F5F5F5",
            cursor: "pointer",
          }}
          onClick={scrollToTop}
        >
          <div>
            <i className="fa fa-caret-up"></i>
          </div>
          TOP
        </div>
      )}
    </div>
  );
};

export default ScrollButton;
