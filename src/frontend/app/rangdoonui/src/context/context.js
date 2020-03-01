import React, { Component } from 'react';
import reducers from './reducers';

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        userId: 1,
        serverAddress: 'http://localhost:6543',
        files: [],
        dispatch: this.performDispatching.bind(this)
    }

    async performDispatching(action) {
        let tempState = this.state;
        for (let reducer of reducers) {
            tempState = await reducer(tempState, action);
        }
        this.setState(tempState);
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer