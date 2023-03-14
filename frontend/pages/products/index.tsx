import withQueryClient from "@/utils/QueryClient";
import withAuth from "@/utils/ProtectedPage";
import { useContext, useEffect } from "react";
import { UserContext } from "@/app-context";
import ProductCard from "@/components/ProductCard";
import Head from "next/head";
import { ProductContext, ProductProviderWrapper } from "@/app-context";

const products = [
    {
        id: "1234",
        imageUrl: "",
        name: "One Plus TV",
        price: 100,
        createdBy: "Sandeep",
        createdOn: "10th Oct",
        description: "This is a greate TV"
    },
    {
        id: "5678",
        imageUrl: "",
        name: "HP Omen laptop",
        price: 200,
        createdBy: "Sandeep",
        createdOn: "11th Oct",
        description: "This is a greate laptop"
    }

]

const Products = () => {
    const { dispatch }: any = useContext(UserContext);
    const { state }: any = useContext(ProductContext);

    useEffect(() => {
        console.log(state);
    }, []);

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
                    <button
                        type="submit"
                        className="group relative w-halfs flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <p>Add Product</p>
                    </button>
                </div>
                <div className="flex">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default withQueryClient(withAuth(ProductProviderWrapper(Products)));