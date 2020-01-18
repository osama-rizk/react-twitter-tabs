import React, { Component } from "react";
import PropTypes from "prop-types";
import "./tabs.css";
import Tab from "./tab";
import PreviousSvg from "./PreviousSvg";
import NextSvg from "./NextSvg";

class Tabs extends Component {
  tabListRef = React.createRef();

  state = {
    activeTab: this.props.defaultTab || 0,
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false
  };

  componentDidMount() {
    this.checkPisitions();

    this.tabListRef.current.addEventListener(
      "scroll",
      this.checkForScrollPosition
    );
    window.addEventListener("orientationchange", () => {
      this.checkPisitions();
    });
    window.addEventListener("resize", () => {
      this.checkPisitions();
    });
  }

  checkPisitions = () => {
    this.checkForOverflow();
    this.checkForScrollPosition();
  };
  componentWillUnmount() {
    if (this.tabListRef.current) {
      this.tabListRef.current.removeEventListener(
        "scroll",
        this.checkForScrollPosition
      );
    }

    window.removeEventListener("orientationchange", () => {
      this.checkPisitions();
    });
    window.removeEventListener("resize", () => {
      this.checkPisitions();
    });
  }

  checkForScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = this.tabListRef.current;

    this.setState(() => ({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: Math.ceil(scrollLeft) !== scrollWidth - clientWidth
    }));
  };

  checkForOverflow = () => {
    const { scrollWidth, clientWidth } = this.tabListRef.current;

    const hasOverflow = scrollWidth > clientWidth;

    this.setState({ hasOverflow });
  };

  scrollContainerBy = distance => {
    this.tabListRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: {
        children,
        activeColor,
        arrowColor,
        textColor,
        hoveredColor,
        tabBackgroundColor,
        arrowBackGroundColor
      },
      state: { activeTab, hasOverflow, canScrollLeft, canScrollRight }
    } = this;

    return (
      <div className="tabs">
        <div
          hidden={!(hasOverflow && canScrollLeft)}
          style={{ backgroundColor: arrowBackGroundColor }}
          className="prev-btn"
          aria-label="previous"
          role="button"
          onClick={() =>
            this.scrollContainerBy(-(window.innerWidth - 38 - 38 - 20))
          }
        >
          <PreviousSvg color={arrowColor} />
        </div>
        <div className="tab-list" ref={this.tabListRef}>
          {children.map((child, i) => {
            const { label, isTabDisabled } = child.props;

            return (
              <Tab
                hoveredColor={hoveredColor}
                activeColor={activeColor}
                textColor={textColor}
                activeTab={activeTab}
                tabBackgroundColor={tabBackgroundColor}
                index={i}
                label={label}
                onClick={onClickTabItem}
                isTabDisabled={isTabDisabled}
                total={React.Children.count(this.props.children)}
              />
            );
          })}
        </div>
        <div
          hidden={!(hasOverflow && canScrollRight)}
          style={{ backgroundColor: arrowBackGroundColor }}
          className="next-btn"
          aria-label="Next"
          role="button"
          onClick={() =>
            this.scrollContainerBy(window.innerWidth - 38 - 38 - 20)
          }
        >
          <NextSvg color={arrowColor} />
        </div>
        <div className="tab-content">
          {children.map((child, i) => {
            if (i !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  textColor: PropTypes.string,
  hoveredColor: PropTypes.string,
  activeColor: PropTypes.string,
  tabBackgroundColor: PropTypes.string,
  arrowColor: PropTypes.string,
  arrowBackGroundColor: PropTypes.string
};
export default Tabs;
