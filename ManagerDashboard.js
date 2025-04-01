import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ManagerDashboard = () => {
    const { users } = useAuth();
    const employees = users.filter(user => user.role === "BOTP Employee");

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <h3>Employee List</h3>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.department}</td>
                                <td>{user.score}</td>
                                <td>
                                    <Link to={`/employee/${user.id}`}>
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;