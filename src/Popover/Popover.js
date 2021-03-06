import React, { Component } from 'react';
import PropTypes from 'prop-types';

// ---------------------------------------- Popover ----------------------------------------
export class Popover extends Component {
    constructor(props) {
        super(props);
        this.triggerBody = this.triggerBody.bind(this);
        this.pressEsc = this.pressEsc.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.state = {
            isExpanded: false,
            isDisabled: this.props.disabled
        };
    }

    triggerBody() {
        if (!this.state.isDisabled) {
            if (!this.state.isExpanded) {
                document.addEventListener('click', this.handleOutsideClick, false);
            } else {
                document.removeEventListener('click', this.handleOutsideClick, false);
            }

            this.setState(prevState => ({
                isExpanded: !prevState.isExpanded
            }));
        }
    }

    pressEsc(event) {
        if (event.keyCode === 27 && this.state.isExpanded === true) {
            this.setState({
                isExpanded: false
            });
        }
    }

    handleOutsideClick(e) {
        if (!this.node.contains(e.target)) {
            if (this.state.isExpanded) {
                this.setState({
                    isExpanded: false
                });
            } else {
                return;
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.pressEsc, false);
        document.addEventListener('click', this.handleOutsideClick, false);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.pressEsc, false);
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    render() {
        const { id, alignment, noArrow, control, body } = this.props;
        return (
            <div
                className={`fd-popover${alignment ? ' fd-popover--' + alignment : ''}`}
                ref={this.setWrapperRef}
                ref={node => {
                    this.node = node;
                }}
            >
                <div
                    className="fd-popover__control"
                    aria-expanded={this.state.isExpanded}
                    onClick={this.triggerBody}
                    aria-controls={id}
                >
                    {control}
                </div>
                <div
                    className={`fd-popover__body${alignment ? ' fd-popover__body--' + alignment : ''}${
                        noArrow ? ' fd-popover__body--no-arrow' : ''
                    }`}
                    aria-hidden={!this.state.isExpanded}
                    id={id}
                >
                    {body}
                </div>
            </div>
        );
    }
}

Popover.propTypes = {
    id: PropTypes.string,
    state: PropTypes.string,
    alignment: PropTypes.string,
    noArrow: PropTypes.bool,
    disabled: PropTypes.bool
};
