import React, { Component } from 'react'
import Popup from './Popup';
import { Modal, Button } from 'react-bootstrap';
import Titlebar from './Titlebar';
import FileExplorer from './FileExplorer';
import FileExplorerItem from './FileExplorerItem';
import { Context, Consumer } from '../context/context';
import { GetFileListAction } from '../context/actions';

export default class Dashboard extends Component {
    // state = {
    //     show: false
    // }
    // onColorChanged = (e) => {
    //     alert(e.name);
    // }

    // onPopupAccepted = () => {

    // }

    // onShowPopup = (e) => {
    //     this.setState({ show: true });
    // }

    componentWillMount() {
        const {dispatch} = this.context;
        dispatch(GetFileListAction())
    }

    render() {
        const body = <h1>fddfgfdgdfg</h1>;

        return (
            <div>
                <Titlebar title="Dashboard" />

                <Consumer>
                    {state => {
                        const {files} = state;
                        return <FileExplorer files={files} />
                    }}
                </Consumer>

                {/* <button className="btn btn-primary" type="button" onClick={this.onShowPopup}>
                    Launch demo modal
                </button>

                <Popup body={body} show={this.state.show}>
                </Popup> */}



            </div>
        )
    }
}

Dashboard.contextType = Context;
