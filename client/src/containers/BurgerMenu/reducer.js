import { TOGGLE_MENU } from './actions';

const initialState = {
  isOpen: false,
};

const burgerMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export default burgerMenuReducer;
