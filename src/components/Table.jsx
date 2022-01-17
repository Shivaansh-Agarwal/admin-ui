import { Pagination } from "./Pagination.jsx";
import { TableHeader } from "./TableHeader.jsx";
import { TableRow } from "./TableRow.jsx";
import { useUsersContext } from "../contexts/users.context.js";
import { useState } from "react";

export function Table() {
  const { usersState, usersDispatch } = useUsersContext();
  const { itemsPerPage, currentPage } = usersState;
  const [headerCheckboxSelected, setHeaderCheckboxSelected] = useState(false);

  const { users, searchString } = usersState;
  const filteredData = users.filter((user) => {
    const { name, email, role, isDeleted } = user;
    if (
      (name.includes(searchString) ||
        email.includes(searchString) ||
        role.includes(searchString)) &&
      isDeleted === false
    ) {
      return true;
    } else {
      return false;
    }
  });

  const lastIndexOnCurrentPage = itemsPerPage * currentPage;
  const firstIndexOnCurrentPage = lastIndexOnCurrentPage - itemsPerPage;
  const currentPageData = filteredData.slice(
    firstIndexOnCurrentPage,
    lastIndexOnCurrentPage
  );
  const currentPageUserIdsList = currentPageData.map((user) => user.id);
  let selectedUsersIds = currentPageData
    .filter((user) => user.isSelected)
    .map((user) => user.id);

  return (
    <div className="flex flex-col w-4/6 h-4/5">
      <input
        type="text"
        className="border w-full p-2 mb-2"
        placeholder="Search by name, email or role"
        onChange={(e) => {
          usersDispatch({
            type: "SEARCH_USERS",
            payload: e.target.value,
          });
        }}
      />
      <TableHeader
        currentPageUserIdsList={currentPageUserIdsList}
        headerCheckboxSelected={headerCheckboxSelected}
        setHeaderCheckboxSelected={setHeaderCheckboxSelected}
      />
      <ul>
        {currentPageData.map((item) => {
          const { id, name, email, role, isSelected } = item;
          return (
            <TableRow
              key={id}
              id={id}
              name={name}
              email={email}
              role={role}
              isSelected={isSelected}
            />
          );
        })}
      </ul>
      <div className="relative mt-auto">
        <Pagination
          dataLength={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
        {selectedUsersIds.length > 0 ? (
          <button
            className="absolute border top-4 bg-red-500 text-white py-2 px-4 rounded-full"
            onClick={() => {
              usersDispatch({
                type: "DELETE_MULTIPLE_USERS",
                payload: selectedUsersIds,
              });
              setHeaderCheckboxSelected(false);
            }}
          >
            Delete Selected
          </button>
        ) : null}
      </div>
    </div>
  );
}
