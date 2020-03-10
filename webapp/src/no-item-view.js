import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './styles/no-item-view.css';

export default class NoItemView extends React.Component{
    render(){
        return(
            <div className="no-item-view column">
                <FontAwesomeIcon icon={faFrown} size='10x' color='#f5821d' />
                  No item to show
            </div>
        )
    }
}