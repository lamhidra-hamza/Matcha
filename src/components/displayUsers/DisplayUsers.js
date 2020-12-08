import { React, useState } from 'react';
import './DisplayUsers.scss';
import UserCard from '../userCard/UserCard.js';
import { Tooltip } from 'antd';
import FilterPopUp from '../filterPopUp/FilterPopUp';
import { ControlOutlined } from '@ant-design/icons';

const DisplayUsers = () => {
  const [filterVisible, SetFilterVisible] = useState([false, false])

  function showLogin() {
    SetFilterVisible([!filterVisible[0], filterVisible[1]])
  }

  function showRegister() {
    SetFilterVisible([filterVisible[0], !filterVisible[1]])
  }

  function handleCancel() {
    SetFilterVisible([false, false])
  }
  return (
    <div className="DusersContainer">
      <div className="filter">
        <div className="filterButton" >
        <Tooltip title="Filter">
          <ControlOutlined onClick={showRegister} style={{fontSize: '40px', color: "#ff75a7"}}/>
        </Tooltip>
      </div>
      </div>
      <div className="dusersContent">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <FilterPopUp
        visible={filterVisible[1]}
        handleCancel={handleCancel}
        mobile={true}
      />
    </div>
  )
}

export default DisplayUsers
