import React from 'react'
import { useHistory } from 'react-router-dom'

import './NotFound.scss'
import { Result, Button } from 'antd';


const NotFound = () => {

    const history = useHistory();

    const handleBackClick = () => {
        history.push('/app');        
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBackClick} >Back Home</Button>}
        />
    )
}

export default NotFound
