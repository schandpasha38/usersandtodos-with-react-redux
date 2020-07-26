import React from 'react';
import { Form, Input } from 'antd';

export const UserFrom = ({ form }) => {
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
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please Enter Name with min 5 characters',
                        min: 5
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please Enter Validate Email!',
                        type: 'email'
                    },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>

        </Form>
    );
};