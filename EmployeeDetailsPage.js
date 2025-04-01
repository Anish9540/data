import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EmployeeDetailsPage = () => {
    const { id } = useParams();
    const { users } = useAuth();
    const employee = users.find(u => u.id === parseInt(id));

    if (!employee) return <p>Employee not found</p>;

    return (
        <div>
            <h2>{employee.name}'s Details</h2>

            <div>
                <div>Email:</div>
                <div>{employee.email}</div>

                <div>Role:</div>
                <div>{employee.role}</div>

                <div>Department:</div>
                <div>{employee.department}</div>

                <div>Join Date:</div>
                <div>{employee.joinDate}</div>

                <div>Employee ID:</div>
                <div>{employee.id}</div>

                <div>Performance Score:</div>
                <div>{employee.score ?? "N/A"}</div>

                {employee.performanceMetrics && (
                    <>
                        <div>Performance Metrics:</div>

                        <div>Calls Handled:</div>
                        <div>{employee.performanceMetrics.callsHandled}</div>

                        <div>Customer Satisfaction:</div>
                        <div>{employee.performanceMetrics.customerSatisfaction}%</div>

                        <div>Average Response Time:</div>
                        <div>{employee.performanceMetrics.responseTime}</div>

                        <div>Tickets Closed:</div>
                        <div>{employee.performanceMetrics.closedTickets}</div>
                    </>
                )}
            </div>

            <div>
                <Link to="/manager">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;