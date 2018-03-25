////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    scrollTop: 0
  };

  handleScroll = evt => {
    this.setState({
      scrollTop: evt.target.scrollTop
    });
  };

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const items = [];
    const startIndex = Math.floor(this.state.scrollTop / rowHeight);
    const endIndex = Math.min(
      Math.ceil(window.innerHeight / rowHeight) + startIndex,
      numRows
    );

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.handleScroll}
      >
        <div style={{ height: totalHeight }}>
          <ol style={{ paddingTop: this.state.scrollTop }}>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={5000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
