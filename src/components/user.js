import React, { useState, useEffect } from 'react';
import { Table, Input, Popconfirm, Form, Divider } from 'antd';
import {
    addUser,
    editUser,
    deleteUser
} from "./redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import PopupModal from './model/modal';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    console.log(dataIndex)
    const inputNode = inputType === 'email' ? <Input /> : <Input />;
    const inputValType = dataIndex === 'email' ? "email" : null
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                            type: inputValType
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const User = (props) => {

    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        setData(users)
    }, [users])

    const [form] = Form.useForm();
    const [data, setData] = useState(users);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            name: '',
            email: '',
            ...record
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const saveUser = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
                dispatch(editUser(index, row))
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '40%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '40%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => saveUser(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                  </a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => dispatch(deleteUser(record.key))}
                            >
                                <a>Delete</a>
                            </Popconfirm>
                        </div>
                    );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'email' ? 'email' : 'name',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <PopupModal data={data} addType={"User"} addUser={addUser} />
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
}

export default User;
