import React from "react";
import { OrangeButton } from "../../button/OrangeButton";
import image1 from "../../../assets/image1.png";
import timeIcon from "../../../assets/timeIcon.svg";
import profileIcon from "../../../assets/profileIcon.svg";
import levelIcon from "../../../assets/levelIcon.svg";
import check from "../../../assets/check1.png";
import top from "../../../assets/top.png";
import orangeShardeum from "../../../assets/orangeShardeum.png";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CourseDescription = () => {
  return (
    <div>
      <div className="inline-flex flex-col h-[362px] items-start justify-between relative">
        <div
          className="items-center text-blue heroText md:text-[80px] mt-10 text-[60px]"
          style={{
            width: "530px",
            lineHeight: "58px",
            fontFamily: "Satoshi Variable",
            fontSize: "64px",
            fontStyle: "normal",
            fontWeight: 700,
            background:
              "var(--Gradient-1, linear-gradient(118deg, #3A4CFF 32.82%, rgba(58, 76, 255, 0.69) 71.69%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <p className="text-center items-center flex justify-center align-middle">
            Blockchain Basics
          </p>

          <div
            className="subHeading text-left w-full flex justify-center align-start leading-[36px] items-start text-black text-[24px]"
            style={{
              width: "530px",
              color: "var(--Text, #121212)",
              fontFamily: "Satoshi Variable",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%", // This is equivalent to line-height: 27px
              // opacity: 0.7,
            }}
          >
            <span className="text-black w-[85%]">
              The visual guide will provide a view to the customer of what their
              website or project will end up looking like.
            </span>
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        > */}
        {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "4px",
            }}
          > */}
        <div
          style={{
            width: "48px",
            height: "48px",
            flexShrink: 0,
            background: `url(${image1}), lightgray -74.667px -4px / 280.556% 158.056% no-repeat`,
            borderRadius: "50%",
            position: "relative",
            top: "45px",
            left: "25px",
          }}
        ></div>

        <div
          style={{
            flex: 1,
            color: "var(--Text, #121212)",
            fontFamily: "Satoshi Variable",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "125%" /* 20px */,
            position: "relative",
            left: "80px" /* Adjust the value to move it left */,
            top: "3px" /* Adjust the value to move it up */,
          }}
        >
          Kelly Muhindi <br></br>
          <span className="text-black w-[85%]">
            Blockchain Engineer at The Africa Blockchain Center
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: "245px",
            height: "58px",
            padding: "20px 32px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: "10px",
            background: "var(--Accent, #FF8743)",
            marginLeft: "10px", // Adjust the value to move the button up
          }}
        >
          <OrangeButton title="Start Learning" />
        </div>
        <div style={{ height: "30px" }}></div>
        <div
          style={{
            width: "642px",
            height: "361px",
            flexShrink: 0,
            background: `url(${top}), lightgray 50% / cover no-repeat`,
            position: "absolute",
            top: "10px",
            right: "-800px",
            borderRadius: "30px", // Adjust the radius as needed
          }}
        ></div>

        {/* </div> */}
        {/* </div> */}
      </div>
      <div>
        <div
          style={{
            height: "100px", // Adjust the height to create the desired space
          }}
        ></div>
        <div className="heroSection relative md:flex h-[35vh] z-10 flex flex-col w-full justify-between align-middle text-white bg-shardeumBlue">
          <div className="absolute w-52 h-[880vh] inset-y-0 left-10 flex align-middle flex-col justify-center"></div>
          <div
            className="fixed w-[215px] top-0 left-0 [font-family:'Satoshi_Variable-Bold',Helvetica] font-bold text-collection-1-primary text-[48px] tracking-[0] leading-[60px]"
            style={{
              width: "215px",
              height: "120px",
              flexShrink: 0,
              position: "relative", // Add this to make the positioning relative
              top: "40px", // Adjust the value to move it down
              left: "70px", // Adjust the value to move it right
            }}
          >
            <p
              style={{
                color: "var(--Primary, #FFF)",
                fontFeatureSettings: "'clig' off, 'liga' off",
                fontFamily: "Satoshi Variable",
                fontSize: "48px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "125%",
              }}
            >
              About Course
            </p>
          </div>

          <div
            style={{
              color: "var(--Primary, #FFF)",
              fontFamily: "Satoshi Variable",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
              float: "right",
              position: "relative",
              top: "-100px",
              left: "350px",
              maxWidth: "2000px    ",
              wordWrap: "break-word", // Allow the text to wrap to multiple lines
            }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <br />
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div
            style={{
              color: "var(--Primary, #FFF)",
              fontFamily: "Satoshi Variable",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
              float: "right",
              position: "relative",
              top: "-80px",
              left: "350px",
              maxWidth: "2000px    ",
              wordWrap: "break-word", // Allow the text to wrap to multiple lines
            }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <br />
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "300px", // Adjust the height to create the desired space
            }}
          ></div>
          <div
            // className="w-96 h-48 flex-col justify-center items-center gap-8 inline-flex"
            style={
              {
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                // gap: "32px",
              }
            }
          >
            <div
              className="w-96 h-48 flex-col justify-center items-center gap-8 inline-flex"
              style={{
                display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                // gap: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <div style={{ marginLeft: "1500px", marginTop: "500px" }}>
                  <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
                    Skills You'll
                    <span className="BlueGradientFade"> Gain</span>
                  </p>
                </div>

                <div
                  className="w-96 flex justify-center items-center flex-wrap gap-4"
                  style={{
                    display: "flex",
                    width: "1240px",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "24px 16px",
                    flexWrap: "wrap",
                    marginLeft: "1500px", // Adjust the value to move it to the left
                  }}
                >
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>

                  <div
                    className="px-8 py-3 bg-orange-400 rounded-lg justify-center items-center flex"
                    style={{
                      display: "flex",
                      padding: "12px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      background: "var(--Accent, #FF8743)",
                      width: "169px",
                      height: "42px",
                    }}
                  >
                    <OrangeButton
                      title={"Cryptography"}
                      className="text-center text-white text-base font-bold font-['Satoshi Variable'] leading-none"
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: "200px", // Adjust the height to create the desired space
                  }}
                ></div>
              </div>
              <div
                className="inline-flex flex-col items-center justify-center gap-[32px] relative"
                style={{ marginLeft: "1500px", marginTop: "-100px" }}
              >
                <p className="font-satoshi text-[48px] font-extrabold items-center text-center  ">
                  What You'll <span className="BlueGradientFade">Learn</span>
                </p>
                <div className="flex w-full justify-between gap-[30px] ">
                  <div className="flex flex-wrap w-[1240px] items-start justify-between gap-[40px_28px] relative">
                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>

                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>

                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>
                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>
                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>
                    <div className="flex w-[600px] items-start gap-[12px] px-[24px] py-[20px] relative bg-[#e8eaff] rounded-[16px] overflow-hidden border-2 border-solid border-[#c2c8ff] shadow-[0px_4px_20px_#c3c8ff99] ${className}">
                      <img
                        className="relative w-[24px] h-[24px]"
                        alt="Check"
                        src={check}
                      />
                      <p className="relative flex-1 mt-[-2.00px] opacity-70 font-medium text-collection-1-text text-[18px] leading-[27px]">
                        The visual guide will provide a view to the customer of
                        what their website or project will end up looking like.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                height: "700px", // Adjust the height to create the desired space
              }}
            ></div>
            <div
              className="heroSection md:flex items-center flex flex-col w-full justify-center align-middle text-white bg-shardeumBlue"
              style={{ width: "100vw", height:"25vw", left: "-10px" }}
            >
              <div
                className="items-center sm:w-[80%] text-white heroText lg.text-[48px] md:mt-10 md:text-[48px] sm.text-[36px] text-[36px]"
                style={{ marginTop: "10px", marginLeft: "-1250px" }}
              >
                <p className="text-center items-center flex justify-center align-middle">
                  Earn Your Certificate{" "}
                </p>
              </div>
              <div className="subHeading sm:w-[80%] text-center  flex justify-center align-middle leading-[36px] items-center text-white md:text-[18px] sm:[18px] text-[18px]">
                <span className="text-white md:w-[50%] w-[70%] font-satoshi ml-[-980px]">
                  Connect with like-minded developers on our social platforms.
                  Dive into discussions, share insights, and explore the world
                  of Web3 together. Let's learn, create, and evolve together!
                </span>
              </div>
            </div>
          </div>

          {/* <div className="w-96 h-48 flex-col justify-center items-center gap-8 inline-flex"> */}
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
