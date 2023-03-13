import { UserContext } from '@/app-context';
import axios from 'axios';
import { config } from './config';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useLoginMutation = ({ setSnackbarData }: any) => {
    const { dispatch }: any = useContext(UserContext);
    return useMutation(async (loginData: any) => {
        try {
            const res = await axios.post(`${config.baseUrl}/auth/login`, loginData);
            console.log(res.data);
        } catch (error: any) {
            console.log(error);
            return setSnackbarData({
                message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
                type: "error"
            });
        }
    });
};

export default useLoginMutation;