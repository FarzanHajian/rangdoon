import React from 'react';
import propTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function Popup(props) {
    let { show, header, body, onAccept, onCancel } = props;

    if (header instanceof String) {
        header = (<h5>{header}</h5>);
    }

    return (
        <Modal size="lg" aria-labelledby="modal-title" centered show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">{header}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{body}</Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={onAccept}>Ok</button>
            </Modal.Footer>
        </Modal>
    );
}

Popup.propType = {
    show: propTypes.bool.isRequired,
    header: propTypes.oneOfType([propTypes.string, propTypes.elementType]),
    body: propTypes.elementType.isRequired,
    footer: propTypes.elementType,
    onAccept: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired
}

export default Popup;