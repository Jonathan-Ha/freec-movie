import React, {useMemo} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {NextPage} from "next";
import {AppProps} from "next/app";
import {getMainLayout} from "@/layouts";
import "./globals.scss";

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
    ssr?: boolean
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function CustomApp({Component, ...rest}: AppPropsWithLayout) {
    const {pageProps} = rest;
    const renderLayout = Component.getLayout ?? getMainLayout;
    const site = useMemo(() => {
        return renderLayout(
            <Component
                {...pageProps}
            />, {})
    }, [Component, pageProps, renderLayout]);
    const queryClient = new QueryClient();

    return (<>
        <QueryClientProvider client={queryClient}>{site}</QueryClientProvider>
    </>)
}

export default CustomApp;
