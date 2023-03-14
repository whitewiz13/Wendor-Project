import { ProductContext } from '@/app-context';
import axios from 'axios';
import { config } from '../config';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const useDeleteProductMutation = ({ setSnackbarData }: any) => {
    const { dispatch }: any = useContext(ProductContext);
    return useMutation(async (productId: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            const axiosConfig = {
                headers: { Authorization: `Bearer ${accessToken}` }
            };
            const res = await axios.delete(`${config.baseUrl}/products/delete?id=${productId}`, axiosConfig);
            dispatch({
                type: "REMOVE_PRODUCT",
                payload: { productId: productId }
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

export default useDeleteProductMutation;