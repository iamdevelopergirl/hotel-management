import React from 'react';
import './styles/hotelInfo.css';

export class ListViewToggle extends React.Component {

    constructor(props) {
      super(props);  
      this.viewType = "ListView";
      this._handleClick = this._handleClick.bind(this);
    }
  
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
  
export class TileViewToggle extends React.Component {

constructor(props) {
    super(props);

    this.viewType = "TileView";
    this._handleClick = this._handleClick.bind(this);
}

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