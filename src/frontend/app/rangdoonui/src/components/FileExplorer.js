import React, { Component } from 'react';
import propTypes from 'prop-types';
import FileExplorerItem from './FileExplorerItem';
import { Context } from '../context/context';
import { GetSwatchAction, ClearCurrentSwatchAction } from '../context/actions';
import Popup from './Popup';
import SwatchFileDetail from './SwatchFileDetail';
import { showSuccess } from '../utils';

class FileExplorer extends Component {
    state = {
        showSwatchDetail: false
    }

    onItemClicked = async (fileName, e) => {
        const { dispatch } = this.context;
        await dispatch(GetSwatchAction(fileName));
        this.toggleSwatchDetail(true);
    }

    onPopupAccepted = async () => {
        const { dispatch } = this.context;
        this.toggleSwatchDetail(false);
        await dispatch(ClearCurrentSwatchAction())
    }

    onPopupCanceled = async () => {
        const { dispatch } = this.context;
        this.toggleSwatchDetail(false);
        await dispatch(ClearCurrentSwatchAction())
    }

    onPopupDeleted = async (name) => {
        await this.onPopupAccepted();
        showSuccess(`${name} deleted`);
    }

    toggleSwatchDetail = (show) => this.setState({ showSwatchDetail: show });

    render() {
        const { swatches } = this.props;
        const { showSwatchDetail } = this.state;
        const body = showSwatchDetail ? <SwatchFileDetail swatch={this.context.currentSwatch} onDeleted={this.onPopupDeleted} /> : null;
        const header = showSwatchDetail ? `Details of ${this.context.currentSwatch.name}` : null;

        return (
            <div>
                <Popup body={body} header={header} show={showSwatchDetail} onAccept={this.onPopupAccepted} onCancel={this.onPopupCanceled} />
                {swatches.map((file) => (<FileExplorerItem key={file} fileName={file} onClick={this.onItemClicked} />))}
            </div>
        )
    }
}

FileExplorer.propType = {
    swatches: propTypes.arrayOf(propTypes.string).isRequired
}

FileExplorer.contextType = Context;

export default FileExplorer;