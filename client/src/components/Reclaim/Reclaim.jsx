import React, { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'

const APP_ID = "0xDc2dB8373fCA8888E858e037F33D535F6103c34F";
const PROVIDER_ID = "3ef2059d-ec1e-4107-8187-e35157e527ad";
const APP_SECRET = "0x291678a009e0f2b235f1684ee40331401768b7117083606be9f74e3fba34ed64";


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

function ReclaimDemo() {
  const [requestUrl, setRequestUrl] = useState('')
  const [proofs, setProofs] = useState(null)
  const [status, setStatus] = useState('')

  async function setup() {
    try {
      const reclaimProofRequest = await initializeReclaim()
      const url = await generateRequestUrl(reclaimProofRequest)
      setRequestUrl(url)
      setStatus('Ready to start verification')

      await startVerificationSession(
        reclaimProofRequest,
        (proofs) => {
          if (proofs) {
            console.log("proofs", proofs)
            if (typeof proofs === 'string') {
              // When using a custom callback url, the proof is returned to the callback url and we get a message instead of a proof
              console.log('SDK Message:', proofs)
              setProofs(proofs)
            } else if (typeof proofs !== 'string') {
              // When using the default callback url, we get a proof object in the response
              console.log('Proof received:', proofs?.claimData.context)
              setProofs(JSON.stringify(proofs?.claimData.context))
            }
            setStatus('Proof received!')
          }
        },
        (error) => {
          console.error('Verification failed', error)
          setStatus(`Error: ${error.message}`)
        }
      )
    } catch (error) {
      console.error('Setup failed', error)
      setStatus(`Setup failed: ${error.message}`)
    }
  }
  useEffect(() => {

    setup()
  }, [])

  return (
    <div>
      <h1>Reclaim Protocol Demo</h1>
      <p>Status: {status}</p>
      {requestUrl && (
        <div>
          <p>Request URL: {requestUrl}</p>
          <p>Use this URL to start the verification process</p>
        </div>
      )}
      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ReclaimDemo



