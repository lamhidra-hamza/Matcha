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
  const { user, userImages, tags, userLocation } = props;
  const images = [
		  userImages.picture_1,
		  userImages.picture_2,
		  userImages.picture_3,
		  userImages.picture_4,
      userImages.picture_5];
  
  const { state, pathname } = useLocation();
  const pathArr = pathname.split("/");
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
              <div className="fiximg" key={index}>
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
              {userLocation?.location_name ? userLocation?.location_name : ""}
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
            {tags.map((tag, index) => (
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
              
                key = {index}>
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
          { (state && state.mobileKey === "5") ||  (pathArr.length > 2 && pathArr[1] === "app" 
              && ["profile"].includes(pathArr[2].toLowerCase()) )?
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
