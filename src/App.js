import { useEffect } from "react";
import { Table } from "./components";
import { useUsersContext } from "./contexts/users.context.js";
import { fetchUsersData } from "./apis/apis.js";

function App() {
  const { usersDispatch } = useUsersContext();
  useEffect(() => {
    fetchUsersData(usersDispatch);
  }, [usersDispatch]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Table />
    </div>
  );
}

export default App;
