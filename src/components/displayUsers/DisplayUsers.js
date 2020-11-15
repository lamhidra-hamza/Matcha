import { React, useState } from 'react'
import './DisplayUsers.scss'
import UserCard from '../userCard/UserCard.js'
import { Select, Slider, Rate, Checkbox } from 'antd'
import FilterPopUp from '../filterPopUp/FilterPopUp'

const DisplayUsers = () => {
  const [filterVisible, SetFilterVisible] = useState([false, true])

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
        mobile={false}
      />
    </div>
  )
}

export default DisplayUsers
