import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './styles/spinner.css';

export function ErrorOccurred() {
    return (
        <div className="App-header">
            <div className="rolling">
                <div className='spinner fadein'>
                    <FontAwesomeIcon icon={faFrown} size='5x' color='#f5821d' />
                    An Error occurred while processing. Please try again later
                </div>
            </div>
        </div>
    )
}