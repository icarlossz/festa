import React from "react";
import './Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <h3 className="navbar-title">
          <span role="img" aria-labelledby="Party">🎉</span> FESTA
        </h3>
        <input
          type="text"
          value={this.props.value}
          className="navbar-search"
          placeholder="Search..."
          onChange={(ev) => this.props.onChange(ev)}
          onKeyPress={(ev) => this.props.onSubmit(ev)}
        />
        <a
          href="https://github.com/icarlossz/festa"
          rel="noopener noreferrer"
          className="navbar-github"
          target="_blank"
        >
          <i className="fab fa-github"></i>
        </a>
      </nav>
    )
  }
}

export default Navbar