import { ProductContext, UserContext } from '@/app-context';
import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { config } from '../config';

const useLoadProductQuery = ({ queryKey }: any) => {
    const { dispatch }: any = useContext(ProductContext);
    return useQuery([queryKey], async () => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            const axiosConfig = {
                headers: { Authorization: `Bearer ${accessToken}` }
            };
            const res = await axios.get(`${config.baseUrl}/products/find`, axiosConfig);
            dispatch({
                type: "LOAD_PRODUCTS",
                payload: { products: res?.data?.data }
            });
            return res?.data?.data;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    }, { retry: false });
};

export default useLoadProductQuery;