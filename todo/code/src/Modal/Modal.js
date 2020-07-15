import React from "react";
import "./Modal.css";
import shalom from "../Images/shalom.png";

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          Open modal
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Shabbat shalom</h1>
              <p>
                <img src={shalom} alt="shalom" />
              </p>
              <button onClick={() => this.setState({ isOpen: false })}>
                Close
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
