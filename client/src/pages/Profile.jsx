import { useGetUsersQuery } from "../redux/api/usersApiSlice";

export default function Profile() {
    const {isLoading,isError,error,data} =useGetUsersQuery()
    console.log(data)
    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>
                    {data.map((user) => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>
            )}
        </>
    );
}
