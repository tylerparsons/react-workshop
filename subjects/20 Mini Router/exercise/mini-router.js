////////////////////////////////////////////////////////////////////////////////
import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
  history = createHashHistory();

  static childContextTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    location: this.history.location
  };

  getChildContext() {
    return {
      history: this.history
    };
  }

  componentDidMount() {
    this.history.listen(() => this.setState({
      location: this.history.location
    }));
  }

  render() {
    return this.props.children;
  }
}

class Route extends React.Component {
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { path, render, component: Component } = this.props;
    const currentPath = this.context.history.location.pathname;

    if (path === currentPath) {
      if (render) {
        return render();
      } else if (Component) {
        return <Component />;
      }
    }

    return null;
  }
}

class Link extends React.Component {
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  handleClick = e => {
    e.preventDefault();
    const { history } = this.context;
    if (this.props.to !== history.location.pathname) {
      history.push(this.props.to);
    }
  };

  render() {
    return (
      <a href={`#${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export { Router, Route, Link };
