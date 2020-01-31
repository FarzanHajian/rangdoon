import React, { Component } from 'react'
import ColorDetail from './ColorDetail'

export default class Dashboard extends Component {
    onColorChanged = (e) => {
        alert(e.name);
    }
    render() {
        return (
            <div>
                Dashboard
                <br />
                <ColorDetail red="12" green="100" blue="150" name="Blueish" onChanged={this.onColorChanged}></ColorDetail>
            </div>
        )
    }
}
