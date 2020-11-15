import { React, useState } from 'react'
import { Modal, Button } from 'antd'
import { Typography } from 'antd'
import { Divider } from 'antd'
import { Select, Slider, Rate, Checkbox } from 'antd'
import './FilterPopUp.scss'

export default function FilterPopUp(props) {
  const { Option } = Select

  const [sortValue, setSortValue] = useState([false, false, false, false])
  const [visible, setVisible] = useState([false, true])

  function handleSortChange(key, value) {
    setSortValue(
      sortValue.map((item, index) => {
        if (index === key) return value
        else return false
      }),
    )
  }

  const children = []
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    )
  }

  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  function getStyle() {
    return {
      textAlign: 'center',
      borderRadius: '50px',
      height: props.mobile ? '30vh' : '500px',
    }
  }

  function handleOk() {
    setVisible([true, false])
    setTimeout(() => {
      setVisible([false, false])
    }, 3000)
  }

  return (
    <div className="filterpopup">
      <Modal
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
        bodyStyle={getStyle()}
        centered={true}
        width={props.mobile ? '100vw' : '50vw'}
        footer={[
          <Button key="back" onClick={props.handleCancel}></Button>,
          <Button
            key="submit"
            type="primary"
            loading={visible[0]}
            onClick={handleOk}
          ></Button>,
        ]}
      >
        <div className="filterUsers">
          <div className="filterRow">
            <h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Tags: </h4>
            <Select
              mode="tags"
              style={{ width: '50%', margin: '4px', marginRight: '5px' }}
              placeholder="Enter Your Tags"
              onChange={handleChange}
            ></Select>
          </div>
          <div className="filterRow">
            <h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>
              Distance (km):{' '}
            </h4>
            <Slider defaultValue={30} style={{ width: '50%' }} max={1000} />
          </div>
          <div className="filterRow">
            <h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Age: </h4>
            <Slider
              style={{ width: '50%' }}
              range
              step={1}
              min={18}
              max={70}
              defaultValue={[22, 28]}
            />
          </div>
          <div className="filterRow">
            <h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Fame Rate: </h4>
            <div className="fameRate">
              <Rate
                allowHalf
                defaultValue={2.5}
                style={{ fontWeight: '900', color: '#f8a9ac' }}
              />
            </div>
          </div>
          <div className="filterRow">
            <h4 style={{ fontWeight: '900', color: '#5b5b5b' }}>Sort by: </h4>
            <div className="sortBy">
              <Checkbox
                checked={sortValue[0]}
                onChange={() => handleSortChange(0, !sortValue[0])}
              >
                Tags
              </Checkbox>
              <Checkbox
                checked={sortValue[1]}
                onChange={() => handleSortChange(1, !sortValue[1])}
              >
                Distance
              </Checkbox>
              <Checkbox
                checked={sortValue[2]}
                onChange={() => handleSortChange(2, !sortValue[2])}
              >
                Age
              </Checkbox>
              <Checkbox
                checked={sortValue[3]}
                onChange={() => handleSortChange(3, !sortValue[3])}
              >
                Fame Rate
              </Checkbox>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
