import React, { Component } from 'react';
import propTypes from 'prop-types';
import FileExplorerItem from './FileExplorerItem';

class FileExplorer extends Component {

    onItemClicked = (fileName, e) => {
        alert(`Edit file ${fileName}`);
    }

    render() {
        const { files } = this.props;
        return (
            <div>
                {files.map((file) => (<FileExplorerItem fileName={file} onClicked={this.onItemClicked} />))}
            </div>
        )
    }
}

FileExplorer.propType = {
    files: propTypes.arrayOf(propTypes.string).isRequired
}

export default FileExplorer;