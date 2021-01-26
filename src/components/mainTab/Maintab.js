import React, {useContext} from 'react'
import { Tabs } from 'antd';
import './Maintab.css'
import MatcheDisplay from '../matchesDisplay/MatcheDisplay'
import MessageDisplay from '../messageDisplay/MessageDisplay';
import { Badge } from 'antd';
import { useLocation, useHistory } from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext";



const { TabPane } = Tabs;

export default function Maintab() {
    let { state, pathname } = useLocation();
    const history = useHistory();
    const { accountStats } = useContext(UserContext);

	
	const handelDefaultKey = () => {
		if (state)
			return state.desKey;
		return "1";
	}

	const handelTabClick = (location, desKey, mobileKey) => {
		history.push({
				pathname: `${pathname}${location}`,
                state: {
                    mobileKey: mobileKey,
                    desKey: desKey,
                    mobile: false,
                }
		})
    }
    
    return (
        <div className="tabs">
            <Tabs className="tabsstyle" defaultActiveKey={handelDefaultKey} style={{fontWeight: '800'}}>
                <TabPane style={{ height: '100vh', width: '400px'}} tab={
                    <span onClick={() => handelTabClick("", "1", "1")}>Matches <Badge count={accountStats.matches} /></span>} key="1">
                    <MatcheDisplay mobile={false}/>
                </TabPane>
                <TabPane style={{ height: '100vh', width: '400px'}}  tab={
                 <span onClick={() => handelTabClick("", "2", "4")}>Messagees <Badge count={accountStats.messages} /></span>} key="2">
                    <MessageDisplay mobile={false}/>
                </TabPane>
            </Tabs>
        </div>
    )
}
