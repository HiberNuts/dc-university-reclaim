// /c:/Users/91892/Documents/Upskill/dc-university/client/src/components/Button/Button.jsx
import React from 'react';
import DCButton from '../button/DCButton';
import { getVerificationReq } from '../Reclaim/Reclaim';


const Button = ({ onClick, children }) => {
    return (
        <DCButton onClick={getVerificationReq}>
            {children}
        </DCButton>
    );
};

export default Button;
