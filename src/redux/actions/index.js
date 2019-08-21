export const addCityToList = city => ({
  type: "ADD_CITY",
  city
});

export const removeCityFromList = cityIndex => ({
  type: "REMOVE_CITY",
  cityIndex
});
