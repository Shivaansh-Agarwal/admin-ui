export function usersReducer(prevState, action) {
  switch (action.type) {
    case "INITIALIZE_USERS":
      return {
        ...prevState,
        users: action.payload.map((user) => {
          return { ...user, isDeleted: false, isSelected: false };
        }),
      };
    case "DELETE_MULTIPLE_USERS":
      return {
        ...prevState,
        users: prevState.users.map((user) => {
          if (action.payload.includes(user.id + "")) {
            return { ...user, isDeleted: true, isSelected: false };
          }
          return { ...user };
        }),
      };
    case "DELETE_USER":
      return {
        ...prevState,
        users: prevState.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, isDeleted: true };
          }
          return { ...user };
        }),
      };
    case "SEARCH_USERS":
      return {
        ...prevState,
        searchString: action.payload,
      };
    case "CHANGE_PAGE":
      return { ...prevState, currentPage: action.payload };
    case "EDIT_USER_DETAILS":
      return {
        ...prevState,
        users: prevState.users.map((user) => {
          if (user.id === action.payload.id) {
            const { name, email, role } = action.payload;
            return { ...user, name, email, role };
          }
          return { ...user };
        }),
      };
    case "SELECT_ROWS":
      return {
        ...prevState,
        users: prevState.users.map((user) => {
          if (action.payload.includes(user.id)) {
            return { ...user, isSelected: true };
          }
          return { ...user };
        }),
      };
    case "UNSELECT_ROWS":
      return {
        ...prevState,
        users: prevState.users.map((user) => {
          if (action.payload.includes(user.id)) {
            return { ...user, isSelected: false };
          }
          return { ...user };
        }),
      };
    default:
      throw new Error("Please select correct action type");
  }
}
