import React from 'react';
import {ArrayGrid} from './arrayGrid';

export class Cell extends React.Component {
  constructor(props) {
      super(props);
      this.cellClick = this.cellClick.bind(this);
  }

  cellClick()  {
    var arrayGrid = ArrayGrid.getInstance();
    arrayGrid[this.props.pos_i][this.props.pos_j] = !arrayGrid[this.props.pos_i][this.props.pos_j];
    ArrayGrid.setInstance(arrayGrid);
    this.setState({});
  }

  render() {
    if (ArrayGrid.getInstance()[this.props.pos_i][this.props.pos_j]) {
      var style = { backgroundColor: "#0e0d3d" };
    }

    return <div className="cell" onClick={this.cellClick} style={style}></div>;
  }
}
