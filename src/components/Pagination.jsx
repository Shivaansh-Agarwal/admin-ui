import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { useUsersContext } from "../contexts/users.context";

export function Pagination({ dataLength, itemsPerPage, currentPage }) {
  const { usersState, usersDispatch } = useUsersContext();
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const pagesButtonsList = [];
  for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
    pagesButtonsList.push(
      <button
        className={`${
          currentPage === pageNo
            ? "bg-white text-blue-500"
            : "bg-blue-500 text-white"
        } mx-4 w-10 h-10 rounded-full flex justify-center items-center border border-blue-500`}
        key={pageNo}
        onClick={() => {
          usersDispatch({
            type: "CHANGE_PAGE",
            payload: pageNo,
          });
        }}
      >
        {pageNo}
      </button>
    );
  }

  return (
    <div className="w-full flex flex-row justify-center py-4 mt-auto">
      <PageButton
        payload={1}
        condition={currentPage === 1 || totalPages === 0}
        icon={<AiOutlineDoubleLeft />}
      />
      <PageButton
        payload={usersState.currentPage - 1}
        condition={currentPage === 1 || totalPages === 0}
        icon={<AiOutlineLeft />}
      />
      {pagesButtonsList}
      <PageButton
        payload={usersState.currentPage + 1}
        condition={currentPage === totalPages || totalPages === 0}
        icon={<AiOutlineRight />}
      />
      <PageButton
        payload={totalPages}
        condition={currentPage === totalPages || totalPages === 0}
        icon={<AiOutlineDoubleRight />}
      />
    </div>
  );
}

const PageButton = ({ payload, condition, icon }) => {
  const { usersDispatch } = useUsersContext();
  return (
    <button
      onClick={() => {
        usersDispatch({
          type: "CHANGE_PAGE",
          payload: payload,
        });
      }}
      disabled={condition}
      className={`mx-4 w-10 h-10 border rounded-full flex justify-center items-center ${
        condition
          ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
          : "bg-blue-500 text-white border-blue-400 cursor-pointer"
      }`}
    >
      {icon}
    </button>
  );
};
