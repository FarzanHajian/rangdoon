import React, { useState, Fragment } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

function EditButton(props) {
    const [isEditMode, setIsEditMode] = useState(false);
    let buttons;

    const onAccept = () => {
        setIsEditMode(false);
        if (props.onAccept !== undefined) props.onAccept();
    }

    const onCancel = () => {
        setIsEditMode(false);
        if (props.onCancel !== undefined) props.onCancel();
    }

    const onEdit = () => {
        setIsEditMode(true);
        if (props.onEdit !== undefined) props.onEdit();
    }

    if (isEditMode) {
        buttons = (
            <Fragment>
                <FontAwesomeIcon className="edit-button-edit image-button" icon={faCheck} onClick={onAccept} />
                <FontAwesomeIcon className="edit-button-cancel image-button" icon={faUndoAlt} onClick={onCancel} />
            </Fragment>
        );
    } else {
        buttons = <FontAwesomeIcon className="edit-button-edit image-button" icon={faPencilAlt} onClick={onEdit} />;
    }

    return (
        <div className="edit-button-container">
            {buttons}
        </div>
    )
}

EditButton.protoTypes = {
    onEdit: propTypes.func,
    onAccept: propTypes.func,
    onCancel: propTypes.func
};

export default EditButton;
