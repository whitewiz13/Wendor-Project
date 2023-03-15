import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from '../public/lotties/loading.json';

const LogoLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Lottie
                animationData={loadingAnimation}
                style={{
                    height: 200,
                }}
            />
        </div>
    );
};

export default LogoLoader;