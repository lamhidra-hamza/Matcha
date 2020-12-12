import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './profileImgItem.scss'

export default function ProfileImgItem(props) {
  return (
    <div className={`${props.view}profileImgItem`}>
      <div className="id">{props.id + 1}</div>
      <div className="add">
        <FontAwesomeIcon icon={faTimes} color="#fd2c7c" onClick = {props.clear}/>
      </div>
      <img
        alt="card"
        className="img"
        src={props.link}
      ></img>
    </div>
  )
}
