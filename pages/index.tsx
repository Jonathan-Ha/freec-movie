import {useState} from "react";
import {Modal} from "antd";
import {GetServerSidePropsContext} from "next";
import WrapSearchMovie from "@/components/WrapSearchMovie";
import WrapResultMovie from "@/components/WrapResultMovie";
import * as MDLMenu from "@/models/Movie";
import styles from './styles.module.scss'

export interface Props {
}

export function Home(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataMovie, setDataMovie] = useState<any>(undefined);
    const [initialDataMovie, setInitialDataMovie] = useState<any>(undefined);

    const [modal, contextHolder] = Modal.useModal();

    const onSearchMovie = (values: any) => {
        const reqFt = {
            s: values.itemTitle ? values.itemTitle.trim() : undefined,
            type: values.itemType ? values.itemType : undefined,
            y: values.itemYear ? values.itemYear.$y : undefined
        }
        setLoading(true);
        MDLMenu.searchMovie(reqFt).then((ft: any) => {
            setDataMovie(ft.data);
            setInitialDataMovie(ft.data);
            setLoading(false);
        }).catch(error => {
            const text = error.message ? error.message : "Lỗi không rõ từ máy chủ";
            modal.warning({
                title: "Thông báo",
                okText: "Đóng",
                centered: true,
                content: text
            });
            setLoading(false);
        });
    }

    const onChangeFilterType = (values: any) => {
        let temp = {...initialDataMovie}
        if (values.length) {
            const foundObject = temp.Search.filter((obj: any) => values.includes(obj.Type));
            temp = {...temp, Search: foundObject}
        }
        setDataMovie(temp);
    }

    return (
        <>
            <div className={styles["blockHomePage"]}>
                <section className={styles["breadcrumbArea"]} style={{backgroundImage: `url("/breadcrumb_bg.jpg")`}}>
                    <div className={styles["caption"]}>
                        <h2 className={styles["title"]}>Our <span>Movie</span></h2>
                    </div>
                </section>
                <section className={styles["movieArea"]}>
                    <div className={styles["wrapSearchMovie"]}>
                        <WrapSearchMovie
                            loading={loading}
                            onSearchMovie={onSearchMovie}
                        />
                    </div>
                    <div className={styles["wrapResultMovie"]}>
                        <WrapResultMovie
                            loading={loading}
                            dataMovie={dataMovie}
                            onChangeFilterType={onChangeFilterType}/>
                    </div>
                </section>
            </div>
            {contextHolder}
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let props = {
        meta: {
            key: 'home',
            title: 'Home page - Search movie',
            noindex: false,
            nofollow: false,
            description: 'Home page - Search movie',
            robotsProps: {}
        }
    }
    return {props}
}


export default Home;
