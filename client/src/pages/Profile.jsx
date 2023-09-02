import { useGetUsersQuery } from "../redux/api/usersApiSlice";

export default function Profile() {
  const { isLoading, isError, error, data: users } = useGetUsersQuery();
  console.log(users);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.userAccount.username}</li>
          ))}
        </ul>
      )}
    </>
  );
}
