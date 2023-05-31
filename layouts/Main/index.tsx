import {PropsWithChildren} from "react";
import {Layout} from 'antd';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from 'next/head';
import styles from "./styles.module.scss"

export interface Props extends PropsWithChildren {
}

export const MainLayout = (props: Props) => {
    const {Content} = Layout;
    const {children} = props
    return (<>
        <Head>
            <title>{children.props.meta ? children.props.meta.title : "Movie"}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={children.props.meta ? children.props.meta.description : "Movie"} />
        </Head>
        <Layout className={styles['blockLayout']}>
            <Header/>
            <Content style={{minHeight: "100vh"}}>
                <div>
                    {children}
                </div>
            </Content>
            <Footer/>
        </Layout>
    </>)
}
