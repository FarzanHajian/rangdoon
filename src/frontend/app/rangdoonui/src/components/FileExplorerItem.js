import React from 'react';
import propTypes from 'prop-types';

function FileExplorerItem(props) {
    return (
        <div className="file-explorer-item border zoom" onClick={props.onClicked.bind(this, props.fileName)} >
            <img src="/file.png" alt="" />
            <div className="text-wrap">{props.fileName}</div>
        </div>
    )
}

FileExplorerItem.propType = {
    fileName: propTypes.string.isRequired,
    onClicked: propTypes.func.isRequired
}

export default FileExplorerItem;