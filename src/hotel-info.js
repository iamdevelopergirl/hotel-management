import React from 'react';
import AccountHeader from './account-header.js';
import './styles/hotelInfo.css';
import {ListViewToggle, TileViewToggle} from './view-toggle.js';
import ItemsView from './item-view.js';
import ModalContainer from './modal-container.js';
import {isNil, isFormDataObject} from './utils.js';
import axios from 'axios';
import {Spinner} from './spinner.js';
import Pagination from './pagination.js';
import {ErrorOccurred} from './error-occurred.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons';


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
            preventSetState : false,
            hotelItems : this.props.hotelItems,
            modalKey : "",
            uploading : this.props.uploading,
            errorOccurred : false
        }
        this._handleScroll = this._handleScroll.bind(this);
        this._handleSwitchViewType = this._handleSwitchViewType.bind(this);
        this._performAction = this._performAction.bind(this);
        this._handleModal = this._handleModal.bind(this);
        this._onAddNewClicked = this._onAddNewClicked.bind(this);
    }

    _handleModal(payload){
        this.setState({
            showModal : false
        });
        if(!isNil(payload)){
            this.setState({
                uploading : true
            });
            if(this.state.hotelItems.length === 0){
                this._addHotelItem(payload.modalData);
            }
            else{
                let objToAddOrUpdate = this.state.hotelItems.find((item) => {
                    return Object.keys(item)[0] === payload.searchKey
                });
                if(isNil(objToAddOrUpdate)){
                    this._addHotelItem(payload.modalData);
                }
                else{
                    this._updateHotelItem(payload.modalData, payload.searchKey);
                }
            }    
        }
    }

    async _addItem(data){
       return await axios.post("/api/hotel", data); 
    }

    async _updateItem(id, data){
        return await axios.put(`/api/hotel/${id}`, data); 
    }

    async _deleteItem(id){
        return await axios.delete(`/api/hotel/${id}`)
    }

    async _addHotelItem(objToUpdate){
        let data = objToUpdate;
        let res = await this._addItem(data);
        if(!isNil(res.status) && res.status === 201){
            this.props.updateItems();
        }
        else{
            this.setState({
                errorOccurred : true
            });
        }
    }

    async _updateHotelItem(objToUpdate, searchKey){
        let response = null;
        if(!isFormDataObject(objToUpdate)){
            response = await this._deleteItem(searchKey);
        }
        else{
            let data = objToUpdate;
            response = await this._updateItem(searchKey, data)
        }
        if(!isNil(response.status) && response.status === 200){
            this.props.updateItems();
        }
        else{
            this.setState({
                errorOccurred : true
            });
        }
    }

    _showModal(modalType, id = null) {
        let tempData = {};
        if(!isNil(id)){
            tempData = this.state.hotelItems.find((item) => {
                    return Object.keys(item)[0] === id
            });
            this.setState({
                showModal: true,
                toDisplayModal: modalType,
                preventSetState: false,
                modalData : tempData[id],
                modalKey : id
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
        const body = this._getBody();
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

    componentWillReceiveProps(nextProps) {
        this.setState({ hotelItems: nextProps.hotelItems });  
    }

    componentDidMount(){
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    render(){
        const { uploading, errorOccurred } = this.state;
        switch(true){
            case uploading:
                return <Spinner />
            case errorOccurred:
                return <ErrorOccurred />;
        }
        let itemsView = "";
        const background = (this.state.selectedViewType === "TileView") ? 'content-container--greybg' : 'content-container--whitebg';
        itemsView = (<ItemsView viewType={this.state.selectedViewType} items={this.state.hotelItems} performAction={this._performAction}/>);
    return(
        <div>
            {
                this.state.showModal ? <ModalContainer toDisplay={this.state.toDisplayModal} modalData={this.state.modalData} modalKey={this.state.modalKey} handleModal={this._handleModal}/> : null
            }
            <AccountHeader email="elakya" onLogoutClicked={this.props.onLogoutClicked} showPopup/>
            <div className="main-container" style={this.state.mainContainerStyle}>
                <div className="container-gradient"></div>
                <div className="container-under-banner"></div>
                <div className="content column">
                    <div className="widget-div"></div>
                    <div className="title-div">
                        <div className="main-ui-icon">
                            <FontAwesomeIcon icon={faHatCowboy} size='5x' color="white"/>
                        </div>
                        <div className="main-ui-title"><b>Night Fury Hotel Inventory</b>
                        </div>
                    </div>
                    <div className="row add-item-widget">
                        <div className="hotel-widget1 background"></div>
                        <div className="hotel-widget2 background"></div>
                        <div className="hotel-widhet3 background"></div>
                        <div className="hotel-widhet4 background"></div>
                        <div className="hotel-widhet5 background"></div>
                        <div className="add-item" onClick={this._onAddNewClicked}>
                            <div className="add-new">
                                <div className="icn-container"></div>
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
            <Pagination itemsPerPage={this.props.itemsPerPage} totalItems={this.props.totalItems} paginate={this.props.paginate}/>
        </div>
    );
    }
}
export default HotelInfo;