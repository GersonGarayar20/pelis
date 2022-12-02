import React from 'react';

const SWIPE_THRESHOLD = 40;


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.hoverStart = this.hoverStart.bind(this);
    this.hoverEnd = this.hoverEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.state = {
      activeIndex: this.props.activeIndex,
      direction: 'end',
      indicatorClicked: false,
    };
  }

  componentDidMount() {
    // Set up the cycle
    if (this.props.ride === 'carousel') {
      this.setInterval();
    }

    // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.
    document.addEventListener('keyup', this.handleKeyPress);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = null;
    let { activeIndex, direction, indicatorClicked } = prevState;

    if (nextProps.activeIndex !== activeIndex) {
      // Calculate the direction to turn
      if (nextProps.activeIndex === activeIndex + 1) {
        direction = 'end';
      } else if (nextProps.activeIndex === activeIndex - 1) {
        direction = 'start';
      } else if (nextProps.activeIndex < activeIndex) {
        direction = indicatorClicked ? 'start' : 'end';
      } else if (nextProps.activeIndex !== activeIndex) {
        direction = indicatorClicked ? 'end' : 'start';
      }

      newState = {
        activeIndex: nextProps.activeIndex,
        direction,
        indicatorClicked: false,
      };
    }

    return newState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeIndex === this.state.activeIndex) return;
    this.setInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  handleKeyPress(evt) {
    if (this.props.keyboard) {
      if (evt.keyCode === 37) {
        this.props.previous();
      } else if (evt.keyCode === 39) {
        this.props.next();
      }
    }
  }

  handleTouchStart(e) {
    if (!this.props.enableTouch) {
      return;
    }
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  handleTouchEnd(e) {
    if (!this.props.enableTouch) {
      return;
    }

    const currentX = e.changedTouches[0].screenX;
    const currentY = e.changedTouches[0].screenY;
    const diffX = Math.abs(this.touchStartX - currentX);
    const diffY = Math.abs(this.touchStartY - currentY);

    // Don't swipe if Y-movement is bigger than X-movement
    if (diffX < diffY) {
      return;
    }

    if (diffX < SWIPE_THRESHOLD) {
      return;
    }

    if (currentX < this.touchStartX) {
      this.props.next();
    } else {
      this.props.previous();
    }
  }

  getContextValue() {
    return { direction: this.state.direction };
  }

  setInterval() {
    // make sure not to have multiple intervals going...
    this.clearInterval();
    if (this.props.interval) {
      this.cycleInterval = setInterval(() => {
        this.props.next();
      }, parseInt(this.props.interval, 10));
    }
  }

  clearInterval() {
    clearInterval(this.cycleInterval);
  }

  hoverStart(...args) {
    if (this.props.pause === 'hover') {
      this.clearInterval();
    }
    if (this.props.mouseEnter) {
      this.props.mouseEnter(...args);
    }
  }

  hoverEnd(...args) {
    if (this.props.pause === 'hover') {
      this.setInterval();
    }
    if (this.props.mouseLeave) {
      this.props.mouseLeave(...args);
    }
  }

  renderItems(carouselItems, className) {
    const { slide } = this.props;
    return (
      <div className={className}>
        {carouselItems.map((item, index) => {
          const isIn = index === this.state.activeIndex;
          return React.cloneElement(item, {
            in: isIn,
            slide: slide,
          });
        })}
      </div>
    );
  }

  render() {

    // Rendering indicators, slides and controls
    const indicators = children[0];
    const wrappedOnClick = (e) => {
      if (typeof indicators.props.onClickHandler === 'function') {
        this.setState({ indicatorClicked: true }, () =>
          indicators.props.onClickHandler(e),
        );
      }
    };
    const wrappedIndicators = React.cloneElement(indicators, {
      onClickHandler: wrappedOnClick,
    });
    
  }
}
