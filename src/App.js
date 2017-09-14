import React from "react"
import cn from "classnames"
import Toggle from "react-toggle"
import logo from "./logo.svg"
import "./App.css"
import "react-toggle/style.css"


class Reactor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStarted: false,
      mode: "slow",
    }
  }

  handleStatusChange = (e) => {
    this.setState({ isStarted: e.target.checked })
  }

  handleModeChange = (e) => {
    this.setState({ mode: e.target.value })
  }

  render() {
    return (
      <div className="reactor">
        <div className="status-display-panel">
          <StatusDisplay
            isStarted={this.state.isStarted}
            mode={this.state.mode}
          />
        </div>
        <div className="panel">
          <Engine
            isStarted={this.state.isStarted}
            mode={this.state.mode}
          />
        </div>
        <div className="panel">
          <ControlPanel
            isStarted={this.state.isStarted}
            handleStatusChange={this.handleStatusChange}
            mode={this.state.mode}
            handleModeChange={this.handleModeChange}
          />
        </div>
      </div>
    )
  }
}

function getStatusForDisplay(isStarted) {
  return isStarted ? "Started" : "Stopped"
}

function StatusDisplay(props) {
  return (
    <div className="status-display-wrapper">
      <span>{getStatusForDisplay(props.isStarted).toUpperCase()}</span>&nbsp;|&nbsp;
      <span>{props.mode.toUpperCase()}</span>
    </div>
  )
}

function Engine(props) {
  const engineClassNames = cn("engine", {
    "spin-slow": props.isStarted && props.mode === "slow",
    "spin-fast": props.isStarted && props.mode === "fast",
    "spin-turbo": props.isStarted && props.mode === "turbo",
  })
  return <img src={logo} className={engineClassNames} alt="engine" />
}

function ControlPanel(props) {
  return (
    <div>
      <EngineStatus
        isStarted={props.isStarted}
        handleStatusChange={props.handleStatusChange}
      />
      <EngineMode
        mode={props.mode}
        handleModeChange={props.handleModeChange}
      />
    </div>
  )
}

function EngineStatus(props) {
  return (
    <div>
      <div>Engine status: {getStatusForDisplay(props.isStarted)}</div>
      <Toggle
        defaultChecked={props.isStarted}
        onChange={props.handleStatusChange}
      />
    </div>
  )
}

function EngineMode(props) {
  const radios = {
    slow: "Slow",
    fast: "Fast",
    turbo: "Turbo",
  }

  return (
    <div>
      <div>Mode: {props.mode}</div>
      {Object.keys(radios).map(key => {
        return (
          <label key={key} htmlFor={key}>
            <input key={key} id={key} value={key} type="radio" name="mode"
              onChange={props.handleModeChange} checked={key === props.mode}/>{radios[key]}
          </label>
        )})
      }
    </div>
  )
}

export default Reactor
