import { ProductContext } from '@/app-context';
import axios from 'axios';
import { config } from '../config';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useAddProductMutation = ({ setSnackbarData }: any) => {
    const { dispatch }: any = useContext(ProductContext);
    return useMutation(async (productData: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            const axiosConfig = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            const res = await axios.post(`${config.baseUrl}/products/create`, productData, axiosConfig);
            dispatch({
                type: "ADD_PRODUCT",
                payload: { newProduct: res?.data?.data }
            });
            return res?.data?.data;
        } catch (error: any) {
            console.log(error);
            return setSnackbarData({
                message: error?.response?.data?.message ? error?.response?.data?.message : error?.message,
                type: "error"
            });
        }
    });
};

export default useAddProductMutation;