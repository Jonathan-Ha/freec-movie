import React from "react";
import {GetServerSidePropsContext} from "next";
import {Col, Row} from "antd";
import Image from "next/image";
import {FaRegCalendarAlt, FaRegClock, FaUserCircle, FaRegUserCircle, FaLanguage, FaGlobeAmericas} from "react-icons/fa";
import * as MDLMenu from "@/models/Movie";
import styles from './styles.module.scss'

export interface Props {
    movieDetail: {
        Poster?: string
        Title?: string
        Type?: string
        Genre?: string
        Year?: string
        Runtime?: string
        Director?: string
        Writer?: string
        Actors?: string
        Language?: string
        Country?: string
        Plot?: string
        Ratings?: [{
            Source?: string
            Value?: string
        }]
    }
}

const MovieDetailPage = (props: Props) => {
    const {movieDetail} = props;
    return (
        <div className={styles["movieDetailArea"]}>
            <div className={styles["wrapInfo"]}>
                <Row gutter={24}>
                    <Col xl={8}
                         lg={8}
                         md={24}
                         sm={24}
                         xs={24} className={styles["poster"]}>
                        <Image
                            src={movieDetail.Poster}
                            alt={"ft.Title"}
                            width={100}
                            height={100}
                        />
                    </Col>
                    <Col xl={16}
                         lg={16}
                         md={24}
                         sm={24}
                         xs={24} className={styles["basic"]}>
                        <h2 className={styles["title"]}>{movieDetail.Title}</h2>
                        <div className={styles["meta"]}>
                            <ul>
                                <li className={styles["type"]}>
                                    <span>{movieDetail.Type}</span>
                                </li>
                                <li className="category">
                                    <span>{movieDetail.Genre}</span>
                                </li>
                                <li className={styles["releaseTime"]}>
                                    <span><FaRegCalendarAlt/> {movieDetail.Year}</span>
                                    <span><FaRegClock/> {movieDetail.Runtime}</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles["desc"]}>
                            <div className={styles["descGroup"]}>
                                <p className={styles["label"]}><FaUserCircle/> Director:</p>
                                <p className={styles["value"]}>{movieDetail.Director}</p>
                            </div>
                            <div className={styles["descGroup"]}>
                                <p className={styles["label"]}><FaUserCircle/> Writer:</p>
                                <p className={styles["value"]}>{movieDetail.Writer}</p>
                            </div>
                            <div className={styles["descGroup"]}>
                                <p className={styles["label"]}><FaRegUserCircle/> Actors:</p>
                                <p className={styles["value"]}>{movieDetail.Actors}</p>
                            </div>
                            <div className={styles["descGroup"]}>
                                <p className={styles["label"]}><FaLanguage/> Language:</p>
                                <p className={styles["value"]}>{movieDetail.Language}</p>
                            </div>
                            <div className={styles["descGroup"]}>
                                <p className={styles["label"]}><FaGlobeAmericas/> Country:</p>
                                <p className={styles["value"]}>{movieDetail.Country}</p>
                            </div>
                        </div>
                        <div className={styles["rating"]}>
                            <p>{movieDetail.Ratings[0].Value}</p>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} className={styles["plot"]}>
                        <h2 className={styles["title"]}>Movie plot</h2>
                        <div className={styles["content"]}>
                            <p>{movieDetail.Plot}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    let imdbID;
    if (typeof id === "string" && id) {
        imdbID = id.split("-").pop();
    }
    const reqFt = {
        i: imdbID,
        plot: "full"
    }
    const {data} = await MDLMenu.detailMovie(reqFt);
    if (data.Error) {
        return {
            notFound: true
        }
    } else {
        let props = {
            movieDetail: data,
            meta: {
                key: id,
                title: data.Title + " - " + data.Year,
                noindex: false,
                nofollow: false,
                description: data.Title + " - " + data.Plot,
                robotsProps: {}
            }
        }
        return {props}
    }
}

export default MovieDetailPage;
