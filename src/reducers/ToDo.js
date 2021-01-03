import { GET_DATA_SUCCESS} from '../constants/ActionTypes';


const INIT_STATE = {
  formData: [],
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        formData: action.payload,
      }
    }
    default:
      return state;
  }
}