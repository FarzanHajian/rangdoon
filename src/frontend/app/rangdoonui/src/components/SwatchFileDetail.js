import React, { Component } from 'react'
import propTypes from 'prop-types';
import { DeleteSwatchAction } from "../context/actions"
import { Context } from '../context/context';
import ColorDetail from './ColorDetail';
import TextEditor from './TextEditor';

class SwatchFileDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.swatch.name,
            colors: [...this.props.swatch.colors]
        }
    }

    onDeleteClicked = async () => {
        const { dispatch } = this.context;
        const { name } = this.state;
        await dispatch(DeleteSwatchAction(name));
        this.props.onDeleted(name);
    }

    onNameEdited = async (name) => {
        alert(name)
    }

    render() {
        const { name, colors } = this.state;
        return (
            <div>
                <div className="row" style={{ margin: "10px 10px 30px 10px" }} >
                    <TextEditor initialText={name} onEdit={this.onNameEdited} />
                </div>
                <div className="row swatch-file-detail-container">
                    {
                        colors.map((color) => {
                            const { name, red, green, blue } = color;
                            return (<ColorDetail key={name} name={name} red={red} green={green} blue={blue} />);
                        })
                    }
                </div>
                <button className="btn btn-danger" style={{ float: "right" }} onClick={this.onDeleteClicked}>Delete Swatch</button>
            </div>
        )
    }
}

SwatchFileDetail.propTypes = {
    swatch: propTypes.object.isRequired,
    onDeleted: propTypes.func.isRequired
}

SwatchFileDetail.contextType = Context;

export default SwatchFileDetail;