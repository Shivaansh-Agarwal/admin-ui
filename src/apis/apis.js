import axios from "axios";

export async function fetchUsersData(usersDispatch) {
  try {
    const response = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    usersDispatch({
      type: "INITIALIZE_USERS",
      payload: response.data,
    });
  } catch (e) {
    console.error(e.response);
  }
}
