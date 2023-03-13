import withQueryClient from "@/utils/QueryClient";
import withAuth from "@/utils/ProtectedPage";

const Products = () => {
    return (<>
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Products
            </h2>
        </div>
    </>)
}

export default withQueryClient(withAuth(Products));