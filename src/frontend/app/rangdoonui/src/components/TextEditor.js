import React, { Component } from 'react';
import propTypes from 'prop-types';
import EditButton from './EditButton';
import { TextField } from '@material-ui/core';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.initialText, isEditMode: false };
    }


    onBeginEdit = () => {
        this.setState({ isEditMode: true });
    }

    onEditAccepted = () => {
        this.setState({ isEditMode: false });
        this.props.onEdit(this.state.text);
    }

    onEditCanceled = () => {
        this.setState({ isEditMode: false, text: this.props.initialText });
    }

    onTextChanged = (e) => {
        this.setState({text: e.target.value});
    }

    render() {
        const { isEditMode, text } = this.state;
        let textEditor;

        if (isEditMode) {
            textEditor = <TextField className="text-editor-text" size="small" value={text} onChange={this.onTextChanged} />;
        } else {
            textEditor = <TextField className="text-editor-text" size="small" value={text} disabled />;
        }

        return (
            <div>
                {textEditor}
                <EditButton onEdit={this.onBeginEdit} onAccept={this.onEditAccepted} onCancel={this.onEditCanceled} />
            </div>
        )
    }
}

TextEditor.propTypes = {
    initialText: propTypes.string,
    onEdit: propTypes.func.isRequired
}

TextEditor.defaultProps = {
    initialText: ""
}


export default TextEditor;