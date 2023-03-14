'use client'
import { useReducer, createContext } from "react";
import { productReducer, initialState } from "./reducer";

// create context
const ProductContext = createContext({});

// context provider
const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(productReducer, initialState); // pass more reducers combineReducers(user, blogs, products)
    const value = { state, dispatch };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

const ProductProviderWrapper = (WrappedComponent: any) => {
    const productProviderWrapper = (props: any) => {
        return <ProductProvider>
            <WrappedComponent {...props} />
        </ProductProvider>
    }
    return productProviderWrapper;
}

export { ProductContext, ProductProvider, ProductProviderWrapper };