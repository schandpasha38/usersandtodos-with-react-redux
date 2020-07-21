import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Todo from './components/todo';
import User from './components/user';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const App = (props) => {
  return (
    <div className="App">
      <h1>Todos And Users</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Todos" key="todo">
          <Todo />
        </TabPane>
        <TabPane tab="Users" key="users">
          <User />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default App;