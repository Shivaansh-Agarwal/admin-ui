import { createContext, useContext, useReducer } from "react";
import { usersReducer } from "../reducers/users.reducer.js";

const UsersContext = createContext(null);

export const UsersProvider = function ({ children }) {
  const initalState = {
    users: [],
    selectedUsersId: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchString: "",
  };
  const [usersState, usersDispatch] = useReducer(usersReducer, initalState);
  return (
    <UsersContext.Provider value={{ usersState, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = function () {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("Please use useUsersConext inside UsersProvider");
  }
  return context;
};
