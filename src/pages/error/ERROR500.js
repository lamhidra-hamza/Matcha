import React from 'react'
import { useHistory } from 'react-router-dom'
import { Result, Button } from 'antd';

const ERROR500 = () => {

    const history = useHistory();

    const handleBackClick = () => {
        history.push('/app');        
    }

    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button onClick={handleBackClick} type="primary">Back Home</Button>}
        />
    )
}

export default ERROR500
