import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "@/api/auth";
import { useGetUserEmailListQuery } from "@/api/users";

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { mutate: onLogout } = useLogoutMutation();

  const logoutHandler = () => {
    onLogout();
  };

  const { data: userEmailList, isLoading } = useGetUserEmailListQuery();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-5 flex items-center justify-between">
        <Link className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-blue-700" to="/create">
          Create data
        </Link>
        <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr> */}
              {userEmailList? userEmailList?.data?.map((list, index) => {
                    return <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{list.email_to}</td>
                    </tr>
                  })
                : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
