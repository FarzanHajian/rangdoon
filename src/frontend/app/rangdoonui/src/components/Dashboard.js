import React, { Component } from 'react'
import Popup from './Popup';
import { Modal,Button } from 'react-bootstrap';

export default class Dashboard extends Component {
    onColorChanged = (e) => {
        alert(e.name);
    }

    onPopupAccepted = () => {

    }


    render() {
        const body = <h1>fddfgfdgdfg</h1>;
        return (
            <div>
                Dashboard
                <br />

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Launch demo modal
                </button>

                <Popup body={body} show="true">
                </Popup>



            </div>
        )
    }

}
