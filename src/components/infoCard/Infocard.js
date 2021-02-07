import React from 'react'
import { Carousel, Tag, Divider, Button } from 'antd'
import {
  EnvironmentTwoTone,
  HeartTwoTone,
  MinusCircleTwoTone,
} from '@ant-design/icons'
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import './InfoCard.css'
import { SER } from '../../conf/config'
import { calculate_age } from '../../tools/globalFunctions'


const Infocard = (props) => {
  const { user, userImages, tags } = props;
  const images = [
		  userImages.picture_1,
		  userImages.picture_2,
		  userImages.picture_3,
		  userImages.picture_4,
      userImages.picture_5];
    
  const info = {
    firstName: 'Amal',
    age: 20,
    distance: '14',
    tags: ['sport', 'singing', 'Netflix', 'Travel', 'Dance', 'swiming'],
    status:
      "Hey I'm looking for new frindes ksdjf kjsdf adsfsdklfj sdfjkasdkfjskjdf asdkjfakjdsf asdkjfkasdjf asdlfkjasf lakjsdf!",
    images: [
      'https://i.pinimg.com/originals/1a/20/b2/1a20b2ad94d5b6d6a25565c3ccc61ece.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQScNAkshkRSpAWT0Qv-Mzrw5mUVSls-tGJ7g&usqp=CAU',
      'https://i.pinimg.com/474x/66/94/7d/66947da4b8bba10226afd00ae5fa7eaa.jpg',
    ],
  }

  const { state } = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const editButtonClick = () => {
      history.push({
              pathname: `${match.url}/edit`,
              state: {
                mobileKey: "5",
                desKey: "1",           
                mobile: props.mobile,
              }
      })
  }

  return (
    <div className="rightSideCard">
      <div className="infoCardContainer">
        <div className="infoPage">
          <Carousel dotPosition={'top'}>
            {images.map((image, index) => (
				    image &&
              <div className="fiximg" key={image}>
                <img alt="img-card" className="imgCard" src={`${SER.PicPath}/${image}`} />
              </div>
            ))}
          </Carousel>
          <div className="rowboxCard" style={{ marginTop: '15px' }}>
            <h2 className="fisrtNameCard"> {user.firstName}</h2>
            <h4 style={{ margin: '10px' }} className="smallfontCard">
              {calculate_age(user.bornDate)}
            </h4>
          </div>
          <div className="rowboxCard">
            <EnvironmentTwoTone style={{ fontSize: '1.7rem' }} />
            <h4 className="smallfontCard" style={{ color: '#a3a3a3' }}>
              {info.distance} kilometers away
            </h4>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'space-between',
              marginRight: '15px',
              marginLeft: '15px',
            }}
          >
            {tags.map((tag) => (
              <Tag
                color="blue"
                style={{
                  height: '25px',
                  width: '70px',
                  fontSize: '120%',
                  marginTop: '5px',
                  padding: '2px 0px',
                  textAlign: 'center',
                }}
              
              key = {tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <Divider orientation="center">Status</Divider>
          <div className="rowboxCard">
            <h4 style={{ color: '#939292', fontSize: '1.3rem' }}>
              {user.biography}
            </h4>
          </div>
          <Divider />
        </div>

        <div className="personReactions">
          { state && state.mobileKey === "5" ?
            <Button shape="round" className={'editProfileBtn'} onClick={editButtonClick}>
            Edit Profile
            </Button> : 
            <><div className="likePerson">
                <MinusCircleTwoTone  twoToneColor="#f70025"/>
            </div>
            <div className="likePerson">
                <HeartTwoTone twoToneColor="#0cce8a" />
            </div></> }
        </div>
      </div>
    </div>
  )
}

export default Infocard
