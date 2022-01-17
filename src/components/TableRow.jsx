import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit, FiSave } from "react-icons/fi";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useUsersContext } from "../contexts/users.context";

export function TableRow({
  id,
  name = "",
  email = "",
  role = "",
  isSelected = false,
}) {
  const { usersDispatch } = useUsersContext();
  const [username, setUsername] = useState(name);
  const [useremail, setUseremail] = useState(email);
  const [userrole, setUserrole] = useState(role);
  const [areFieldsEditable, setAreFieldsEditable] = useState(false);
  return (
    <li className="flex flex-row w-full py-4 border-b-2">
      <div className="w-1/5 flex items-center text-lg">
        <button
          onClick={() => {
            if (isSelected) {
              usersDispatch({
                type: "UNSELECT_ROWS",
                payload: [id],
              });
            } else {
              usersDispatch({
                type: "SELECT_ROWS",
                payload: [id],
              });
            }
          }}
        >
          {isSelected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
      </div>
      <div className="w-1/5">
        {areFieldsEditable ? (
          <input
            className="border"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        ) : (
          username
        )}
      </div>
      <div className="w-1/5">
        {areFieldsEditable ? (
          <input
            className="border"
            type="text"
            value={useremail}
            onChange={(e) => {
              setUseremail(e.target.value);
            }}
          />
        ) : (
          useremail
        )}
      </div>
      <div className="w-1/5">
        {areFieldsEditable ? (
          <input
            className="border"
            type="text"
            value={userrole}
            onChange={(e) => {
              setUserrole(e.target.value);
            }}
          />
        ) : (
          userrole
        )}
      </div>
      <div className="flex justify-start w-1/5">
        {areFieldsEditable ? (
          <button
            className="text-lg"
            onClick={() => {
              setAreFieldsEditable(false);
              usersDispatch({
                type: "EDIT_USER_DETAILS",
                payload: {
                  id: id,
                  name: username,
                  email: useremail,
                  role: userrole,
                },
              });
            }}
          >
            <FiSave />
          </button>
        ) : (
          <button
            className="text-lg"
            onClick={() => {
              setAreFieldsEditable(true);
            }}
          >
            <FiEdit />
          </button>
        )}
        <button
          className="text-lg ml-4 text-red-500"
          onClick={() => {
            usersDispatch({
              type: "DELETE_USER",
              payload: id,
            });
          }}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
