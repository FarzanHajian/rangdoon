import React from 'react';
import propTypes from 'prop-types';
import {Modal} from 'react-bootstrap';

function Popup(props) {
    let { show, header, body, onAccept } = props;

    if (header instanceof String) {
        header = (<h5>{header}</h5>);
    }

    return (
        <Modal size="lg" aria-labelledby="modal-title" centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    {header}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={onAccept}>Save changes</button>
            </Modal.Footer>
        </Modal>
    );
}

Popup.propType = {
    show: propTypes.bool.isRequired,
    header: propTypes.oneOfType([propTypes.string, propTypes.elementType]),
    body: propTypes.elementType.isRequired,
    footer: propTypes.elementType,
    onAccept: propTypes.func
}

export default Popup;