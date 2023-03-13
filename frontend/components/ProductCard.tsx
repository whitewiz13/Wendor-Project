import React from "react";

const ProductCard = ({ product }: any) => {
    return (
        <div className="max-w-sm rounded overflow-hidden border shadow-lg border-gray-400 m-5 mt-12 py-4">
            {/* <img className="w-full" src={product.imageUrl} alt={product.name} /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ${product.price}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {product.createdBy} on {product.createdOn}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;