import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';
import './styles/spinner.css';

export function Spinner() {
    return (
        <div className="App-header">
            <div className="rolling">
                <div className='spinner fadein'>
                    <FontAwesomeIcon icon={faBowlingBall} size='5x' color='#f5821d' />
                </div>
            </div>
        </div>
    )
}
  