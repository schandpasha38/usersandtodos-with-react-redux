import React, { useState, useEffect } from "react";
import { Table, Input, Popconfirm, Form, Divider } from 'antd';
import {
  addTodo,
  deleteTodo,
  editTodo,
} from "./redux/actions/todoActions";
import { useSelector, useDispatch } from "react-redux";
import PopUpModal from './model/modal';

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
  const inputNode = inputType === 'dateadded' ? <Input required type="datetime-local" value={record[dataIndex]}/> : <Input type="text"/>;
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

const Todo = (props) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    setData(todos)
  }, [todos])


  useEffect(() => {
    console.log('mounted')
  }, []);

  const [form] = Form.useForm();
  const [data, setData] = useState(todos);
  const [editingKey, setEditingKey] = useState('');


  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      action: '',
      dateadded: '',
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const saveTodo = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        dispatch(editTodo(index, row))
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
      title: 'Action',
      dataIndex: 'action',
      width: '40%',
      editable: true,
    },
    {
      title: 'DateAdded',
      dataIndex: 'dateadded',
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
              onClick={() => saveTodo(record.key)}
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
                onConfirm={() => dispatch(deleteTodo(record.key))}
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
        inputType: col.dataIndex === 'dateadded' ? 'dateadded' : 'action',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <div>
      <PopUpModal data={data} addType={"Todo"} addTodo={addTodo} />
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
};

export default Todo;
