import React from 'react';
import HotelTile from './hotel-tile.js';
import HotelList from './hotel-list.js';
import './styles/hotelInfo.css';
import NoItemView from './no-item-view.js';

export default class ItemsView extends React.Component {
    constructor(props){
        super(props);
        this._stopPropagation = this._stopPropagation.bind(this);
    }

    _stopPropagation(event){
        event.stopPropagation();
    }

    render(){
        let viewType = "";
        if(this.props.viewType === "TileView"){
            viewType = <ItemsTileView items={this.props.items} performAction={this.props.performAction} stopPropagation={this._stopPropagation}/>
        }
        else if(this.props.viewType === "ListView"){
            viewType = <ItemsListView items={this.props.items} performAction={this.props.performAction}/>;
        }
        return(
            <div className="items-content">
              {viewType}  
            </div>
        )
    }
}

export class ItemsTileView extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return ( 
          <div className="items-tile-view">
            {this.props.items.length !== 0 ? this.props.items.map((item, index) => 
                <HotelTile key={Object.keys(item)[0]} itemKey={Object.keys(item)[0]} item={item[Object.keys(item)[0]]} itemIndex={index} performAction={this.props.performAction} stopPropagation={this.props.stopPropagation}/>
            ) : <NoItemView/>}
          </div>
        );
    }
}

export class ItemsListView extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="items-list-view">
                {this.props.items.length !== 0 ? this.props.items.map((item, index) =>
                    <HotelList key={Object.keys(item)[0]} itemKey={Object.keys(item)[0]} item={item[Object.keys(item)[0]]} performAction={this.props.performAction}/>) : <NoItemView/>}
            </div>
        )
    }
}