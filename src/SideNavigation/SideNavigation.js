import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';

export const SideNav = props => {
    const { icons, children } = props;
    return <nav className={`fd-side-nav${icons ? ' fd-side-nav--icons' : ''}`}>{children}</nav>;
};
SideNav.propTypes = {
    icons: PropTypes.bool
};

export class SideNavList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectChild = this.handleSelectChild.bind(this);

        let initialState = [];

        props.items.map(item => {
            if (item.hasChild) {
                let id = item.id;
                let obj = {};

                obj[id] = false;
                initialState.push(obj);
            }
        });

        this.state = {
            selectedItem: 'item_2',
            itemStates: initialState
        };
    }

    handleSelectChild(e, id) {
        this.setState({
            selectedItem: id
        });
    }

    handleSelect(e, id) {
        let iStates = Object.assign({}, this.state.itemStates);
        iStates[id] = !iStates[id];
        this.setState({ itemStates: iStates });
        this.setState({ selectedItem: id });
    }

    render() {
        const { items } = this.props;
        return (
            <BrowserRouter>
                <ul className="fd-side-nav__list">
                    {items.map(item => {
                        return (
                            <li className="fd-side-nav__item" key={item.id}>
                                {item.link ? (
                                    <Link
                                        className={`fd-side-nav__link${
                                            this.state.selectedItem === item.id ? ' is-selected' : ''
                                        }${item.hasChild ? ' has-child' : ''}${
                                            this.state.itemStates[item.id] && item.hasChild ? ' is-expanded' : ''
                                        }`}
                                        to={{ pathname: item.link }}
                                        key={item.id}
                                        onClick={e => this.handleSelect(e, item.id)}
                                    >
                                        {item.glyph ? (
                                            <span
                                                className={`fd-side-nav__icon${' sap-icon--' + item.glyph} sap-icon--l`}
                                                role="presentation"
                                            />
                                        ) : null}
                                        {item.name}
                                    </Link>
                                ) : null}

                                {item.url ? (
                                    <a
                                        className={`fd-side-nav__link${
                                            this.state.selectedItem === item.id ? ' is-selected' : ''
                                        }${item.hasChild ? ' has-child' : ''}${
                                            this.state.itemStates[item.id] && item.hasChild ? ' is-expanded' : ''
                                        }`}
                                        href={item.url}
                                        key={item.id}
                                        onClick={e => this.handleSelect(e, item.id)}
                                    >
                                        {item.glyph ? (
                                            <span
                                                className={`fd-side-nav__icon${' sap-icon--' + item.glyph} sap-icon--l`}
                                                role="presentation"
                                            />
                                        ) : null}
                                        {item.name}
                                    </a>
                                ) : null}

                                {item.hasChild ? (
                                    <ul
                                        className="fd-side-nav__sublist"
                                        id={item.id}
                                        aria-hidden={!this.state.itemStates[item.id]}
                                        aria-expanded={this.state.itemStates[item.id]}
                                    >
                                        {item.child.map(ch => {
                                            return (
                                                <React.Fragment>
                                                    {ch.link ? (
                                                        <Link
                                                            className={`fd-side-nav__sublink${
                                                                this.state.selectedItem === ch.id ? ' is-selected' : ''
                                                            }`}
                                                            to={{ pathname: ch.link }}
                                                            key={ch.id}
                                                            onClick={e => this.handleSelectChild(e, ch.id)}
                                                        >
                                                            {ch.name}
                                                        </Link>
                                                    ) : null}

                                                    {ch.url ? (
                                                        <a
                                                            className={`fd-side-nav__sublink${
                                                                this.state.selectedItem === ch.id ? ' is-selected' : ''
                                                            }`}
                                                            href={ch.url}
                                                            key={ch.id}
                                                            onClick={e => this.handleSelectChild(e, ch.id)}
                                                        >
                                                            {ch.name}
                                                        </a>
                                                    ) : null}
                                                </React.Fragment>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </BrowserRouter>
        );
    }
}
SideNavList.propTypes = {
    items: PropTypes.array.isRequired
};

export const SideNavGroup = props => {
    const { title, children } = props;
    return (
        <div className="fd-side-nav__group">
            <h1 className="fd-side-nav__title">{title}</h1>
            {children}
        </div>
    );
};

SideNavGroup.propTypes = {
    title: PropTypes.string
};
