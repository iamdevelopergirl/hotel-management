import React from 'react';
import Popup from './popup.js';
import './styles/accountHeader.css';

class AccountHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSignOutPopup:false
        };
    }

    componentDidMount() {
        // Hide popup on click outside the block
        window.addEventListener('click', this.hidePopup.bind(this), false);
    }
    
    componentWillUnmount() {
        // Remove click event listener on component unmount
        window.removeEventListener('click', this.hidePopup.bind(this), false);
    }

    hidePopup() {
        this.setState({showSignOutPopup:false});
    }

    onAccountClick(event) {
        event.stopPropagation();
        if(this.props.showPopup) {
          var currentState = this.state.showSignOutPopup;
          this.setState({showSignOutPopup:!currentState});
        }
    }

    signOut(event){
        this.setState({showSignOutPopup:false});
    }

    render(){
        return(
            <div className="header row">
                <div className='column popup-container'>
                    <div className="na-account" onClick={(e) => this.onAccountClick(e)}>{this.props.email}</div>
                    {this.state.showSignOutPopup ? <Popup onClick={() => this.signOut()} ><span id="sign-out">Sign out</span></Popup> : null}
                </div>
            </div>
        )
    }
}
export default AccountHeader;