// import "./App.css";
import { useState, useEffect } from "react";
import baseUrl from "../base-url/base-url";
import "../css/forms.css";
const params = window.location.search;
const managerId = new URLSearchParams(params).get("userId");
const evaluationMonth = new URLSearchParams(params).get("month");

// console.log(currentMonth);

export default function ManagerForm() {
    //api response state values
    const [getMembers, setGetMember] = useState([{}]);

    const [managerName, setManagerName] = useState("");

    const [selectFieldBranchValue, setSelectFieldBranchValue] = useState("");
    const [selectFieldMemberId, setSelectFieldMemberId] = useState("");
    const [workQuality, setWorkQuality] = useState("");
    const [workQualityReason, setWorkQualityReason] = useState("");
    const [taskCompletion, setTaskCompletion] = useState("");
    const [taskCompletionReason, setTaskCompletionReason] = useState("");
    const [overAndAbroad, setOverAndAbroad] = useState("");
    const [overAndAbroadReason, setOverAndAbroadReason] = useState("");
    const [communication, setCommunication] = useState("");
    const [communicationReason, setCommunicationReason] = useState("");
    // const [evaluationMonth, setEvaluationMonth] = useState("");

    const [enableSelectMember, setEnableSelectMember] = useState(true);

    const availableBranch = ["lagos", "abuja"];
    const employeeRating = [0, 1, 2, 3, 4, 5];

    const fetchManager = async () => {
        try {
            const response = await baseUrl.get(`/manager/${managerId}`);
            setManagerName(
                `${response.data.data.first_name} ${response.data.data.last_name}`
            );
        } catch (error) {
            console.log(error);
        }
    };

    fetchManager();

    // setEvaluationMonth(currentMonth);

    const onChangeDropDownBranch = async (event) => {
        const clickedBranch = event.target.value;
        setSelectFieldBranchValue(clickedBranch);
        if (clickedBranch) {
            setEnableSelectMember(false);
            const fetchMembers = await baseUrl.get(
                `/members/branch/?branch=${clickedBranch}`
            );
            setGetMember(fetchMembers.data.data);
        } else {
            setEnableSelectMember(true);
        }
    };

    const onChangeDropDownMember = (event) => {
        const clickedMember = event.target.value;
        setSelectFieldMemberId(clickedMember);
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

    const submitFormData = async () => {
        const createManagersResponse = await fetch(
            "http://localhost:8080/api/v1/manager/response",
            {
                method: "POST",
                body: JSON.stringify({
                    managerName,
                    managerId,
                    branch: selectFieldBranchValue,
                    memberId: selectFieldMemberId,
                    workQuality,
                    workQualityReason,
                    taskCompletion,
                    taskCompletionReason,
                    overAndAbroad,
                    overAndAbroadReason,
                    communication,
                    communicationReason,
                }),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        await createManagersResponse.json();

        console.log(createManagersResponse);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(managerName);
        console.log(managerId);
        console.log(selectFieldBranchValue);
        console.log(selectFieldMemberId);
        console.log(workQuality);
        console.log(workQualityReason);
        console.log(taskCompletion);
        console.log(taskCompletionReason);
        console.log(overAndAbroad);
        console.log(overAndAbroadReason);
        console.log(communication);
        console.log(communicationReason);
        console.log(evaluationMonth);

        // body: JSON.stringify({
        //     managerName,
        //     managerId,
        //     branch: selectFieldBranchValue,
        //     memberId: selectFieldMemberId,
        //     workQuality,
        //     workQualityReason,
        //     taskCompletion,
        //     taskCompletionReason,
        //     overAndAbroad,
        //     overAndAbroadReason,
        //     communication,
        //     communicationReason,
        // })
        // try {
        //     await submitFormData();
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <body>
            <main>
                <div class="container">
                    <form onSubmit={submitForm} class="single-task-form">
                        <h4>Employee Evaluation</h4>
                        <div class="form-control">
                            <label for="name">Manager</label>
                            <p>{managerName}</p>
                        </div>
                        <div class="form-control">
                            <label for="evaluationMonth">
                                Evaluation month
                            </label>
                            <p>{evaluationMonth}</p>
                        </div>
                        <div class="form-control">
                            <label for="name">Region</label>
                            <select
                                name="region"
                                class="task-edit-name"
                                // value={selectFieldBranchValue}
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
                        <div class="form-control">
                            <label for="select_member">Select member</label>
                            <select
                                name="select_member"
                                class="task-edit-name"
                                // value={selectFieldMemberValue}
                                onChange={(e) => {
                                    onChangeDropDownMember(e);
                                }}
                                disabled={enableSelectMember}
                                // disabled={enableSelectMember}
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {getMembers.map((item) => {
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
                        <div class="form-control">
                            <label for="work_quality">Work quality</label>
                            <select
                                name="work_quality"
                                class="task-edit-name"
                                // value={selectFieldMemberValue}
                                onChange={(e) => {
                                    onWorkQuality(e);
                                }}
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
                        <div class="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={workQualityReason}
                                onChange={(e) => {
                                    setWorkQualityReason(e.target.value);
                                }}
                            ></textarea>
                        </div>

                        <div class="form-control">
                            <label for="task_completion">Task completion</label>
                            <select
                                name="task_completion"
                                class="task-edit-name"
                                // value={selectFieldMemberValue}
                                onChange={(e) => {
                                    onTaskCompletion(e);
                                }}
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

                        <div class="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={taskCompletionReason}
                                onChange={(e) => {
                                    setTaskCompletionReason(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div class="form-control">
                            <label for="overAndAbroad">Over and abroad</label>
                            <select
                                name="overAndAbroad"
                                class="task-edit-name"
                                // value={selectFieldMemberValue}
                                onChange={(e) => {
                                    onOverAndAbroad(e);
                                }}
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

                        <div class="form-control">
                            <label for="overAndAbroadReason">Reason</label>
                            <textarea
                                value={overAndAbroadReason}
                                onChange={(e) => {
                                    setOverAndAbroadReason(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div class="form-control">
                            <label for="communication">Communication</label>
                            <select
                                name="communication"
                                class="task-edit-name"
                                // value={selectFieldMemberValue}
                                onChange={(e) => {
                                    onCommunication(e);
                                }}
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

                        <div class="form-control">
                            <label for="work_quality">Reason</label>
                            <textarea
                                value={communicationReason}
                                onChange={(e) => {
                                    setCommunicationReason(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            class="block btn task-edit-btn"
                            // onClick={postManagerResponse}
                        >
                            Submit
                        </button>
                        <div class="form-alert"></div>
                    </form>
                </div>
            </main>
        </body>
    );
}
