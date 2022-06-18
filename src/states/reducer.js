export default function reducer(prevState, action) {
  let cachedState;
  switch (action.type) {
    case "LOG_IN":
      cachedState = {
        ...prevState,
        userData: action.userData,
        isLoggedIn: true,
      };
      break;
    case "LOG_OUT":
      cachedState = {
        ...prevState,
        userData: action.userData,
        isLoggedIn: false,
      };
      break;
    default:
      cachedState = prevState;
  }

  // cached the data to prevent lost data after refreshing
  localStorage.setItem("state", JSON.stringify(cachedState));
  return cachedState;
}
