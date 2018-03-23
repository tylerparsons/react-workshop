////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

import _ from "lodash";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    showOptions: false,
    value: "dosa"
  };

  toggleOptions = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };

  updateValue(value) {
    if (this.isControlled()) {
      this.props.onChange && this.props.onChange(value);
    } else {
      this.setState({ value });
    }
  }

  isControlled() {
    return this.props.value != null && this.props.onChange != null;
  }

  render() {
    const children = this.state.showOptions ? (
      <div className="options">
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            onSelected: value => this.updateValue(value)
          })
        )}
      </div>
    ) : (
      []
    );

    return (
      <div className="select">
        <div className="label" onClick={this.toggleOptions}>
          {this.isControlled() ? this.props.value : this.state.value}
          <span className="arrow">▾</span>
        </div>
        {children}
      </div>
    );
  }
}

class Option extends React.Component {
  static propTypes = {
    onSelected: PropTypes.func
  };
  render() {
    return (
      <div
        className="option"
        onClick={() => this.props.onSelected(this.props.value)}
      >
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select + Option</h1>

        <h2>Controlled</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
