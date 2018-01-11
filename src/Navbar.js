import React from "react";
import './Navbar.css';

class Navbar extends React.Component {
  render() {
    return(
      <nav className="navbar">
        <h3 className="navbar-title">Festa</h3>
        <input
          type="text"
          value={this.props.value}
          className="navbar-search"
          placeholder="Search..."
          onChange={(ev) => this.props.onChange(ev)}
          onKeyPress={(ev) => this.props.onSubmit(ev)}
        />
        <p className="navbar-user">☰</p>
      </nav>
    )
  }
}

export default Navbar
