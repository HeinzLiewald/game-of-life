import React from 'react';
import {Cell} from './cell'
import {ArrayGrid} from './arrayGrid';
import {StartButton} from './startButton'

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "steps" : 0 };
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    var newArrayGrid = ArrayGrid.getInstance().map(function(arr) { return arr.slice(); });
    for (var i = 0; i < ArrayGrid.size; i++){
      for (var j = 0; j < ArrayGrid.size; j++){
        var neighborCount = 0;
        for(var k = -1; k <= 1; k ++){
          for(var l = -1; l <= 1; l ++){
            if(i + k >= 0 &&
              i + k < ArrayGrid.size &&
              j + l >= 0 &&
              j + l < ArrayGrid.size &&
              !(k === 0 && l === 0) &&
              ArrayGrid.getInstance()[i + k][j + l]){
                neighborCount++;
            }
          }
        }
        newArrayGrid[i][j] = (neighborCount === 3 || (neighborCount === 2 && ArrayGrid.getInstance()[i][j]));
      }
    }
    ArrayGrid.setInstance(newArrayGrid);
    this.setState({ "steps" : this.state.steps + 1 });
  }

  render() {
    var _grid = [];
    for (var i = 0; i < ArrayGrid.size; i++){
      var _row = [];
      for (var j = 0; j < ArrayGrid.size; j++){
        _row.push(<Cell
            key={i + "_" + j}
            pos_i={i}
            pos_j={j}
          />);
      }
      _grid.push(<div key={i} className="row">{_row}</div>);
    }
    return (
      <div className="container">
      <h3 className="text"><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway&apos;s Game of Life</a>, by Heinz Liewald</h3>
        {_grid}
        <p className="text">
        <i>Click on any cell to activate/deactivate it</i>
        <br />
        Steps: <b>{this.state.steps}</b></p>
        <StartButton functionStarted={this.nextStep} />
        <a className="text" href="https://github.com/HeinzLiewald">See more at GitHub</a>
      </div>
    );
  }
}
