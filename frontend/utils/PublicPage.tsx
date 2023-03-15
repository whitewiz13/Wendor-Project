import React, { useEffect, useContext } from 'react'
import Router from 'next/router';
import withQueryClient from './QueryClient';
import useVerifyLoginMutation from '@/queries/loginQueries/verifyLoginMutation';
import { UserContext } from '@/app-context';
import LogoLoader from '@/components/LogoLoader';

const withPublic = (WrappedComponent: any) => {
    const WithPublic = (props: any) => {
        const { state }: any = useContext(UserContext);
        const verifyLoginMutation = useVerifyLoginMutation();

        useEffect(() => {
            const accessToken = localStorage.getItem('accessToken') || '';
            verifyLoginMutation.mutate(accessToken);
        }, []);

        if (state.isLoggedIn === null) {
            return <LogoLoader />
        }
        if (state.isLoggedIn === false) {
            return <WrappedComponent {...props} />
        }
        if (state.isLoggedIn === true) {
            Router.push('/products');
        }
    }
    return withQueryClient(WithPublic)
}

export default withPublic