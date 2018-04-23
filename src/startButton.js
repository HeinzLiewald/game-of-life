import React from 'react';

export class StartButton extends React.Component {
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
