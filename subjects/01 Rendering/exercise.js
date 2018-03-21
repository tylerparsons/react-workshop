////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render DATA.title in an <h1>
// - Render a <ul> with each of DATA.items as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a select dropdown to make filtering on `type` dynamic
// - Add a button to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";
import _ from "lodash";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

function renderMenu(type) {
  ReactDOM.render(<Menu type={type} />, document.getElementById("app"));
}

function onMenuChanged(event) {
  var type = event.target.value;
  renderMenu(type);
}

function MenuTypeDropdown() {
  var types = _(DATA.items).map(i => i.type).uniq().value();
  return <select onChange={onMenuChanged}>
    {types.map((type, idx) => (
      <option key={idx} value={type}>{type}</option>
    ))}
  </select>;
}

function Menu(props) {
  var type = props.type || 'mexican';
  return (
    <div>
      <h1>{DATA.title}</h1>
      <ul>
        {DATA.items
          .filter(item => item.type === type)
          .sort(sortBy('name'))
          .map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <h3>Select type of cuisine</h3>
      <MenuTypeDropdown />
    </div>
  );
}

ReactDOM.render(<Menu />, document.getElementById("app"), () => {
  require("./tests").run();
});
