import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MintUserNftAPI } from '../../../utils/api/CourseAPI';
import twitter from '../../../assets/twitter.svg';
import '../../../App.css';
const NftModal = ({
  toast,
  isOpen,
  setIsOpen,
  courseName,
  loggedInUserData,
  courseId,
  userCourseProgress,
  nftImage
}) => {
  const [walletAddress, setwalletAddress] = useState(
    loggedInUserData?.walletAddress
  );
  const [loading, setloading] = useState(false);
  const [nftMinted, setnftMinted] = useState(false);
  const [TxHash, setTxHash] = useState('dssdsd');

  const MintUsreNft = async ({ }) => {
    try {
      setloading(true);
      if (walletAddress.length == 0) {
        toast.error('Please provide wallet address');
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
      toast.error('Something went Wrong!');
    }
  };

  const getNFTData = async () => {
    setnftMinted(
      userCourseProgress?.nftStatus ? userCourseProgress?.nftStatus : false
    );
    setTxHash(
      userCourseProgress?.nftTxHash ? userCourseProgress?.nftTxHash : ''
    );
  };

  useEffect(() => {
    setwalletAddress(loggedInUserData?.walletAddress);
    getNFTData();
  }, [loggedInUserData, userCourseProgress]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* <Toaster /> */}
      <Dialog
        as="div"
        className="relative z-10 font-helvetica-neue-roman"
        onClose={() => setIsOpen(false)}
      >
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Kudos on finishing work {courseName}! 🎓
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Claim your NFT for completing this course here. It's your
                    on-chain proof of expertise in {courseName}, valuable asset
                    in today's tech-driven world. Ready for more? Advance your
                    journey in blockchain and Web3 by enrolling in our next
                    course.
                  </p>

                  {/* <a target='_blank' href={nftImage} className='text-shardeumOrange cursor-pointer'>This is how it looks 🤌!</a> */}
                </div>
                <input
                  className="bg-gray-50 mt-4 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  value={walletAddress}
                  onChange={(e) => setwalletAddress(e.target.value)}
                />

                {TxHash.length > 0 && (
                  <div className="mt-4">
                    <a
                      target="_blank"
                      href={`https://explorer-sphinx.shardeum.org/transaction/${TxHash}`}
                      className="text-md text-blue-500"
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


                        <i className="c-inline-spinner"></i>
                        <p>Do not close this window</p>
                      </div>
                    ) : nftMinted ? (
                      'Your NFT is successfully minted, check your wallet 😉 '
                    ) : (
                      ' Mint me 🚀'
                    )}
                  </button>
                </div>
                <a
                  target="_blank"
                  href={`http://twitter.com/intent/tweet?text=Just%20aced%20${courseName}%20at%20%23ShardeumUniversity!%20%F0%9F%8E%93%20Gained%20amazing%20insights%20into%20%23Web3.%20Ready%20to%20put%20these%20blockchain%20skills%20to%20use!%20Check%20out%20their%20courses%20for%20top-notch%20learning.%20%F0%9F%9A%80%20%40Shardeum`}
                >
                  <div className="mt-4 flex ">
                    <span className="mr-2">
                      Share your success on twitter ✨
                    </span>
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
