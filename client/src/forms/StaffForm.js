import React from "react";
import { useState, useEffect } from "react";
import baseUrl from "../base-url/base-url";
import "../css/forms.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const params = window.location.search;
const memberId = new URLSearchParams(params).get("userId");
const evaluationMonth = new URLSearchParams(params).get("month");

export default function StaffForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [enableSelectManager, setEnableSelectManager] = useState(true);

    const [memberName, setMemberName] = useState("");

    const [selectFieldBranchValue, setSelectFieldBranchValue] = useState("");
    const [selectFieldMemberId, setSelectFieldManagerId] = useState("");
    const [workQuality, setWorkQuality] = useState("");
    const [workQualityReason, setWorkQualityReason] = useState("");
    const [taskCompletion, setTaskCompletion] = useState("");
    const [taskCompletionReason, setTaskCompletionReason] = useState("");
    const [overAndAbroad, setOverAndAbroad] = useState("");
    const [overAndAbroadReason, setOverAndAbroadReason] = useState("");
    const [communication, setCommunication] = useState("");
    const [communicationReason, setCommunicationReason] = useState("");

    const [getManagers, setGetManagers] = useState([{}]);
    // const [getMembers, setGetMember] = useState([{}]);

    const availableBranch = ["lagos", "abuja"];
    const employeeRating = [0, 1, 2, 3, 4, 5];

    useEffect(() => {
        setIsLoading(true);
        const fetchMember = async () => {
            try {
                const response = await baseUrl.get(`/member/${memberId}`);
                setMemberName(
                    `${response.data.data.first_name} ${response.data.data.last_name}`
                );

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchMember();
    }, []);

    const onChangeDropDownBranch = async (event) => {
        const clickedBranch = event.target.value;
        setSelectFieldBranchValue(clickedBranch);
        if (clickedBranch) {
            setEnableSelectManager(false);
            const fetchManagers = await baseUrl.get(
                `/managers/branch/?branch=${clickedBranch}`
            );
            // console.log(fetchManagers);
            setGetManagers(fetchManagers.data.data);
        } else {
            setEnableSelectManager(true);
        }
    };

    const onChangeDropDownManager = (event) => {
        const clickedManager = event.target.value;
        setSelectFieldManagerId(clickedManager);
    };

    const onWorkQuality = (event) => {
        const selectedValue = event.target.value;
        setWorkQuality(selectedValue);
    };

    const onTaskCompletion = (event) => {
        const selectedValue = event.target.value;
        setTaskCompletion(selectedValue);
    };

    const onOverAndAbroad = (event) => {
        const selectedValue = event.target.value;
        setOverAndAbroad(selectedValue);
    };

    const onCommunication = (event) => {
        const selectedValue = event.target.value;
        setCommunication(selectedValue);
    };

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <body>
            <main>
                <div className="container">
                    <form
                        // onSubmit={submitForm}
                        className="single-task-form"
                    >
                        <h4>Employee Evaluation</h4>
                        <div className="form-control">
                            <label for="name">Staff</label>

                            <p>{memberName}</p>
                        </div>
                        <div className="form-control">
                            <label for="evaluationMonth">
                                Evaluation month
                            </label>
                            <p>{evaluationMonth}</p>
                        </div>
                        <div className="form-control">
                            <label for="name">Branch</label>
                            <select
                                name="region"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onChangeDropDownBranch(e);
                                }}
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {availableBranch.map((item) => {
                                    return (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-control">
                            <label for="select_member">Select manager</label>
                            <select
                                name="select_member"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onChangeDropDownManager(e);
                                }}
                                disabled={enableSelectManager}
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {getManagers.map((item) => {
                                    return (
                                        <option
                                            value={`${item.id}`}
                                            key={item.id}
                                        >
                                            {`${item.first_name} ${item.last_name}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-control">
                            <label for="work_quality">Work quality</label>
                            <select
                                name="work_quality"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onWorkQuality(e);
                                }}
                                required
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {employeeRating.map((item) => {
                                    return (
                                        <option
                                            value={`${item}`}
                                            key={`work_quality_${item}`}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={workQualityReason}
                                onChange={(e) => {
                                    setWorkQualityReason(e.target.value);
                                }}
                                required
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label for="task_completion">Task completion</label>
                            <select
                                name="task_completion"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onTaskCompletion(e);
                                }}
                                required
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {employeeRating.map((item) => {
                                    return (
                                        <option
                                            value={`${item}`}
                                            key={`task_completion_${item}`}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={taskCompletionReason}
                                onChange={(e) => {
                                    setTaskCompletionReason(e.target.value);
                                }}
                                required
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <label for="overAndAbroad">Over and abroad</label>
                            <select
                                name="overAndAbroad"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onOverAndAbroad(e);
                                }}
                                required
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {employeeRating.map((item) => {
                                    return (
                                        <option
                                            value={`${item}`}
                                            key={`over_and_abroad_${item}`}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-control">
                            <label for="overAndAbroadReason">Reason</label>
                            <textarea
                                value={overAndAbroadReason}
                                onChange={(e) => {
                                    setOverAndAbroadReason(e.target.value);
                                }}
                                required
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <label for="communication">Communication</label>
                            <select
                                name="communication"
                                className="task-edit-name"
                                onChange={(e) => {
                                    onCommunication(e);
                                }}
                                required
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {employeeRating.map((item) => {
                                    return (
                                        <option
                                            value={`${item}`}
                                            key={`communication_${item}`}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={communicationReason}
                                onChange={(e) => {
                                    setCommunicationReason(e.target.value);
                                }}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="block btn task-edit-btn"
                        >
                            Submit
                        </button>
                        <div className="form-alert"></div>
                    </form>
                </div>
            </main>
        </body>
    );
}
