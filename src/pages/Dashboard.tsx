import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/slices/authSlice";
import { fetchUsers } from "../../src/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { User } from "../../src/types/User";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-green-100">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome To Dashboard
          </h2>
          <h2 className="text-2xl font-semibold mb-4">List Of Users</h2>

          {status === "loading" && <p>Loading users...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user: User) => (
                <li
                  key={user.id}
                  className="bg-gray-50 shadow-lg rounded p-4 flex items-center space-x-4"
                >
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {user.first_name} {user.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
