import React from 'react';
import AccountHeader from './accountHeader.js';
import './styles/hotelInfo.css';
import {ListViewToggle, TileViewToggle} from './view-toggle.js';
import ItemsView from './item-view.js';
import logo from './images/hotel-img.jpeg';
import ModalContainer from './modal-container.js';
import {isNil, isEmptyObject} from './utils.js';
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
            modalData : {},
            mainContainerStyle: {},
            preventSetState : false
        }
        this._handleScroll = this._handleScroll.bind(this);
        this._handleSwitchViewType = this._handleSwitchViewType.bind(this);
        this._performAction = this._performAction.bind(this);
        this._handleModal = this._handleModal.bind(this);
        this._onAddNewClicked = this._onAddNewClicked.bind(this);
    }

    _handleModal(){
        this.setState({
            showModal : false
        })
    }

    _showModal(modalType, id = null) {
        let tempData = {};
        if(!isNil(id)){
            for(let i in mockItems){
                if(mockItems[i].id === id){
                    tempData = mockItems[i];
                break;  
            }
            }
            this.setState({
                showModal: true,
                toDisplayModal: modalType,
                preventSetState: false,
                modalData : tempData
            });
        }
        else{
            this.setState({
                showModal: true,
                toDisplayModal: modalType,
                preventSetState: false,
                modalData : tempData
            });
        }
    }

    _performAction(action, id){
        switch(action){
            case "Edit":
                this._showModal(action, id);
                break;
            case "Delete":
                this._showModal(action, id);
                break;
            case "Add":
                this._showModal("Edit");
        }
    }

    _onAddNewClicked(){
        this._performAction("Add");
    }

    _handleSwitchViewType(selectedViewType){
        this.setState({selectedViewType: selectedViewType, preventSetState: false});
    }

    _getBody() {
        return document.body;
    }

    _handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = this._getBody();
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const {
          mainContainerStyle =  {},
        } = this.state;
    
        if(body.scrollTop < 60) {
          if (mainContainerStyle.position !== "absolute") {
            this.setState({
              mainContainerStyle : {position: "absolute"},
              preventSetState : true
            }); 
          }
        }
        else {
          if (mainContainerStyle.position === "absolute") {
            this.setState({
              mainContainerStyle : {position: "fixed", top: 0},
              preventSetState : true
            });
          }
        }
      }

    componentDidMount(){
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    render(){
        let itemsView = "";
        const background = (this.state.selectedViewType === "TileView") ? 'content-container--greybg' : 'content-container--whitebg';
        itemsView = (<ItemsView viewType={this.state.selectedViewType} items={mockItems} performAction={this._performAction}/>);
    return(
        <div>
            {
                this.state.showModal ? <ModalContainer toDisplay={this.state.toDisplayModal} modalData={this.state.modalData} handleModal={this._handleModal}/> : null
            }
            <AccountHeader email="elakya" showPopup/>
            <div className="main-container" style={this.state.mainContainerStyle}>
                <div className="container-gradient"></div>
                <div className="container-under-banner"></div>
                <div className="content column">
                    <div className="widget-div"></div>
                    <div className="title-div">
                        <div className="main-ui-icon"></div>
                        <div className="main-ui-title"><b>Hotel Management Tool</b></div>
                    </div>
                    <div className="row add-item-widget">
                        <div className="hotel-widget1 background"></div>
                        <div className="hotel-widget2 background"></div>
                        <div className="hotel-widhet3 background"></div>
                        <div className="hotel-widhet4 background"></div>
                        <div className="hotel-widhet5 background"></div>
                        <div className="add-item">
                            <div className="add-new">
                                <div className="icn-container" onClick={this._onAddNewClicked}></div>
                            </div>
                        </div>
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