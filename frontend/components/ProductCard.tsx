import useDeleteProductMutation from "@/queries/productQueries/deleteProductMutation";
import React from "react";

const ProductCard = ({ product, setSnackbarData }: any) => {

    const deleteProduct = useDeleteProductMutation({ setSnackbarData });

    const handleDeleteProduct = () => {
        deleteProduct.mutate(product?.id);
    }
    return (
        <div className="max-w-sm rounded overflow-hidden border shadow-lg border-gray-400 m-5 mt-12 py-4">
            {/* <img className="w-full" src={product.imageUrl} alt={product.name} /> */}
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
                    <button disabled={deleteProduct.isLoading} className="relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={handleDeleteProduct}>
                        {deleteProduct.isLoading ? 'Deleting' : 'Delete'}
                    </button>
                </div>
                <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Rs. {product.price}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    By {product?.user?.phoneNumber} on {new Date(product?.createdOn).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;