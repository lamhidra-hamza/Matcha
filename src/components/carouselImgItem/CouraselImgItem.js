import React from 'react'
import { Image } from 'antd'

const contentStyle = {
  height: '40vw',
  color: '#fff',
  lineHeight: '100%',
  textAlign: 'center',
  background: '#364d79',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  maxHeight: "600px",
}

function CouraselImgItem(props) {
  return (
    <div style={contentStyle}>
      <Image width={'100%'} height={'100%'} src={props.link} />
    </div>
  )
}

export default CouraselImgItem
