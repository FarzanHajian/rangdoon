import React, { Component } from 'react'
import propTypes from 'prop-types';
import {DeleteSwatchAction} from "../context/actions"
import { Context } from '../context/context';

class SwatchFileDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.swatch.name,
            colors: [...this.props.swatch.colors]
        }
    }

    onDeleteClicked = async () => {
        const { dispatch } = this.context;
        const { name } = this.state;
        await dispatch(DeleteSwatchAction(name));
        this.props.onDeleted(name);
    }

    render() {
        return (
            <div>
                <h6>{this.state.name}</h6>
                <div style={{display:"flex"}}>{this.state.name} has {this.state.colors.length} color(s)</div>
                <button className="btn btn-danger" style={{float:"right"}} onClick={this.onDeleteClicked}>Delete</button>
            </div>
        )
    }
}

SwatchFileDetail.propTypes = {
    swatch: propTypes.object.isRequired,
    onDeleted: propTypes.func.isRequired
}

SwatchFileDetail.contextType = Context;

export default SwatchFileDetail;