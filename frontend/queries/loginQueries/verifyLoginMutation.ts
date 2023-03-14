import { UserContext } from '@/app-context';
import axios from 'axios';
import { config } from '../config';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useVerifyLoginMutation = () => {
    const { dispatch }: any = useContext(UserContext);
    return useMutation(async (token: string | string[]) => {
        try {
            if (!token) {
                dispatch({
                    type: "USER_LOGGED_OUT",
                    payload: null
                });
                throw new Error('Authentication failed');
            }
            const axiosConfig = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const res = await axios.get(`${config.baseUrl}/auth/verify-auth`, axiosConfig);
            dispatch({
                type: "USER_LOGGED_IN",
                payload: res.data.data
            });
            return res.data.data;
        } catch (error: any) {
            dispatch({
                type: "USER_LOGGED_OUT",
                payload: null
            });
            throw new Error('Authentication failed');
        }
    });
};

export default useVerifyLoginMutation;