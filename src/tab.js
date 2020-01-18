import React from "react";
import PropTypes from "prop-types";
import "./tabs.css";

class Tab extends React.Component {
  state = { hover: false };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  render() {
    const {
      isTabDisabled,
      label,
      activeTab,
      index,
      onClick,
      activeColor,
      textColor,
      hoveredColor,
      tabBackgroundColor
    } = this.props;
    let className = "tab-list-item",
      style = {
        backgroundColor: tabBackgroundColor
      };

    if (activeTab === index) {
      className += " tab-list-active";
      style = {
        ...style,
        borderBottom: `2px solid ${activeColor}`,
        color: textColor
      };
    }
    if (isTabDisabled) {
      className += " disabled-tab";
    }
    if (this.state.hover) {
      style = {
        ...style,
        cursor: "pointer",
        color: textColor || "rgb(29, 161, 242)",
        backgroundColor: hoveredColor || "#e8f5fe"
      };
    }
    return (
      <div
        className={className}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        style={style}
        onClick={() => {
          onClick(index);
        }}
      >
        <div className="tab-label">{label}</div>
      </div>
    );
  }
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  isTabDisabled: PropTypes.bool
};
export default Tab;
