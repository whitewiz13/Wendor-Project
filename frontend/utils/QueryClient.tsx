import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const withQueryClient = (WrappedComponent: any) => {
    const WithQueryClient = (props: any) => {
        return (
            <QueryClientProvider client={queryClient}>
                <WrappedComponent {...props} />
            </QueryClientProvider>
        )
    }
    return WithQueryClient
}

export default withQueryClient