import React from 'react';
import './styles/hotelInfo.css';

/**
* @class ListViewToggle
* @desc Switch component for List view in main page
*/
export class ListViewToggle extends React.Component {

    constructor(props) {
      super(props);  
      this.viewType = "ListView";
      this._handleClick = this._handleClick.bind(this);
    }
  
    /**
    * @private 
    * @function _handleClick
    * @desc Handle the click on list view button
    */
    _handleClick() {
      if(!this.props.isDisabled) {
        this.props.setViewType(this.viewType);
      }
    }
  
    render() {
      let className = "list-view-toggle";
      if(this.props.isDisabled) {
        className += " disabled";
      }
      else if(this.props.selectedViewType === this.viewType) {
        className += " selected";
      }
      return (
        <div className={className} onClick={this._handleClick}></div>
      );
    }
}

/**
* @class TileViewToggle
* @desc Switch component for Tile view in main page
*/
export class TileViewToggle extends React.Component {

  constructor(props) {
    super(props);

    this.viewType = "TileView";
    this._handleClick = this._handleClick.bind(this);
  }

  /**
    * @private 
    * @function _handleClick
    * @desc Handle the click on tile view button
    */
  _handleClick() {
    if(!this.props.isDisabled) {
    this.props.setViewType(this.viewType);
    }
  }

  render() {
    let className = "tile-view-toggle";
    if(this.props.isDisabled) {
      className += " disabled";
    }
    else if(this.props.selectedViewType === this.viewType) {
      className += " selected";
    }

    return (
      <div className={className} onClick={this._handleClick}></div>
    );  
  }
}