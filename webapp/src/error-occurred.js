import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './styles/spinner.css';

/**
* @function ErrorOccurred
* @desc Component to show error occurred message for every error
*/
export function ErrorOccurred() {
    return (
        <div className="App-header">
            <div className='spinner fadein'>
                <FontAwesomeIcon icon={faFrown} size='5x' color='#f5821d' />
            </div>
        </div>
    )
}