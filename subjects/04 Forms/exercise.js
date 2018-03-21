////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

import _ from "lodash";

class CheckoutForm extends React.Component {
  state = {
    billingName: '',
    billigState: '',
    shippingName: '',
    shippingState: '',
    shippingSameAsBilling: false
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const values = serializeForm(evt.target, {hash: true});
    console.log(values);
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input
                  name="billingName"
                  type="text"
                  defaultValue={this.state.billingName}
                  onChange={evt => this.setState({
                    billingName: evt.target.value
                  })}
                />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input
                  name="billingState"
                  type="text"
                  size="2"
                  defaultValue={this.state.billingState}
                  onChange={evt => this.setState({
                    billingState: evt.target.value
                  })}
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                onChange={evt => this.setState({
                  shippingSameAsBilling: evt.target.checked
                })}
              /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input
                  type="text"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingName
                      : this.state.shippingName
                  }
                  onChange={
                    evt => this.updateShippingInfo({
                      shippingName: evt.target.value
                    })
                  }
                  readOnly={this.state.shippingSameAsBilling}
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input
                  type="text"
                  size="2"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingState
                      : this.state.shippingState
                  }
                  onChange={
                    evt => this.updateShippingInfo({
                      shippingState: evt.target.value
                    })
                  }
                  readOnly={this.state.shippingSameAsBilling}
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
