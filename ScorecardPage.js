import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ScorecardPage = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [scoreData, setScoreData] = useState({
        score: currentUser.score,
        callsHandled: currentUser.performanceMetrics?.callsHandled || 0,
        customerSatisfaction: currentUser.performanceMetrics?.customerSatisfaction || 0,
        responseTime: currentUser.performanceMetrics?.responseTime || "0 min",
        closedTickets: currentUser.performanceMetrics?.closedTickets || 0
    });

    // Only BOTP Employees have performance metrics
    if (currentUser.role !== "BOTP Employee") {
        return <div>This page is not available for your role.</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScoreData({
            ...scoreData,
            [name]: name === 'customerSatisfaction' ?
                Math.min(100, Math.max(0, parseInt(value) || 0)) :
                value
        });
    };

    const handleSubmit = () => {
        const updatedUser = {
            ...currentUser,
            score: parseInt(scoreData.score),
            performanceMetrics: {
                callsHandled: parseInt(scoreData.callsHandled),
                customerSatisfaction: parseInt(scoreData.customerSatisfaction),
                responseTime: scoreData.responseTime,
                closedTickets: parseInt(scoreData.closedTickets)
            }
        };

        updateUserProfile(updatedUser);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div>
                <div>
                    <h2>Performance Scorecard</h2>
                    <button onClick={() => setIsEditing(true)}>
                        Update Score
                    </button>
                </div>

                <div>
                    <div>
                        <div>{currentUser.score}</div>
                    </div>
                    <p>Overall Performance Score</p>
                </div>

                <h3>Performance Metrics</h3>

                <div>
                    <div>
                        <div>Calls Handled</div>
                        <div>{currentUser.performanceMetrics.callsHandled}</div>
                    </div>

                    <div>
                        <div>Customer Satisfaction</div>
                        <div>{currentUser.performanceMetrics.customerSatisfaction}%</div>
                    </div>

                    <div>
                        <div>Avg. Response Time</div>
                        <div>{currentUser.performanceMetrics.responseTime}</div>
                    </div>

                    <div>
                        <div>Tickets Closed</div>
                        <div>{currentUser.performanceMetrics.closedTickets}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Update Performance Scorecard</h2>

            <div>
                <div>
                    <label>Overall Score:</label>
                    <input
                        type="number"
                        name="score"
                        value={scoreData.score}
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
                        value={scoreData.callsHandled}
                        onChange={handleChange}
                        min="0"
                    />

                    <label>Customer Satisfaction (%):</label>
                    <input
                        type="number"
                        name="customerSatisfaction"
                        value={scoreData.customerSatisfaction}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />

                    <label>Response Time:</label>
                    <input
                        type="text"
                        name="responseTime"
                        value={scoreData.responseTime}
                        onChange={handleChange}
                    />

                    <label>Tickets Closed:</label>
                    <input
                        type="number"
                        name="closedTickets"
                        value={scoreData.closedTickets}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                <div>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setScoreData({
                                score: currentUser.score,
                                callsHandled: currentUser.performanceMetrics.callsHandled,
                                customerSatisfaction: currentUser.performanceMetrics.customerSatisfaction,
                                responseTime: currentUser.performanceMetrics.responseTime,
                                closedTickets: currentUser.performanceMetrics.closedTickets
                            });
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

export default ScorecardPage;