import React from 'react';
import Popup from './popup.js';
import './styles/accountHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';


class AccountHeader extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            showSignOutPopup:false
        };
        this.hidePopup = this.hidePopup.bind(this);
    }

    componentDidMount() {
        // Hide popup on click outside the block
        window.addEventListener('click', this.hidePopup, false);
    }
    
    componentWillUnmount() {
        // Remove click event listener on component unmount
        window.removeEventListener('click', this.hidePopup, false);
    }

    hidePopup() {
        this.setState({showSignOutPopup:false});
    }

    onAccountClick(event) {
        event.stopPropagation();
        if(this.props.showPopup) {
          let currentState = this.state.showSignOutPopup;
          this.setState({showSignOutPopup:!currentState});
        }
    }

    signOut(){
        this.setState({showSignOutPopup:false});
        this.props.onLogoutClicked();
        //
    }

    render(){
        return(
            <div className="header row">
                <div className="hotel-image">
                    <FontAwesomeIcon icon={faHotel} size='2x' color="#f08216"/>
                </div>
                <div className='column popup-container'>
                    <div className="account-name" onClick={(e) => this.onAccountClick(e)}>{this.props.email}</div>
                    {this.state.showSignOutPopup ? <Popup onClick={() => this.signOut()} ><span id="sign-out">Sign out</span></Popup> : null}
                </div>
            </div>
        )
    }
}
export default AccountHeader;