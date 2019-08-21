const savedWeathers = (state = [], action) => {
  switch (action.type) {
    case "ADD_CITY":
      const newState = [...state];
      newState.push(action.city);
      return newState;

    case "REMOVE_CITY":
      state.splice(action.cityIndex, 1);
      return [...state];

    default:
      return state;
  }
};

export default savedWeathers;
