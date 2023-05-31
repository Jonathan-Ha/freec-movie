import React, {useMemo} from "react";
import _ from "lodash";
import {Empty, Select} from 'antd';
import {dataType} from "@/constants/data";
import Image from "next/image";
import WrapSkeletonTypeA from "@/components/WrapSkeletonTypeA";
import Link from "next/link";
import {formatURL} from "@/helpers";
import styles from "./styles.module.scss"

export interface Props {
    loading: boolean
    onChangeFilterType: (values: any) => void
    dataMovie?: {
        Response?: boolean
        Search?: [{
            Title?: string
            Poster?: string
            Year?: string
            Type?: string
            imdbID: string
        }],
        totalResults?: string
    }
}

export const WrapResultMovie = (props: Props) => {
    const {loading, dataMovie, onChangeFilterType} = props;

    const yieldDataMovie = useMemo(() => {
        if (loading) {
            return (<WrapSkeletonTypeA classDesc={styles["desc"]} classWrapItem={styles["wrapItem"]} quantity={15}/>);
        }
        if (dataMovie && dataMovie.Search && dataMovie.Search.length) {
            return _.map(dataMovie.Search, (ft: any, indexFt: number) => {
                const link = `movie/${formatURL(ft.Title).toLowerCase()}-${ft.imdbID}`;
                return (<div key={indexFt} className={styles["wrapItem"]}>
                    <Link href={link} target={"_blank"}>
                        <Image
                            src={ft.Poster}
                            alt={ft.Title}
                            width={100}
                            height={100}
                        />
                        <div className={styles["desc"]}>
                            <div className={styles["descGroup"]}>
                                <span className={styles["name"]}>{ft.Title}</span>
                                <span className={styles["year"]}>{ft.Year}</span>
                            </div>
                            <div className={styles["descGroup"]}>
                                <span className={styles["type"]}>{ft.Type}</span>
                            </div>
                        </div>
                    </Link>
                </div>)
            });
        } else {
            return <Empty description={false}/>;
        }
    }, [dataMovie, loading]);

    return (
        <>
            <div className={styles["resultMovie"]}>
                <div className={styles["wrapHeader"]}>
                    <h2 className={styles["title"]}>Results</h2>
                    <div className={styles["wrapFilter"]}>
                        <p>Filter by</p>
                        <Select placeholder="Type"
                                onChange={onChangeFilterType}
                                disabled={!dataMovie}
                                mode='multiple'
                                options={dataType()}
                                size={"large"}
                                maxTagCount='responsive'
                                style={{width: '100%'}}/>
                    </div>
                </div>
                <div className={styles["wrapListItem"]}>
                    {yieldDataMovie}
                </div>
            </div>
        </>
    )
}

export default WrapResultMovie
