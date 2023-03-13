import { useState, useEffect } from 'react';

const Snackbar = ({ snackbarData, setSnackbarData }: any) => {

    const [showBar, setShowBar] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowBar(false);
        }, 3000);
        const timeout2 = setTimeout(() => {
            setSnackbarData({
                message: '',
                type: ''
            });
        }, 3500);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };
    }, [setSnackbarData]);

    return (
        <div
            className={`${showBar ? 'translate-y-0' : 'translate-y-full'
                } ${snackbarData.type === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'} font-bold fixed bottom-0 left-0 w-full p-4 transform transition-all duration-300 ease-in-out text-white`}
        >
            {snackbarData?.message}
        </div>
    );
};

export default Snackbar;