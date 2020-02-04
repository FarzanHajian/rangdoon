import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { rgbToHex } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';

class ColorDetail extends Component {
    constructor(props) {
        super(props);

        this.setStateByProps();
        this.setInitialState();
    }

    onEdit = () => {
        this.setState({ isEditMode: true });
    }

    onAccept = () => {
        this.setState({ isEditMode: false });

        if (this.state.name !== this.initialState.name) {
            this.setInitialState();
            this.props.onChanged({ name: this.state.name });
        }
    }

    onCancel = () => {
        this.setState({ name: this.initialState.name, isEditMode: false });
    }

    onNameChanged = (e) => this.setState({ name: e.target.value });

    setStateByProps=()=>{
        const colorNumber = rgbToHex(this.props.red, this.props.green, this.props.blue);
        this.state = {
            name: this.props.name,
            color: `#${colorNumber}`,
            isEditMode: false
        };
    }

    setInitialState = () => {
        if (this.initialState === undefined) {
            this.initialState = {
                name: this.state.name
            };
        } else {
            this.initialState.name = this.state.name
        }
    }

    render() {
        const { name, color, isEditMode } = this.state;
        let buttons, nameEditor;
        if (isEditMode) {
            buttons = (
                <Fragment>
                    <FontAwesomeIcon className="color-detail-edit image-button" icon={faCheck} onClick={this.onAccept} />
                    <FontAwesomeIcon className="color-detail-undo image-button" icon={faUndoAlt} onClick={this.onCancel} />
                </Fragment>
            );

            nameEditor = <TextField className="color-detail-name" size="small" value={name} onChange={this.onNameChanged} />;
        } else {
            buttons = <FontAwesomeIcon className="color-detail-edit image-button" icon={faPencilAlt} onClick={this.onEdit} />;
            nameEditor = <TextField className="color-detail-name" size="small" value={name} disabled />;
        }

        return (
            <div className="color-detail-container">
                <svg>
                    <rect className="color-detail-thumbnail" style={{ fill: color }} />
                </svg>
                <span className="color-detail-number" style={{ color }}>{color}</span>
                {nameEditor}
                {buttons}
            </div>
        )
    }
}

ColorDetail.propTypes = {
    name: propTypes.string.isRequired,
    red: propTypes.number.isRequired,
    green: propTypes.number.isRequired,
    blue: propTypes.number.isRequired,
    onChanged: propTypes.func.isRequired
}

ColorDetail.defaultProps = {
    name: "Untitled"
}

export default ColorDetail;