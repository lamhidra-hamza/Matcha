import './MobileProfileProfile.scss'
import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined, ToolFilled, EditFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function MobileProfileProfile() {

  return (
    <div className="topSections">
      <div className="profileInfoSec">
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"
        />
        <h2 style={{ fontWeight: '600' }}>Amal 22</h2>
        <h4>Student</h4>
        <h4>1337</h4>
      </div>
      <div className="profilebtn">
        <div className="ColumnIc">
          <div className="profSettings cycleBorder">
            <ToolFilled style={{ color: '#5c5c5c' }} />
          </div>
          <Link to="app/mobile/settings">
            <h4>Settings</h4>
          </Link>
        </div>
        <div className="ColumnIc">
          <div className="profEdit cycleBorder">
            <EditFilled style={{ color: '#5c5c5c' }} />
          </div>
          <Link to="app/mobile/editprofile">
            <h4>Edit</h4>
          </Link>
        </div>
      </div>
    </div>
  )
}
