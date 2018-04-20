import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

var ArrayGrid = (function () {
  var instanceArrayGrid;

  return {
    size: 40,
    getInstance: function () {
      if (!instanceArrayGrid) {
        instanceArrayGrid = [];
        for(var i = 0; i < this.size; i++) {
            instanceArrayGrid[i] = [];
            for(var j = 0; j < this.size; j++) {
                instanceArrayGrid[i][j] = !Math.floor((Math.random()) * 10);
            }
        }
      }
      return instanceArrayGrid;
    },
    setInstance: function(newArrayGrid) {
      instanceArrayGrid = newArrayGrid;
    }
  };
})();

class Cell extends React.Component {
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

class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClickStart = this.handleOnClickStart.bind(this);
    this.handleOnClickStop = this.handleOnClickStop.bind(this);
    this.state = { intervalId : null , buttonName : "Start", handleOnClick : this.handleOnClickStart }
  }


  handleOnClickStart() {
    this.setState({ intervalId : setInterval(this.props.functionStarted, 250), buttonName : "Pause",  handleOnClick : this.handleOnClickStop });
  }

  handleOnClickStop() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId : null, buttonName : "Resume", handleOnClick : this.handleOnClickStart });
  }

  render() {
    return <button className="button" onClick={this.state.handleOnClick}>{this.state.buttonName}</button>;
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "steps" : 0 };
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    console.log('[nextStep] start');
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
    console.log('[nextStep] end');
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
      <h3 className="text"><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>, by Heinz Liewald</h3>
        {_grid}
        <p className="text">
        <i>Click on any cell to activate/deactivate it</i>
        <br />
        Steps: <b>{this.state.steps}</b></p>
        <StartButton functionStarted={this.nextStep} />
      </div>
    );
  }
}

ReactDOM.render(<Grid />, document.getElementById('app'));
