export const initialState = {
    products: [],
};

export function productReducer(state: any, action: any) {
    switch (action.type) {
        case "LOAD_PRODUCTS":
            return { ...state, products: action.payload.products };
        case "ADD_PRODUCT":
            return { ...state, products: [...state.products, action.payload.newProduct] };
        case "REMOVE_PRODUCT":
            return { ...state, products: state.products.filter((product: any) => product.id !== action.payload.productId) };
        default:
            return state;
    }
}