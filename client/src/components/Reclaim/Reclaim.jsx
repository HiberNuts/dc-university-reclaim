import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

const getVerificationReq = async () => {

  const APP_ID = "0xDc2dB8373fCA8888E858e037F33D535F6103c34F";
  const PROVIDER_ID = "3ef2059d-ec1e-4107-8187-e35157e527ad";
  const APP_SECRET = "0x291678a009e0f2b235f1684ee40331401768b7117083606be9f74e3fba34ed64";

  const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
  
  const requestUrl = await reclaimProofRequest.getRequestUrl()
  console.log('Request URL:', requestUrl)

  // In a real application, you would typically redirect the user to this URL or display it as a QR code.

  const statusUrl = reclaimProofRequest.getStatusUrl()
  console.log('Status URL:', statusUrl)

  // Start Session and begin listening for proofs:
  await reclaimProofRequest.startSession({
    onSuccess: (proofs) => {
      console.log('Verification success', proofs)
    },
    onFailure: (error) => {
    console.error('Verification failed', error)
    }
  })
};

export { getVerificationReq };

// call when user clicks on a button
// onClick={getVerificationReq}



