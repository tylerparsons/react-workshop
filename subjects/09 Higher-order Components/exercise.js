////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(Component) {
  return class extends React.Component {
    state = {
      mouse: null
    };

    _onMouseMove = evt => {
      this.setState({
        mouse: {
          x: evt.clientX,
          y: evt.clientY
        }
      });
    };

    render() {
      return (
        <div onMouseMove={this._onMouseMove}>
          <Component {...this.props} mouse={this.state.mouse} />
        </div>
      );
    }
  };
}

function withCat(Component) {
  return class extends React.Component {
    static propTypes = {
      mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    };

    state = {
      mouse: null
    };

    followMouse() {
      const { mouse } = this.props;
      if (mouse) {
        setTimeout(() => {
          this.setState({ mouse });
        }, 200);
      }
    }

    componentDidUpdate() {
      this.followMouse();
    }

    componentDidMount() {
      this.followMouse();
    }

    render() {
      return (
        <div>
          <Component {...this.props} />
          {this.state.mouse && (
            <div
              className="cat"
              style={{
                top: this.state.mouse.y,
                left: this.state.mouse.x
              }}
            />
          )}
        </div>
      );
    }
  };
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  render() {
    const { mouse, className } = this.props;

    return (
      <div className="container">
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(App);
const AppWithCatAndMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithCatAndMouse />, document.getElementById("app"));
