import React, {useState} from "react";
import moment from "moment";
import {dataType} from "@/constants/data";
import {Button, Checkbox, Col, Form, Input, Row, DatePicker} from "antd";
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import styles from "./styles.module.scss"

export interface Props {
    loading: boolean
    onSearchMovie: (values: any) => void
}

export const WrapSearchMovie = (props: Props) => {
    const [type, setType] = useState("");

    const {loading, onSearchMovie} = props;

    const [form] = Form.useForm();

    const onChangeType = (e: CheckboxChangeEvent) => {
        let value;
        if (e.target.checked) {
            value = e.target.value;
        } else {
            value = undefined;
        }
        setType(value);
        form.setFieldsValue({
            itemType: value
        });
    }

    return (
        <>
            <div className={styles["formSearchMovie"]}>
                <h2 className={styles["title"]}>Search by</h2>
                <Form onFinish={onSearchMovie}
                      form={form}
                      size="large"
                      name="formSearchMovie">
                    <Form.Item label="Title"
                               name="itemTitle"
                               rules={[{required: true, message: "Please enter title"},
                                   {whitespace: true, message: "Please enter title"}]}>
                        <Input maxLength={500} placeholder="Title"/>
                    </Form.Item>
                    {" "}
                    <Form.Item label="Type" name="itemType" hidden={true}><Input type="text"/></Form.Item>
                    {" "}
                    <div className="label-custom">Type</div>
                    {" "}
                    <Row>
                        {
                            dataType().map((item) => {
                                return (
                                    <Col key={item.label} span={24}>
                                        <Checkbox
                                            onChange={onChangeType}
                                            checked={item.value == type}
                                            value={item.value}>
                                            {item.value}
                                        </Checkbox>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    {" "}
                    <Form.Item label="Year"
                               name="itemYear">
                        <DatePicker picker="year" disabledDate={(current: any) => {
                            return current && current > moment().endOf('day');
                        }}/>
                    </Form.Item>
                    {" "}
                    <Form.Item className="wrap-form-action">
                        <div className="box-button-event">
                            <Button loading={loading}
                                    className="btn-accept"
                                    htmlType="submit">
                                <span>Search</span>
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default WrapSearchMovie
