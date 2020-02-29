import { GET_FILE_LIST } from './actions';
import axios from "axios";

const fileReducer = async (state, action) => {
    switch (action.type) {
        case GET_FILE_LIST:
            const response = await axios.get(`${state.serverAddress}/files`);
            //const response = {'data':['sdsd.txt', 'rrrr.txt']};
            return {
                ...state,
                files: response.data
            };
        default:
            return state;
    }
}

const reducers = [fileReducer];

export default reducers;

