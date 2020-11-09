import React from 'react';
import {Image} from 'antd';

const contentStyle = {
  height: '50vh',
  color: '#fff',
  lineHeight: '100%',
  textAlign: 'center',
  background: '#364d79',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
};

function CouraselImgItem(props) {
    return (
        <div style={contentStyle}>
                  <Image
                    width={'100%'}
                    height={'51vh'}
                    src={props.link}
                  />
                </div>
    );
}

export default CouraselImgItem;