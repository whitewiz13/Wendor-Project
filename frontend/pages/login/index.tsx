import React, { useState } from "react";
import withPublic from '@/utils/PublicPage';
import withQueryClient from "@/utils/QueryClient";
import Head from "next/head";
import inventoryAnimation from '../../public/lotties/inventory.json';
import Lottie from "lottie-react";
import Snackbar from "@/components/Snackbar";
import useLoginMutation from "@/queries/loginMutation";
import useOTPMutation from "@/queries/otpMutation";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('+91');
    const [otp, setOTP] = useState('');
    const [snackbarData, setSnackbarData] = useState({
        message: '',
        type: '',
    });
    const [enableOTP, setEnableOTP] = useState(false);
    const loginMutation = useLoginMutation({ setSnackbarData });
    const otpMutation = useOTPMutation({ setSnackbarData });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (phoneNumber === "+91" || phoneNumber?.length < 10) {
            return setSnackbarData({
                message: "Please enter a valid contact number",
                type: "ERROR"
            });
        }
        if (!enableOTP) {
            loginMutation.mutate({ phoneNumber: phoneNumber });
            setEnableOTP(true);
            return;
        }
        if (enableOTP) {
            otpMutation.mutate({ phoneNumber: phoneNumber, otp: otp });
            return;
        }
    }
    return (
        <>
            <Head>
                <title>Closure AI - Login</title>
                <meta name="description" content="Closure AI Login Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="min-h-screen flex items-center flex-col xl:flex-row bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full xl:w-2/3">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Inventory Management
                    </h2>
                    <div className="hidden lg:block">
                        <div style={{ userSelect: 'none' }}>
                            <Lottie
                                animationData={inventoryAnimation}
                                style={{
                                    height: 500,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-fit xl:w-1/3 lg:mr-3">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Log in to your account</h2>
                        {enableOTP ? <p className="mt-4 text-center text-gray-900">OTP Sent to
                            <span className="font-bold"> {phoneNumber}</span></p> : null}
                    </div>
                    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            {enableOTP ? <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Enter OTP
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="otp"
                                    autoComplete="otp"
                                    required
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter OTP"
                                />
                            </div> : <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    autoComplete="phone"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Phone Number"
                                />
                            </div>
                            }
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loginMutation.isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loginMutation.isLoading ? (
                                    <p className="animate-pulse">Signing you in</p>
                                ) : (
                                    <p>Sign in / Sign up</p>
                                )}
                            </button>
                        </div>
                    </form>
                    {enableOTP ? <div className="flex">
                        <button className="mt-3 text-sm font-bold text-center text-indigo-600 hover:text-indigo-500" onClick={() => {
                            setEnableOTP(false);
                        }}>
                            Change Number?
                        </button>
                    </div> : null}
                    <footer className="mt-8">
                        <div className="max-w-md mx-auto flex justify-center text-gray-500">
                            <p className="text-sm">&copy; 2023 Sandeep Thakur. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
                {snackbarData?.message ?
                    <Snackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} /> :
                    null}
            </div>
        </>
    );
}

export default withQueryClient(withPublic(Login));