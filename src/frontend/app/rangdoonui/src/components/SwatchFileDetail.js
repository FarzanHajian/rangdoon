import React, { Component } from 'react'
import propTypes from 'prop-types';

class SwatchFileDetail extends Component {
    constructor(props) {
        super(props)

        this.setStateByProps();
    }

    setStateByProps = () => {
        this.state = {
            name = this.props.name,
            colors: [...this.props.colors]
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

SwatchFileDetail.propTypes = {
    swatch: propTypes.object.isRequired
}

export default SwatchFileDetail;