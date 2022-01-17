import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useUsersContext } from "../contexts/users.context";

export function TableHeader({
  currentPageUserIdsList,
  headerCheckboxSelected,
  setHeaderCheckboxSelected,
}) {
  const { usersDispatch } = useUsersContext();
  return (
    <div className="flex flex-row w-full py-4 border-b-2">
      <div className="w-1/5 flex items-center text-lg">
        <button
          onClick={() => {
            if (headerCheckboxSelected) {
              usersDispatch({
                type: "UNSELECT_ROWS",
                payload: currentPageUserIdsList,
              });
            } else {
              usersDispatch({
                type: "SELECT_ROWS",
                payload: currentPageUserIdsList,
              });
            }
            setHeaderCheckboxSelected((isSelected) => !isSelected);
          }}
        >
          {headerCheckboxSelected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
      </div>
      <div className="w-1/5 font-bold">Name</div>
      <div className="w-1/5 font-bold">Email</div>
      <div className="w-1/5 font-bold">Role</div>
      <div className="w-1/5 font-bold">Actions</div>
    </div>
  );
}
