import React from 'react';
import Popup from './popup.js';
import './styles/accountHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import logo from './images/agoda-logo.png';

/**
* @class AccountHeader
* @desc Header component after sign in to the application
*/
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

    /**
    * @function hidePopup
    * @desc Function to hide the popup
    */
    hidePopup() {
        this.setState({showSignOutPopup:false});
    }

    /**
    * @function onAccountClick
    * @desc Steps to show the sign out popup on click of the username
    * @param {Event} event click event
    */
    onAccountClick(event) {
        event.stopPropagation();
        if(this.props.showPopup) {
          let currentState = this.state.showSignOutPopup;
          this.setState({showSignOutPopup:!currentState});
        }
    }

    /**
    * @function signOut
    * @desc Allow the onLogoutClicked props to be called on click of Sign out
    */
    signOut(){
        this.setState({showSignOutPopup:false});
        this.props.onLogoutClicked();
    }

    render(){
        return(
            <div className="header row">
                <div className="hotel-image">
                    {/* <FontAwesomeIcon icon={faStore} size='2x' color="#f08216"/> */}
                    <img className="image-logo" src={logo}/>
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