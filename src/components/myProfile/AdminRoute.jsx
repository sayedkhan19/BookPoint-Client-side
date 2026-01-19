import { Navigate } from "react-router";
import useAuth from "../useAuth";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/admin/${user.email}`)
        .then(res => res.json())
        .then(data => setIsAdmin(data.admin));
    }
  }, [user]);

  if (isAdmin === null) return <p>Loading...</p>;

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
