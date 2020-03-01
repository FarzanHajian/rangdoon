import React, { Component } from 'react'
import Popup from './Popup';
import { Modal, Button } from 'react-bootstrap';
import Titlebar from './Titlebar';
import FileExplorer from './FileExplorer';
import FileExplorerItem from './FileExplorerItem';
import { Context, Consumer } from '../context/context';
import { GetFileListAction } from '../context/actions';
import Loader from 'react-loader-spinner';

export default class Dashboard extends Component {
    state = {
        //show: false
        isLoading: true
    }
    // onColorChanged = (e) => {
    //     alert(e.name);
    // }

    // onPopupAccepted = () => {

    // }

    // onShowPopup = (e) => {
    //     this.setState({ show: true });
    // }

    async componentDidMount() {
        const { dispatch } = this.context;
        await dispatch(GetFileListAction())
        this.setState({ isLoading: false });
    }

    render() {
        const body = <h1>fddfgfdgdfg</h1>;

        var files = null;
        if (this.state.isLoading) {
            files =
                <Loader type="Circles" color="#0277bd" height="100" width="100" style={{ textAlign: "center" }} />
        } else {
            files =
                <Consumer>
                    {state => <FileExplorer files={state.files} />}
                </Consumer>
        }

        return (
            <div>
                <Titlebar title="Dashboard" />

                {files}

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
