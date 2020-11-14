import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import './profileImgEmpty.scss'

export default function ProfileImgEmpty(props) {
  return (
    <div className= {`${props.view}profileImgEmpty`}>
      <div className="id">4</div>
      <div className="add">
        <FontAwesomeIcon icon={faPlus} color="#ffffff" />
      </div>
    </div>
  )
}
