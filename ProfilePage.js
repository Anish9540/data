import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ ...currentUser });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleMetricsChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            performanceMetrics: {
                ...updatedProfile.performanceMetrics,
                [name]: name === 'customerSatisfaction' ?
                    Math.min(100, Math.max(0, parseInt(value) || 0)) :
                    value
            }
        });
    };

    const handleSubmit = () => {
        updateUserProfile(updatedProfile);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div>
                <div>
                    <h2>User Profile</h2>
                    <button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>

                <div>
                    <div>Name:</div>
                    <div>{currentUser.name}</div>

                    <div>Email:</div>
                    <div>{currentUser.email}</div>

                    <div>Role:</div>
                    <div>{currentUser.role}</div>

                    <div>Department:</div>
                    <div>{currentUser.department}</div>

                    <div>Join Date:</div>
                    <div>{currentUser.joinDate}</div>

                    <div>Employee ID:</div>
                    <div>{currentUser.id}</div>

                    {currentUser.role === "BOTP Employee" && (
                        <>
                            <div>Score:</div>
                            <div>{currentUser.score}</div>

                            <div>Performance Metrics:</div>

                            <div>Calls Handled:</div>
                            <div>{currentUser.performanceMetrics.callsHandled}</div>

                            <div>Customer Satisfaction:</div>
                            <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>

                            <div>Avg. Response Time:</div>
                            <div>{currentUser.performanceMetrics.responseTime}</div>

                            <div>Tickets Closed:</div>
                            <div>{currentUser.performanceMetrics.closedTickets}</div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Edit Profile</h2>

            <div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedProfile.name}
                        onChange={handleChange}
                    />

                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={updatedProfile.department}
                        onChange={handleChange}
                    />

                    {currentUser.role === "BOTP Employee" && (
                        <>
                            <label>Score:</label>
                            <input
                                type="number"
                                name="score"
                                value={updatedProfile.score}
                                onChange={handleChange}
                                min="0"
                                max="100"
                            />

                            <div>
                                <h3>Performance Metrics</h3>
                            </div>

                            <label>Calls Handled:</label>
                            <input
                                type="number"
                                name="callsHandled"
                                value={updatedProfile.performanceMetrics.callsHandled}
                                onChange={handleMetricsChange}
                                min="0"
                            />

                            <label>Customer Satisfaction (%):</label>
                            <input
                                type="number"
                                name="customerSatisfaction"
                                value={updatedProfile.performanceMetrics.customerSatisfaction}
                                onChange={handleMetricsChange}
                                min="0"
                                max="100"
                            />

                            <label>Response Time:</label>
                            <input
                                type="text"
                                name="responseTime"
                                value={updatedProfile.performanceMetrics.responseTime}
                                onChange={handleMetricsChange}
                            />

                            <label>Tickets Closed:</label>
                            <input
                                type="number"
                                name="closedTickets"
                                value={updatedProfile.performanceMetrics.closedTickets}
                                onChange={handleMetricsChange}
                                min="0"
                            />
                        </>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setUpdatedProfile({ ...currentUser });
                        }}
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;