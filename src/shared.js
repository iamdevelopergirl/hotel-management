import React from 'react';
import './styles/hotelInfo.css';
import tileViewSettingsIcon from './images/ic-hotels-grid-settings.svg';
import gridViewSettingsIcon from './images/ic-tab-ui-setting.svg';


export class Settings extends React.Component {
    
    constructor(props) {
      super(props);
      this.state={
        showOptions: false
      }
      this._handleClick = this._handleClick.bind(this);
      this._handleSettingsClick = this._handleSettingsClick.bind(this);
    }
  
    componentWillMount() {
      document.addEventListener('click', this._handleClick, false);
    }
  
    componentWillUnmount() {
      document.removeEventListener('click', this._handleClick, false);
    }
  
    _handleClick(e) {
      if (!this.component.contains(e.target)) {
        this.setState({ showOptions: false });
      }
    }
  
    _handleSettingsClick() {
      this.setState({ showOptions: !this.state.showOptions });
    }
  
  
    render() {
      let path = this.state.showOptions ? './images/ic-tab-ui-setting-active.svg' : this.props.tileView ?  tileViewSettingsIcon : gridViewSettingsIcon
      return(
        <div ref={(component) => { this.component = component; }} onClick={this._handleSettingsClick}>
          <img src={path} className="settings"/>
          {
            this.state.showOptions && <Options position={this.props.position} optionsList={this.props.optionsList} strings={this.props.strings} handleOptionsClick={this.props.handleOptionsClick}/>
          }
        </div>
      );
    }
  }
  
  export class Options extends React.Component{
    /**
    * @constructor
    * @desc the constructor for this class
    *
    * @param  {object} props the properties passed to the object while creating it
    */
    constructor(props){
      super(props);
      this.createItems = this.createItems.bind(this);
    }
  
    /**
    * @function createItems
    * @desc create list of items received from the passed array
    *
    * @param  {object} items the object array containing the className, name and method
    */
    createItems(items){
      var self = this;
            let output = this.props.optionsList.map((anItem, index) => <div className="Items" key={index} id={anItem.id} onClick={()=>{self.props.handleOptionsClick(anItem.id);}}>{anItem.name}</div>)
            return output;
    }
  
    render(){
      let className = "tile-options-above";
      if(this.props.position !== null && this.props.position !== undefined) {
        className = "tile-options-" + this.props.position;
      }
      return(
        <div className={className}>
            {this.createItems(this.items)}
        </div>
      )
    }
  }

export class TextInput extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        values : props.values,
        currentState : ""
      };
      this._handleChange = this._handleChange.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onBlur = this._onBlur.bind(this);
      this._onClick = this._onClick.bind(this);
    }
  
    /**
    * @function _handleChange
    * @desc function to update state on event
    * @private
    * @param  event
    * @return None
    */
    _handleChange(e) {
      this.setState({values:e.target.value});
      if(this.props.maxLength &&
        this.props.onMaxLengthReached &&
        e.target.value.length >= parseInt(this.props.maxLength)) {
        this.props.onMaxLengthReached();
      }
    }
  
    /**
    * @function _onFocus
    * @desc function to handle focus event
    * @private
    * @param  None
    * @return None
    */
    _onFocus(e) {
      var val = e.target.value;
      e.target.value = '';
      e.target.value = val;
      this.setState({
        currentState: " focussed"
      });
    }
  
    /**
    * @function _onBlur
    * @desc function to handle blur event
    * @private
    * @param  None
    * @return None
    */
    _onBlur() {
      this.setState({
        currentState: ""
      });
    }
  
    /**
    * @function _onClick
    * @desc function to handle click event
    * @private
    * @param  None
    * @return None
    */
    _onClick() {
      this.input.focus();
    }
  
    /**
    * @function setFocus
    * @desc function to set focus to this field
    * @param  None
    * @return None
    */
    setFocus() {
      this._onClick();
    }
  
    render() {
      let style ={};
      let divStyle = {};
      if(this.props.size) {
        style.width = this.props.size;
        divStyle.width = this.props.size + 20;
      }
      let className = "text-input" + this.state.currentState;
      if(this.props.errorMessage) {
        className += " error";
      }
      if(this.props.shortInput) {
        className += " no-underline";
      }
      return (
        <div className={className} style={divStyle} onFocus={this._onFocus} onBlur={this._onBlur} onClick={this._onClick}>
          <div className="name-container" style={style}>{this.props.name}</div>
          <input style={style} type="text" className="value-container" value={this.state.values}
            ref={(input) => this.input=input} onChange={this._handleChange} maxLength={this.props.maxLength}
            autoFocus={this.props.autofocus}/>
          {
            this.props.errorMessage ? <div className="errorMessage">{this.props.errorMessage}</div> : null
          }
        </div>
      );
    }
  }