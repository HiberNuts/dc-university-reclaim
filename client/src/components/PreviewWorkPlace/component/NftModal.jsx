import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MintUserNftAPI } from "../../../utils/api/CourseAPI";
import twitter from "../../../assets/twitter.svg";

const NftModal = ({ toast, isOpen, setIsOpen, courseName, loggedInUserData, courseId, userCourseProgress }) => {
  const [walletAddress, setwalletAddress] = useState(loggedInUserData?.walletAddress);
  const [loading, setloading] = useState(false);
  const [nftMinted, setnftMinted] = useState(false);
  const [TxHash, setTxHash] = useState("dssdsd");

  const MintUsreNft = async ({ }) => {
    try {
      setloading(true);
      if (walletAddress.length == 0) {
        toast.error("Please provide wallet address");
      } else {
        const result = await MintUserNftAPI({
          courseId: courseId,
          accessToken: loggedInUserData?.accessToken,
          walletAddress: loggedInUserData?.walletAddress,
        });
        if (result?.minted == true) {
          setTxHash(result.TxHash);
          setnftMinted(true);
          setloading(false);
        }
      }
      setloading(false);
    } catch (error) {
      toast.error("Something went Wrong!");
    }
  };

  const getNFTData = async () => {
    setnftMinted(userCourseProgress?.nftStatus ? userCourseProgress?.nftStatus : false);
    setTxHash(userCourseProgress?.nftTxHash ? userCourseProgress?.nftTxHash : "");
  };

  useEffect(() => {
    setwalletAddress(loggedInUserData?.walletAddress);
    getNFTData();
  }, [loggedInUserData, userCourseProgress]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* <Toaster /> */}
      <Dialog as="div" className="relative z-10 font-helvetica-neue-roman" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                  Kudos on finishing work {courseName}! 🎓
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Claim your NFT for completing this course here. It's your on-chain proof of expertise in{" "}
                    {courseName}, valuable asset in today's tech-driven world. Ready for more? Advance your journey in
                    blockchain and Web3 by enrolling in our next course.
                  </p>
                </div>
                <input
                  className="bg-gray-50 mt-4 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  value={walletAddress}
                  onChange={(e) => setwalletAddress(e.target.value)}
                />
                {TxHash.length > 0 && (
                  <div className="mt-4">
                    <a target="_blank"
                      href={`https://explorer-sphinx.shardeum.org/transaction/${TxHash}`}
                      className="text-md text-gray-500"
                      style={{ wordWrap: 'break-word', overflow: 'hidden' }}
                    >
                      https://explorer-sphinx.shardeum.org/transaction/{TxHash}
                    </a>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    disabled={loading ? true : nftMinted ? true : false}
                    // disabled
                    type="button"
                    className="justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={MintUsreNft}
                  >
                    {loading ? (
                      <div role="status " className="gap-2 items-center">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only"></span>
                        <p>Do not close this window</p>
                      </div>
                    ) : nftMinted ? (
                      "Your NFT is successfully minted, check your wallet 😉 "
                    ) : (
                      " Mint me 🚀"
                    )}
                  </button>
                </div>
                <a
                  target="_blank"
                  href={`http://twitter.com/intent/tweet?text=Just%20aced%20${courseName}%20at%20%23ShardeumUniversity!%20%F0%9F%8E%93%20Gained%20amazing%20insights%20into%20%23Web3.%20Ready%20to%20put%20these%20blockchain%20skills%20to%20use!%20Check%20out%20their%20courses%20for%20top-notch%20learning.%20%F0%9F%9A%80%20%40Shardeum`}
                >
                  <div className="mt-4 flex ">
                    <span className="mr-2">Share your success on twitter ✨</span>
                    <img src={twitter} />
                  </div>
                </a>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NftModal;
