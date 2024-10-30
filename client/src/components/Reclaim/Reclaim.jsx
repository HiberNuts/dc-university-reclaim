import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import DCButton from '../button/DCButton'
import axios from 'axios'

const APP_ID = "0xafD757AD5041E6DabA4b2b7928BE14941B6b7F1C"
const PROVIDER_ID = "3ef2059d-ec1e-4107-8187-e35157e527ad"
const APP_SECRET = "0x5e06492bb77570dc8ecc5de3909c07025e2ff1f7ed0d59d28c187303dbbf3b27"

async function initializeReclaim() {
  const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID)
  return reclaimProofRequest
}

async function generateRequestUrl(reclaimProofRequest) {
  const requestUrl = await reclaimProofRequest.getRequestUrl()
  console.log('Request URL:', requestUrl)
  return requestUrl
}

async function startVerificationSession(reclaimProofRequest, onSuccess, onFailure) {
  await reclaimProofRequest.startSession({
    onSuccess: onSuccess,
    onFailure: onFailure
  })
}

async function saveToExternalCourseAPI(courseData) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/external-courses`,
      {
        title: courseData.title,
        completion_ratio: courseData.completion_ratio,
        image_480x270: courseData.image_480x270,
        wallet_address: courseData.wallet_address
      },

    );

    console.log("data", data);
    return data

  } catch (error) {
    console.error('Failed to save course:', error);
    throw error;
  }
}

function ReclaimDemo({ walletAddress, isExternalCourseUpdated, setisExternalCourseUpdated }) {
  const [requestUrl, setRequestUrl] = useState('')
  const [proofs, setProofs] = useState(null)
  const [status, setStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function setup() {
    try {
      setIsLoading(true)
      const reclaimProofRequest = await initializeReclaim()
      const url = await generateRequestUrl(reclaimProofRequest)
      setRequestUrl(url)
      setStatus('Ready to start verification')

      await startVerificationSession(
        reclaimProofRequest,
        async (proofs) => {
          setIsLoading(false)
          if (proofs) {
            console.log("proofs", proofs)
            if (typeof proofs === 'string') {
              console.log('SDK Message:', proofs)
              setProofs(proofs)
            } else {
              console.log('Proof received:', proofs?.claimData.context)
              const context = JSON.parse(proofs?.claimData.context)
              setProofs(context.extractedParameters)

              // Save to external course API
              try {
                const courseData = {
                  title: context.extractedParameters.title,
                  completion_ratio: context.extractedParameters.completion_ratio,
                  image_480x270: context.extractedParameters.image_480x270,
                  wallet_address: walletAddress
                }
                await saveToExternalCourseAPI(courseData)
                setStatus('Course saved successfully!')
                setisExternalCourseUpdated(!isExternalCourseUpdated)
              } catch (error) {
                setStatus('Failed to save course data')
                console.error(error)
              }
            }
            setStatus('Proof received!')
          }
        },
        (error) => {
          setIsLoading(false)
          console.error('Verification failed', error)
          setStatus(`Error: ${error.message}`)
        }
      )
    } catch (error) {
      setIsLoading(false)
      console.error('Setup failed', error)
      setStatus(`Setup failed: ${error.message}`)
    }
  }

  const handleConnectUdemy = () => {
    setIsModalOpen(true)
    setup()
  }

  return (
    <div className='flex w-full justify-center items-center'>
      <DCButton btnContent='Connect Udemy' onClick={handleConnectUdemy} />

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-helvetica-neue-roman"
          onClose={() => setIsModalOpen(false)}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-200"
                  >
                    Connect your Udemy Account
                  </Dialog.Title>

                  <div className="mt-4">
                    <p className="text-md text-gray-400">
                      Status: {status}
                    </p>
                    {isLoading && (
                      <div role="status" className="gap-2 items-center mt-4">
                        <i className="c-inline-spinner"></i>
                        <p className="text-gray-400">Please wait...</p>
                      </div>
                    )}

                    {requestUrl && (
                      <div className="mt-4">
                        <p className="text-gray-400 mb-2">Open Below link in you mobile </p>
                        <p className="text-gray-400 text-sm mb-2">You might be prompted to sign into your udemy acccount then move to My learning section to start verification</p>
                        <a
                          href={requestUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 break-all"
                        >
                          {requestUrl}
                        </a>
                      </div>
                    )}

                    {proofs && (
                      <div className="mt-4">
                        <h3 className="text-green-500 font-medium mb-2">Verification Successful!</h3>
                        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-300 text-sm">
                          {JSON.stringify(proofs, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ReclaimDemo
