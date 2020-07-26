import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Todo from './components/todo';
import User from './components/user';
import './app.css'

import { UserAddOutlined, FormOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const App = (props) => {
  return (
    <div className="home-section">
      <div className="home-container">
        <div className="home-title">
          <h1>Todos And Users</h1>
        </div>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab={<span><FormOutlined />Todos</span>} key="todo">
            <Todo />
          </TabPane>
          <TabPane tab={<span><UserAddOutlined />Users</span>} key="users">
            <User />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default App;