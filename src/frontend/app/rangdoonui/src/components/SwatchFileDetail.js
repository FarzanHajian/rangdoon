import React, { Component } from 'react'
import propTypes from 'prop-types';

class SwatchFileDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.swatch.name,
            colors: [...this.props.swatch.colors]
        }
    }

    render() {
        return (
            <div>
                <h6>{this.state.name}</h6>
                <div style={{display:"flex"}}>{this.state.name} has {this.state.colors.length} color(s)</div>
                
            </div>
        )
    }
}

SwatchFileDetail.propTypes = {
    swatch: propTypes.object.isRequired
}

export default SwatchFileDetail;