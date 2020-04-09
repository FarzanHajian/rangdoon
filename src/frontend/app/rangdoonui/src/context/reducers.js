import { GET_SWATCH_LIST, GET_SWATCH, CLEAR_CURRENT_SWATCH } from './actions';
import axios from "axios";

const swatchReducer = async (state, action) => {
    let response;

    switch (action.type) {
        case GET_SWATCH_LIST:
            response = await axios.get(`${state.serverAddress}/users/${state.userId}/swatches`);
            return {
                ...state,
                swatches: response.data
            };

        case GET_SWATCH:
            response = await axios.get(`${state.serverAddress}/users/${state.userId}/swatches/${action.payload}`);
            return {
                ...state,
                currentSwatch: response.data
            };

        case CLEAR_CURRENT_SWATCH:
            return {
                ...state,
                currentSwatch: null
            }

        default:
            return state;
    }
}

const reducers = [swatchReducer];

export default reducers;

