import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


function Titlebar(props) {
    return (
        <Fragment>
            <h5>{props.title}</h5>
            <br/>
        </Fragment>
    )
}

Titlebar.propTypes = {
    title: PropTypes.string.isRequired
}

export default Titlebar;