import React from 'react';
import { Form, Input } from 'antd';

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
                        message: 'Please Add Todo with min 5 characters',
                        min: 5
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
                <Input required type="datetime-local" />
            </Form.Item>

        </Form>
    );
};