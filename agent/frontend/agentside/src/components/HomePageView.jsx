import React, { Component } from "react";
import NavBarContainerView from "./NavBarContainerView";
import "./styles/HomePageView.css";

class HomePageView extends Component {
  render() {
    return (
      <div>
        <NavBarContainerView />
        <div className="wrapper">
          <h3>Agent Side</h3>
          <form>
            <fieldset>
              <label>
                <p>Enter Session Key:</p>
                <input name="key" />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePageView;
