import React from 'react';
import './MatcheDisplay.scss';
import MatchaCard from '../matchCard/MatchCard';

export default function MatcheDisplay() {
    return (
        <div className="Matches-Container">
            <MatchaCard />
            <MatchaCard />
            <MatchaCard />
            <MatchaCard />
            <MatchaCard />
            <MatchaCard />
            <MatchaCard />
        </div>
    )
}
