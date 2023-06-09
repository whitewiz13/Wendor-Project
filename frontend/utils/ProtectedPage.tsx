import React, { useEffect, useContext } from 'react'
import useVerifyLoginMutation from '@/queries/loginQueries/verifyLoginMutation';
import withQueryClient from './QueryClient';
import Router from 'next/router';
import { UserContext } from '@/app-context';
import LogoLoader from '@/components/LogoLoader';

const withAuth = (WrappedComponent: any) => {
    const WithAuth = (props: any) => {
        const { state }: any = useContext(UserContext);
        const verifyLoginMutation = useVerifyLoginMutation();

        useEffect(() => {
            const accessToken = localStorage.getItem('accessToken') || '';
            verifyLoginMutation.mutate(accessToken);
        }, []);

        if (state.isLoggedIn === null) {
            return <LogoLoader />
        }
        if (state.isLoggedIn === true) {
            return <WrappedComponent {...props} />
        }
        if (state.isLoggedIn === false) {
            Router.push('/login');
        }
    }
    return withQueryClient(WithAuth)
}

export default withAuth