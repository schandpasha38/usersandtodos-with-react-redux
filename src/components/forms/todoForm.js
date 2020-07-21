import React from 'react';
import { Form, Input, DatePicker } from 'antd';

export const TodoForm = ({ form }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
                modifier: 'public',
            }}
        >
            <Form.Item
                name="action"
                label="Action"
                rules={[
                    {
                        required: true,
                        message: 'Please Add date and time',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="dateadded"
                label="Dateadded"
                rules={[
                    {
                        required: true,
                        message: 'Please Add date and time',
                    },
                ]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>

        </Form>
    );
};