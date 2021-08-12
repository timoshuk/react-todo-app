import React, { Component } from "react";
import "./add-item.css";
export default class AddItem extends Component {
  state = {
    label: ""
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.label.length > 0) {
      this.props.addItem(this.state.label);
    }

    this.setState({ label: "" });
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };
  render() {
    return (
      <form className="add-item mt-2 d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control mr-2"
          onChange={this.onLabelChange}
          placeholder="what Nids to be done"
          value={this.state.label}
        />
        <button className="btn btn-block btn-danger">Add Item</button>
      </form>
    );
  }
}
