import React from 'react';
import './MatcheDisplay.scss';
import MatchaCard from '../matchCard/MatchCard';

export default function MatcheDisplay(props) {
    return (
        <div className="Matches-Container">
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
            <MatchaCard mobile={props.mobile}/>
        </div>
    )
}
