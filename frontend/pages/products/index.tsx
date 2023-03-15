import withQueryClient from "@/utils/QueryClient";
import withAuth from "@/utils/ProtectedPage";
import { useContext, useState } from "react";
import { UserContext } from "@/app-context";
import ProductCard from "@/components/ProductCard";
import Head from "next/head";
import { ProductContext, ProductProviderWrapper } from "@/app-context";
import useLoadProductQuery from "@/queries/productQueries/loadProductQuery";
import Snackbar from "@/components/Snackbar";
import AddProductModal from "@/components/AddProductModal";
import Lottie from "lottie-react";
import loadingAnimation from '../../public/lotties/loading.json';

const Products = () => {
    const { dispatch }: any = useContext(UserContext);
    const { state }: any = useContext(ProductContext);
    const [snackbarData, setSnackbarData] = useState({
        message: '',
        type: '',
    });
    const loadProducts = useLoadProductQuery("loadProducts");

    const handleSignOut = () => {
        dispatch({
            type: "USER_LOGGED_OUT"
        });
    }

    return (<>
        <Head>
            <title>Inventory - Products</title>
            <meta name="description" content="Inventory product Page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="fixed flex justify-between top-0 left-0 right-0 z-50 bg-black text-white p-4 block rounded-b-lg">
            {/* <button className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                Menu
            </button> */}
            <div></div>
            <button className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={handleSignOut}>
                Sign out
            </button>
        </div>
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="mt-12">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Products
                </h2>
                <div className="flex justify-center mt-2">
                    <AddProductModal setSnackbarData={setSnackbarData} />
                </div>
                {loadProducts.isLoading ? <div>
                    <Lottie
                        animationData={loadingAnimation}
                        style={{
                            height: 100,
                        }}
                    />
                </div> : null}
                <div className='flex flex-wrap mt-2 justify-center'>
                    {state.products.map((product: any) => (
                        <ProductCard
                            setSnackbarData={setSnackbarData}
                            key={product.id}
                            product={product} />
                    ))}
                </div>
            </div>
            {snackbarData?.message ?
                <Snackbar snackbarData={snackbarData} setSnackbarData={setSnackbarData} /> :
                null}
        </div>
    </>)
}

export default withQueryClient(withAuth(ProductProviderWrapper(Products)));