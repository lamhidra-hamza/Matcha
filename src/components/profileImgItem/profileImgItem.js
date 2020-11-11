import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import './profileImgItem.scss'

export default function ProfileImgItem() {
  return (
    <div className="profileImgItem">
      <div className="id">1</div>
      <div className="add">
        <FontAwesomeIcon icon={faTimes} color="#fd2c7c" />
      </div>
      <img
        alt="card"
        className="img"
        src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"
      ></img>
    </div>
  )
}
