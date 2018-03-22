////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Form extends React.Component {
  values = {};
  resetListeners = [];

  static childContextTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    addResetListener: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      onSubmit: () => this.props.onSubmit(this.values),
      onChange: (key, value) => this.values[key] = value,
      onReset: () => this.resetListeners.forEach(l => l()),
      addResetListener: (listener) => this.resetListeners.push(listener)
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    onSubmit: PropTypes.func
  };

  render() {
    return <button onClick={this.context.onSubmit}>
      {this.props.children}
    </button>;
  }
}

class ResetButton extends React.Component {
  static contextTypes = {
    onReset: PropTypes.func
  };

  render() {
    return <button onClick={this.context.onReset}>
      {this.props.children}
    </button>;
  }
}

class TextInput extends React.Component {
  state = {
    value: ""
  };

  static contextTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    addResetListener: PropTypes.func
  };

  handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      this.context.onSubmit && this.context.onSubmit();
    }
  };

  updateValue(value) {
    this.context.onChange(this.props.name, value);
    this.setState({value});
  }

  handleChange = (evt) => {
    this.updateValue(evt.target.value);
  };

  componentDidMount() {
    this.context.addResetListener(() => this.updateValue(""));
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
      />
    );
  }
}

class App extends React.Component {
  handleSubmit = (formData) => {
    alert("YOU WIN! Form is " + JSON.stringify(formData));
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
          <p>
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
