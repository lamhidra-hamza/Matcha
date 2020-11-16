import React from 'react'
import './EditProfile.scss'
import ProfileImgItem from '../profileImgItem/profileImgItem'
import ProfileImgEmpty from '../profileImgIEmpty/profileImgIEmpty'
import { Slider, Input, Select, Button } from 'antd'
import { useHistory } from 'react-router-dom'

export default function EditProfile(props) {
  const history = useHistory();

  const handleChange = () => {
    console.log('done')
  }
  const { Option } = Select

  const saveButtonClick = () => {
    history.goBack();
  }
  const currentView = props && props.mobile ? 'mobile' : '';

  return (
    <div className={`${currentView}editProfileContainer`}>
      <div className="editProfileCard">
        <div className="EditProfileInfo">
          <div className="profileImgs">
            <ProfileImgItem view={`${currentView}`} />
            <ProfileImgItem view={`${currentView}`} />
            <ProfileImgItem view={`${currentView}`} />
            <ProfileImgEmpty view={`${currentView}`} />
            <ProfileImgEmpty view={`${currentView}`} />
          </div>

          <div className="profileInfoConatainer">
            <div className="accountSet">
              <h2 className="setTitle">ACCOUNT SETTINGS</h2>
              <div className="setBox rowsetBox">
                <h3 className="boxParam">Email</h3>
                <Input
                  placeholder="amal@gmail.com"
                  style={{
                    height: '2vh',
                    borderRadius: '10px',
                    width: '200px',
                    border: '0px',
                    textAlign: 'right',
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Password</h3>
                <Input
                  placeholder="........"
                  style={{
                    height: '2vh',
                    borderRadius: '10px',
                    width: '200px',
                    border: '0px',
                    textAlign: 'right',
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">First Name</h3>
                <Input
                  placeholder="Amal"
                  style={{
                    height: '2vh',
                    borderRadius: '10px',
                    width: '200px',
                    border: '0px',
                    textAlign: 'right',
                  }}
                />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Last Name</h3>
                <Input
                  placeholder="bentbaha"
                  style={{
                    height: '2vh',
                    borderRadius: '10px',
                    width: '200px',
                    border: '0px',
                    textAlign: 'right',
                  }}
                />
              </div>
            </div>
            <div className="accountSet">
              <h2 className="setTitle">DISCOVERY SETTINGS</h2>
              <div className="setBox rowsetBox">
                <h3 className="boxParam">Location</h3>
                <h3 className="boxValue">Marrakech, Morocco</h3>
              </div>
              <div className="setBox columnsetBox borderTopNone">
                <div className="rowsetBox">
                  <h3 className="boxParam">Maximun Distance</h3>
                  <h3 className="boxValue">11 km.</h3>
                </div>
                <Slider defaultValue={30} />
              </div>
              <div className="setBox borderTopNone rowsetBox">
                <h3 className="boxParam">Looking for</h3>
                <Select
                  defaultValue="lucy"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="men">Men</Option>
                  <Option value="lucy">Women</Option>
                  <Option value="Yiminghe">Men & Women</Option>
                </Select>
              </div>
              <div className="setBox borderTopNone columnsetBox">
                <div className="rowsetBox">
                  <h3 className="boxParam">Age Range</h3>
                  <h3 className="boxValue">18-39</h3>
                </div>
                <Slider
                  range
                  step={1}
                  min={18}
                  max={39}
                  defaultValue={[22, 28]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="floatBtn">
          <Button shape="round" className={`${currentView}saveProfileBtn`} onClick={saveButtonClick}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
