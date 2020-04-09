import React from 'react';
import propTypes from 'prop-types';

function FileExplorerItem(props) {
    return (
        <div className="file-explorer-item border zoom" onClick={props.onClick.bind(this, props.fileName)} >
            <img src="/file.png" alt="" />
            <div className="text-wrap">{props.fileName}</div>
        </div>
    )
}

FileExplorerItem.propType = {
    key: propTypes.string.isRequired,
    fileName: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired
}

export default FileExplorerItem;