import React, { Component } from "react";
import "./styles/HomePageView.css"

class HomePageView extends Component {
  render() {
    return (
      <div className="wrapper">
        <h3>Agent Side</h3>
        <form>
          <fieldset>
            <label>
              <p>Enter Session Key:</p>
              <input name="name" />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default HomePageView;
