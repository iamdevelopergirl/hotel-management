import React from 'react';
import AccountHeader from './accountHeader.js';
import './styles/hotelInfo.css';
import {ListViewToggle, TileViewToggle} from './view-toggle.js';
import ItemsView from './item-view.js';
import logo from './images/hotel-img.jpeg';
import ModalContainer from './modal-container.js';

const mockItems = 
    [{
        id : "1",
        name : "Hotel1",
        address : "Hotel1 Adreess",
        image : logo
    },
    {
        id : "2",
        name : "Hotel2",
        address : "Hotel2 Adreess",
        image : logo
    },
    {
        id : "3",
        name : "Hotel3",
        address : "Hotel3 Adreess",
        image : logo
    },
    {
        id : "4",
        name : "Hotel4",
        address : "Hotel4 Adreess",
        image : logo
    },
    {
        id : "5",
        name : "Hotel4",
        address : "Hotel4 Adreess",
        image : logo
    },
    {
        id : "6",
        name : "Hotel4",
        address : "Hotel4 Adreess",
        image : logo
    }];

class HotelInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedViewType : "TileView",
            showModal : false,
            toDisplayModal : "Edit",
            preventSetState : false,
            modalData : {}
        }
        this._handleSwitchViewType = this._handleSwitchViewType.bind(this);
        this._performAction = this._performAction.bind(this);
    }

    _showModal(id, modalType) {
        this.setState({
          showModal: true,
          toDisplayModal: modalType,
          preventSetState: false
        });
    }

    _performAction(id, action){
        switch(action){
            case "Edit":
                this._showModal(id, action);
                break;
            case "Delete":
                break;
        }
    }

    _handleSwitchViewType(selectedViewType){
        this.setState({selectedViewType: selectedViewType, preventSetState: false});
    }

    render(){
        let itemsView = "";
        const background = (this.state.selectedViewType === "TileView") ? 'content-container--greybg' : 'content-container--whitebg';
        itemsView = (<ItemsView viewType={this.state.selectedViewType} items={mockItems} performAction={this._performAction}/>);
    return(
        <div className="hotel-container column">
            {
                this.state.showModal ? <ModalContainer toDisplay={this.state.toDisplayModal} /> : null
            }
            <div className="header">
                <AccountHeader email="elakya" showPopup/>
            </div>
            <div className="main-container">
                <div className="container-gradient"></div>
                <div className="container-under-banner"></div>
                <div className="content column">
                    <div className="widget-div"></div>
                    <div className="title-div">
                        <div className="main-ui-icon"></div>
                        <div className="main-ui-title"><b>Hotel Management Tool</b></div>
                    </div>
                    <div className="row add-login-widget">
                        <div className="login-widget"></div>
                        <div className="favorites-widget"></div>
                        <div className="add-item-widget"></div>
                    </div>
                    <div className="search-toggle-container">
                        <div className="search-box">
                            <div className="search-container">
                                <input type="text" className="search-box" placeholder="Search" maxLength="100"/>
                                <button className="search-ico" alt="search-ico"></button>
                            </div>
                        </div> 
                        <div className="view-toggle-container margin-left-2">
                                <ListViewToggle selectedViewType={this.state.selectedViewType}
                                setViewType={this._handleSwitchViewType}/>
                                <TileViewToggle selectedViewType={this.state.selectedViewType}
                                setViewType={this._handleSwitchViewType}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`content-container ${background}`}>
                <div className="items-container" style={this.state.selectedViewType === "TileView" ? {backgroundColor:"#f8f8f8"}: {backgroundColor: "#ffffff"}}>
                    {itemsView}
                </div>
            </div>
        </div>
    );
    }
}
export default HotelInfo;