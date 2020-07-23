import React, { useState } from 'react';
import { Button } from 'antd';
import { Modal, Form } from 'antd';
import { useDispatch } from 'react-redux'
import { TodoForm } from '../forms/todoForm';
import { UserFrom } from '../forms/userForm';

const PopupModal = ({ addType, addTodo, addUser, data }) => {
    const dispatch = useDispatch();
    
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onCreate = values => {
        console.log(values)
        setLoading(true)
        async function wait(duration = 1000) {
            await new Promise(resolve => setTimeout(resolve, duration));
        }
        wait(2000).then(() => {
            if (addType === "Todo") {
                const fieldsValue = {
                    ...values,
                    dateadded: values["dateadded"].format("DD-MM-YYYY HH:mm")
                };
                console.log(fieldsValue)
                dispatch(addTodo(fieldsValue));
            } else {
                dispatch(addUser(values));
                console.log("Received values of Todo form: addUser", values);
            }
            setLoading(false)
            setVisible(false);
        })
    };

    return (
        <div>
            <Modal
                visible={visible}
                title={`Add New ${addType}`}
                okText={`Add New ${addType}`}
                cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                loading={loading}
                footer={[
                    <Button key="back" onClick={() => {
                        setVisible(false);
                    }}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form
                                .validateFields()
                                .then(values => {
                                    form.resetFields();
                                    onCreate(values);
                                })
                                .catch(info => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                    >
                        Save
                    </Button>
                ]}
            >
                {addType === "Todo" ? (
                    <TodoForm form={form} />
                ) : (
                        <UserFrom form={form} />
                    )}

            </Modal>
            <Button
                style={{ margin: '10px 5px' }}
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                className="primary-button"
            >
                {`Add New ${addType}`}
            </Button>
        </div >
    );
};

export default PopupModal