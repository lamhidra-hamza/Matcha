import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import NotFound from '../pages/error/NotFound';
import { ErrorStatusContext } from '../contexts/ErrorContext';


const ErrorHandler = ({ children }) => {
    const history = useHistory();
    const [httpCodeStatus, setHttpCodeStatus] = useState();

    useEffect(() => {
        
        const unlisten = history.listen(() => setHttpCodeStatus(undefined));

        return unlisten;
    }, [])

    const renderContent = () => {
        if (httpCodeStatus === 404) {
            return <NotFound />
        }

        return children;
    }

    const contextPayload = React.useMemo(
        () => ({ setHttpCodeStatus }), 
        [setHttpCodeStatus]
      );

    return (
        <ErrorStatusContext.Provider value={ contextPayload }>
            {renderContent()}
        </ErrorStatusContext.Provider>
    )
}

export default ErrorHandler
