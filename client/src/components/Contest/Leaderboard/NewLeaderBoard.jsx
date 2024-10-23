
import dollarSign from "../../../assets/dollar-sign.svg"
import image41 from "../../../assets/image-41.png"
import maskGroup3 from "../../../assets/mask-group-3.png"
import maskGroup4 from "../../../assets/mask-group-4.png"
import maskGroup from "../../../assets/mask-group.png"
import image1 from "../../../assets/imageBG.png"
import line672 from "../../../assets/line-67-2.svg";
import line673 from "../../../assets/line-67-3.svg";
import line67 from "../../../assets/line-67-4.svg";
import line682 from "../../../assets/line-68-2.svg";
import line68 from "../../../assets/line-68-3.svg";
import line692 from "../../../assets/line-69-2.svg";
import line693 from "../../../assets/line-69-3.svg";
import line69 from "../../../assets/line-69-4.svg";
import line702 from "../../../assets/line-70-2.svg";
import line703 from "../../../assets/line-70-3.svg";
import line70 from "../../../assets/line-70-4.svg";
import image18 from "../../../assets/image-18.png"
import image from "../../../assets/line-70-6.svg"


const NewLeaderBoard = ({ data }) => {

  console.log("data", data);
  return (
    <div className="flex flex-col gap-10 pt-[60px] pb-20  self-stretch w-full items-start relative flex-[0_0_auto]">
      {/* <div className="relative w-fit mt-[-1.00px] [background:linear-gradient(180deg,rgb(255,255,255)_0%,rgb(121.2,121,123)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Orbitron-Bold',Helvetica] font-bold text-transparent text-[40px] tracking-[0] leading-[50px] whitespace-nowrap">
          Leaderboard
        </div> */}

      <div className="flex-col items-start justify-center rounded-[20px] overflow-hidden border-2 border-solid border-[#5d89ff] shadow-[0px_0px_200px_#3a59fe80] flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="w-[1280px] items-center [background:linear-gradient(180deg,rgb(92.65,136.59,255)_0%,rgb(58,89,254)_100%)] flex relative flex-[0_0_auto]">
          <div className="w-[1280px] h-[84px] overflow-hidden absolute top-0 left-0">
            <div className="relative w-[1440px] h-[819px] top-[-170px]">
              <div className="opacity-[0.13] absolute w-[1440px] h-[500px] top-[170px] left-0">
                <img
                  className="w-[1280px] h-full absolute top-0 left-0"
                  alt="Mask group"
                  src={image1}
                />
              </div>

              <div className="absolute w-[500px] h-[500px] top-0 left-[390px] bg-[#5d89ff] rounded-[250px] blur-[300px] opacity-20" />

              <div className="absolute w-[1440px] h-[649px] top-[170px] left-0">
                <div className="relative w-[1468px] h-[673px] -top-6 opacity-10">
                  <img
                    className="w-[367px] h-[84px] top-6 left-0 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <div className="absolute w-[367px] h-[336px] top-[1518px] left-[-8154px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img
                      className="w-[367px] h-[336px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[367px] h-[336px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[367px] h-[336px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                  </div>

                  <img
                    className="w-[367px] h-[84px] top-6 left-[367px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[367px] h-[84px] top-6 left-0 md:left-[734px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[179px] h-[84px] top-6 left-[1101px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[150px] items-center justify-center px-11 py-8 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
              RANK
            </div>
          </div>

          <div className="flex flex-col w-[200px] items-center justify-center px-11 py-8 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
              AVATAR
            </div>
          </div>

          <div className="flex flex-col w-[510px] items-start justify-center px-11 py-8 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
              USER NAME
            </div>
          </div>

          <div className="flex flex-col w-[200px] items-center justify-center px-11 py-8 relative">
            <div className="relative w-fit mt-[-1.00px] ml-[-2.50px] mr-[-2.50px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
              XP POINTS
            </div>
          </div>

          <div className="flex flex-col w-[220px] items-center justify-center px-11 py-8 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-xl tracking-[2.40px] leading-5 whitespace-nowrap">
              PRIZE
            </div>
          </div>
        </div>

        <div className="items-center bg-[#61dd38]/15 border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-[1280px] h-[72px] overflow-hidden absolute top-0 left-0">
            <div className="relative w-[1287px] h-[578px] -top-px left-[-7px]">
              <div className="absolute w-[943px] h-64 top-8 left-0">
                <div className="absolute w-[293px] h-64 top-0 left-[650px] rounded-[146.67px/128px]">
                  <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#61dd38] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />

                  <div className="absolute w-[230px] h-[29px] top-0.5 left-[31px]">
                    <div className="top-[27px] left-[193px] rotate-180 absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-1 left-[199px] rotate-180 absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-5 left-[211px] rotate-180 absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-0 left-[228px] rotate-180 absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-[27px] left-[35px] absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-1 left-[29px] absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-5 left-[17px] absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />

                    <div className="top-0 left-0 absolute w-0.5 h-0.5 bg-[#61dd38] rounded-[1.05px]" />
                  </div>
                </div>

                <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#61dd38] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />
              </div>

              <img
                className="absolute w-[53px] h-[72px] top-px left-[858px]"
                alt="Line"
                src={line673}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[884px]"
                alt="Line"
                src={line68}
              />

              <img
                className="absolute w-[53px] h-[72px] top-px left-[682px]"
                alt="Line"
                src={line693}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[675px]"
                alt="Line"
                src={line70}
              />

              <div className="absolute w-[1280px] h-[577px] top-0.5 left-[7px]">
                <div className="relative w-[1305px] h-[598px] top-[-21px] opacity-15">
                  <img
                    className="w-[326px] h-[72px] top-[21px] left-0 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <div className="absolute w-[326px] h-[299px] top-[1431px] left-[-8154px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                  </div>

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[326px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[652px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[301px] h-[72px] top-[21px] left-[979px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                </div>
              </div>

              <div className="absolute w-[184px] h-[184px] top-0 left-[711px]">
                <div className="relative w-[244px] h-[72px] top-px left-[-30px] bg-[url(assets/trophy-1.png)] bg-cover bg-[20%_20%]">
                  <img
                    className="absolute w-[244px] -top-[35px] left-0 mix-blend-color"
                    alt="Mask group"
                    src={maskGroup3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1
            </div>

            <div className="absolute w-[26px] h-[26px] top-[22px] left-[35px] bg-[url(assets/mask-group-2.png)] bg-[100%_100%]" />
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Deadpool_Marvel_Jesus
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              2000
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
              <img
                className="relative w-5 h-5"
                alt="Lucide dollar sign"
                src={dollarSign}
              />

              <div className="relative w-[41px] h-3.5 [font-family:'Helvetica_Neue_LT_Pro-Md',Helvetica] font-normal text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                1200
              </div>
            </div>
          </div>
        </div>

        <div className="items-center bg-[#ffc226]/15 border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-[1280px] h-[72px] overflow-hidden absolute top-0 left-0">
            <div className="relative w-[1287px] h-[578px] -top-px left-[-7px]">
              <div className="absolute w-[943px] h-64 top-8 left-0">
                <div className="absolute w-[293px] h-64 top-0 left-[650px] rounded-[146.67px/128px]">
                  <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#ffc226] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />

                  <div className="absolute w-[230px] h-[29px] top-0.5 left-[31px]">
                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-[27px] left-[193px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-1 left-[199px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-5 left-[211px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-0 left-[228px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-[27px] left-[35px] rounded-[1.05px]" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-1 left-[29px] rounded-[1.05px]" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-5 left-[17px] rounded-[1.05px]" />

                    <div className="bg-[#ffc226] absolute w-0.5 h-0.5 top-0 left-0 rounded-[1.05px]" />
                  </div>
                </div>

                <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#ffc226] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />
              </div>

              <img
                className="absolute w-[53px] h-[72px] top-px left-[858px]"
                alt="Line"
                src={line67}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[884px]"
                alt="Line"
                src={line682}
              />

              <img
                className="absolute w-[53px] h-[72px] top-px left-[682px]"
                alt="Line"
                src={line692}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[675px]"
                alt="Line"
                src={line702}
              />

              <div className="absolute w-[1280px] h-[577px] top-0.5 left-[7px]">
                <div className="relative w-[1305px] h-[598px] top-[-21px] opacity-10">
                  <img
                    className="w-[326px] h-[72px] top-[21px] left-0 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <div className="absolute w-[326px] h-[299px] top-[1359px] left-[-8154px] bg-[url(assets/image-41.png)] bg-cover bg-[50%_50%]">
                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                  </div>

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[326px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[652px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[301px] h-[72px] top-[21px] left-[979px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                </div>
              </div>

              <div className="absolute w-[184px] h-[184px] top-0 left-[711px]">
                <div className="relative w-[244px] h-[72px] top-px left-[-30px] bg-[url(assets/trophy-3.png)] bg-cover bg-[20%_20%] bg-opacity-80">
                  <img
                    className="absolute w-[244px] -top-[35px] left-0 mix-blend-color"
                    alt="Mask group"
                    src={maskGroup4}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              2
            </div>

            <div className="absolute w-[26px] h-[26px] top-[22px] left-[35px] bg-[url(assets/mask-group-9.png)] bg-[100%_100%]" />
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Wolverine_X_men
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1750
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
              <img
                className="relative w-5 h-5"
                alt="Lucide dollar sign"
                src={dollarSign}
              />

              <div className="relative w-[41px] h-3.5 [font-family:'Helvetica_Neue_LT_Pro-Md',Helvetica] font-normal text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                1200
              </div>
            </div>
          </div>
        </div>

        <div className="items-center bg-[#ff4b53]/15 border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-[1280px] h-[72px] overflow-hidden absolute top-0 left-0">
            <div className="relative w-[1287px] h-[578px] -top-px left-[-7px]">
              <div className="absolute w-[943px] h-64 top-8 left-0">
                <div className="absolute w-[293px] h-64 top-0 left-[650px] rounded-[146.67px/128px]">
                  <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#ff4b53] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />

                  <div className="absolute w-[230px] h-[29px] top-0.5 left-[31px]">
                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-[27px] left-[193px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-1 left-[199px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-5 left-[211px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-0 left-[228px] rounded-[1.05px] rotate-180" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-[27px] left-[35px] rounded-[1.05px]" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-1 left-[29px] rounded-[1.05px]" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-5 left-[17px] rounded-[1.05px]" />

                    <div className="bg-[#ff4b53] absolute w-0.5 h-0.5 top-0 left-0 rounded-[1.05px]" />
                  </div>
                </div>

                <div className="absolute w-[293px] h-64 top-0 left-0 bg-[#ff4b53] rounded-[146.67px/128px] blur-[266.67px] opacity-50" />
              </div>

              <img
                className="absolute w-[53px] h-[72px] top-px left-[858px]"
                alt="Line"
                src={line672}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[884px]"
                alt="Line"
                src={image}
              />

              <img
                className="absolute w-[53px] h-[72px] top-px left-[682px]"
                alt="Line"
                src={line69}
              />

              <img
                className="absolute w-[35px] h-[59px] top-3.5 left-[675px]"
                alt="Line"
                src={line703}
              />

              <div className="absolute w-[1280px] h-[577px] top-0.5 left-[7px]">
                <div className="relative w-[1305px] h-[598px] top-[-21px] opacity-10">
                  <img
                    className="w-[326px] h-[72px] top-[21px] left-0 absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <div className="absolute w-[326px] h-[299px] top-[1287px] left-[-8154px] bg-[url(assets/image-41.png)] bg-cover bg-[100%_100%]">
                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />

                    <img
                      className="w-[326px] h-[299px] top-0 left-0 absolute object-cover"
                      alt="Image"
                      src={image41}
                    />
                  </div>

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[326px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[326px] h-[72px] top-[21px] left-[652px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />

                  <img
                    className="w-[301px] h-[72px] top-[21px] left-[979px] absolute object-cover"
                    alt="Image"
                    src={image41}
                  />
                </div>
              </div>

              <div className="absolute w-[184px] h-[184px] top-0 left-[711px]">
                <div className="relative w-[244px] h-[72px] top-px left-[-30px] bg-[url(assets/trophy-2.png)] bg-cover bg-[20%_20%]">
                  <img
                    className="absolute w-[244px] -top-[35px] left-0 mix-blend-color"
                    alt="Mask group"
                    src={maskGroup}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              3
            </div>

            <div className="absolute w-[26px] h-[26px] top-[22px] left-[35px] bg-[url(assets/mask-group-6.png)] bg-[100%_100%]" />
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Rick Astley
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1520
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
              <img
                className="relative w-5 h-5"
                alt="Lucide dollar sign"
                src={dollarSign}
              />

              <div className="relative w-[41px] h-3.5 [font-family:'Helvetica_Neue_LT_Pro-Md',Helvetica] font-normal text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                1200
              </div>
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              4
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Michael_Scott
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1350
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              5
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Timmy_cook
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1220
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              6
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Elon_Musk_ZAEA-12
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              1000
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              7
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Doge_lord
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              900
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              8
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Shrek_green
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              500
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>

        <div className="items-center bg-[#121212] border-b [border-bottom-style:solid] border-[#ffffff33] flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[150px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              9
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden">
              <img
                className="absolute w-12 h-12 top-0 left-0 object-cover"
                alt="Image"
                src={image18}
              />
            </div>
          </div>

          <div className="flex flex-col h-[72px] items-start justify-center px-11 py-0 relative flex-1 grow">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              Pepe_coin_master
            </div>
          </div>

          <div className="flex flex-col w-[200px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              300
            </div>
          </div>

          <div className="flex flex-col w-[220px] h-[72px] items-center justify-center px-11 py-0 relative">
            <div className="relative w-fit [font-family:'Gilroy-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              --
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewLeaderBoard