import React, { Component } from 'react'
import SecondsTohhmmss from './SecondsTohhmmss'
import PropTypes from 'prop-types'

let offset = null, interval = null

/**
 * Timer module
 * A simple timer component.
**/
export default class Timer extends Component {
  static get propTypes () {
    return {
      options: PropTypes.object
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      clock: 0,
      time: '', 
      timerStyle: {
        fontSize: "200%",
        fontWeight: "200",
        lineHeight: "1.5",
        margin: "0",
        color: "#00ff00"
      }
    }
  }

  componentDidMount() {
    this.play()
  }

  pause() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update.bind(this), this.props.options.delay)
    }
  }

  reset() {
    let clockReset = 0
    this.setState({clock: clockReset })
    let time = SecondsTohhmmss(clockReset / 1000)
    this.setState({time: time })
  }

  update() {
    let clock = this.state.clock
    clock += this.calculateOffset()
    this.setState({clock: clock })
    if(this.props.options.maxTime*1000 <= clock + 30000) {
      this.setState({
        timerStyle: {
          fontSize: "200%",
          fontWeight: "200",
          lineHeight: "1.5",
          margin: "0",
          color: "#ff0000"
        }
      })
    }else if(this.props.options.maxTime*1000 <= clock + 60000) {
      this.setState({
        timerStyle: {
          fontSize: "200%",
          fontWeight: "200",
          lineHeight: "1.5",
          margin: "0",
          color: "#FAA41A"
        }
      })
    }

    if(this.props.options.maxTime*1000 <= clock){
      this.pause();
      this.reset();
      this.props.onTimerEnd();
    }
    let time = SecondsTohhmmss(clock / 1000)
    this.setState({time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    const timerStyle = {
      margin: "0px",
      // padding: "2em"
    };

    const buttonStyle = {
      background: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      marginRight: "5px",
      padding: "10px",
      fontWeight: "200"
    };

    const secondsStyles = {
      fontSize: "200%",
      fontWeight: "200",
      lineHeight: "1.5",
      margin: "0",
      color: "#666"
    };

    return (
      <div style={timerStyle} className="react-timer">
        <h3 style={this.state.timerStyle} className="seconds"> {this.state.time} {this.props.prefix}</h3>
      </div>
    )
  }
}