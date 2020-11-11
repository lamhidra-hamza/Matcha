import React from 'react';
import './EditProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus} from '@fortawesome/free-solid-svg-icons'
import {HeartTwoTone, EyeTwoTone} from '@ant-design/icons';

export default function EditProfile() {
    return (
        <div className = "editProfileContainer">
            <div className = "editProfileCard">
                <div className = "EditProfileInfo">
                    <div className="profileImgs">
                        <div className="profileImgItem">
                            <div className="id">
                                1
                            </div>
                            <div className='add'>
                                <FontAwesomeIcon  icon={faTimes} color="#fd2c7c" />
                            </div>
                            <img alt= "card" className = "img" src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"></img>
                        </div>

                         <div className="profileImgItem">
                             <div className="id">
                                2
                            </div>
                              <div className='add'>
                                <FontAwesomeIcon  icon={faTimes} color="#fd2c7c" />
                            </div>
                            <img alt= "card" className = "img" src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"></img>
                        </div>
                        
                        <div className="profileImgItem">
                            <div className="id">
                                3
                            </div>
                             <div className='add'>
                                <FontAwesomeIcon  icon={faTimes} color="#fd2c7c" />
                            </div>
                            <img alt= "card" className = "img" src="https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg"></img>
                        </div>

                        <div className="profileImgEmpty">
                            <div className="id">
                                4
                            </div>
                              <div className='add'>
                                <FontAwesomeIcon  icon={faPlus} color="#ffffff" />
                            </div>
                        </div>

                         <div className="profileImgEmpty">
                             <div className="id">
                                5
                            </div>
                             <div className='add'>
                                <FontAwesomeIcon  icon={faPlus} color="#ffffff" />
                            </div>
                        </div>
                        
                        <div className="profileImgEmpty">
                            <div className="id">
                                6
                            </div>
                            <div className='add'>
                                <FontAwesomeIcon  icon={faPlus} color="#ffffff" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
