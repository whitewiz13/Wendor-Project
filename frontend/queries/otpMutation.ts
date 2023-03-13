import { UserContext } from '@/app-context';
import axios from 'axios';
import { config } from './config';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useOTPMutation = ({ setSnackbarData }: any) => {
    const { dispatch }: any = useContext(UserContext);
    return useMutation(async (otpData: any) => {
        try {
            const res = await axios.post(`${config.baseUrl}/auth/login-otp`, otpData);
            console.log(res.data);
            // localStorage.setItem("accessToken", res?.data?.data?.accessToken);
            // dispatch({
            //     type: "USER_LOGGED_IN",
            //     payload: res?.data?.data
            // });
            // return res?.data?.data;
        } catch (error: any) {
            console.log(error);
            return setSnackbarData({
                message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
                type: "error"
            });
        }
    });
};

export default useOTPMutation;