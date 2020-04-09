import React, { Component } from 'react'
import Titlebar from './Titlebar';
import FileExplorer from './FileExplorer';
import { Context, Consumer } from '../context/context';
import { GetSwatchListAction } from '../context/actions';
import Loader from 'react-loader-spinner';

export default class Dashboard extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        const { dispatch } = this.context;
        await dispatch(GetSwatchListAction())
        this.setState({ isLoading: false });
    }

    render() {
        var files = null;
        if (this.state.isLoading) {
            files =
                <Loader type="Circles" color="#0277bd" height={100} width={100} style={{ textAlign: "center" }} />
        } else {
            files =
                <Consumer>
                    {state => <FileExplorer swatches={state.swatches} />}
                </Consumer>
        }

        return (
            <div>
                <Titlebar title="Dashboard" />
                {files}
            </div>
        )
    }
}

Dashboard.contextType = Context;
