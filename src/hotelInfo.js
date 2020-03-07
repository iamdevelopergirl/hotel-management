import React from 'react';
import AccountHeader from './accountHeader.js';
import './styles/hotelInfo.css';
import {ListViewToggle, TileViewToggle} from './view-toggle.js';
import ItemsView from './item-view.js';
import logo from './images/hotel-img.jpeg';
import ModalContainer from './modal-container.js';
import {isNil, isEmptyObject, HotelAPI} from './utils.js';
import axios from 'axios';
import {Spinner} from './spinner.js';
import Pagination from './pagination.js';


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
            uploading : this.props.uploading
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

    _addHotelItem(objToUpdate){
        const {
                url,
                headers,
                param
            } = HotelAPI(this.props.token);
        axios.post(url, {headers, param, objToUpdate})
          .then(res => {
            if(res.status == 200){
                // this.setState({
                //     uploading: false
                // });
                this.props.updateItems();
            }
        });
        // this.state.hotelItems.push(objToUpdate);
        // this.setState({
        //     hotelItems : this.state.hotelItems
        // });
    }

    _updateHotelItem(objToUpdate, searchKey){
        const {
            url,
            headers,
            param
        } = HotelAPI(this.props.token, searchKey);

        if(isEmptyObject(objToUpdate)){
            axios.delete(url, {headers, param})
            .then(res => {
                if(res.status == 200){
                    this.props.updateItems();
                }
            });
        }
        else{
            axios.post(url, {headers, param, objToUpdate})
            .then(res => {
                if(res.status == 200){
                    this.props.updateItems();
                }
            });
        }
        
        // let indexToUpdate = this.state.hotelItems.map((item, index) => [index, item]).find((item) => Object.keys(item[1])[0] == searchKey)[0];
        // if(isEmptyObject(objToUpdate[searchKey])){
        //     this.state.hotelItems.splice(indexToUpdate, 1);
        // }
        // else{
        //     this.state.hotelItems[indexToUpdate] = objToUpdate;
        // }
        
        // this.setState({
        //     hotelItems : this.state.hotelItems
        // });
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

    componentWillReceiveProps(nextProps) {
        this.setState({ hotelItems: nextProps.hotelItems });  
    }

    componentDidMount(){
        window.addEventListener("scroll", this._handleScroll);
        // let stringifiedHotelItems = localStorage.getItem("hotelItems");
        // if(isNil(stringifiedHotelItems)){
        //     localStorage.setItem("hotelItems", JSON.stringify(this.state.hotelItems));
        // }
        // else{
        //     let hotelItems = JSON.parse(stringifiedHotelItems);
        //     this.setState({hotelItems : hotelItems});
        // } 
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    render(){
        const { uploading } = this.state;
        switch(true){
            case uploading:
                return <Spinner />
        }
        let itemsView = "";
        const background = (this.state.selectedViewType === "TileView") ? 'content-container--greybg' : 'content-container--whitebg';
        itemsView = (<ItemsView viewType={this.state.selectedViewType} items={this.state.hotelItems} performAction={this._performAction}/>);
    return(
        <div>
            {
                this.state.showModal ? <ModalContainer toDisplay={this.state.toDisplayModal} modalData={this.state.modalData} modalKey={this.state.modalKey} handleModal={this._handleModal}/> : null
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
            <Pagination itemsPerPage={this.props.itemsPerPage} totalItems={this.props.totalItems} paginate={this.props.paginate}/>
        </div>
    );
    }
}
export default HotelInfo;