// import "./App.css";
import { useState, useEffect } from "react";
import "../css/forms.css";
const params = window.location.search;
const id = new URLSearchParams(params).get("userId");

export default function ManagerForm() {
    //api response state values
    // const [getUsers, setGetUsers] = useState([{}]);
    const [getMembers, setGetMember] = useState([{}]);

    const [managerName, setManagerName] = useState("");

    const [selectFieldBranchValue, setSelectFieldBranchValue] = useState("");
    const [selectFieldMemberValue, setSelectFieldMemberValue] = useState("");
    const [workQuality, setWorkQuality] = useState("");
    const [workQualityReason, setWorkQualityReason] = useState("");
    const [taskCompletion, setTaskCompletion] = useState("");
    const [taskCompletionReason, setTaskCompletionReason] = useState("");
    const [overAndAbroad, setOverAndAbroad] = useState("");
    const [overAndAbroadReason, setOverAndAbroadReason] = useState("");
    const [communication, setCommunication] = useState("");
    const [communicationReason, setCommunicationReason] = useState("");

    const availableBranch = ["lagos", "abuja"];
    const employeeRating = [0, 1, 2, 3, 4, 5];

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch("/api/v1/users");
    //             const data = await response.json();
    //             setGetUsers(data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchUsers();
    // }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(
                    `/api/v1/members/branch/?branch=${selectFieldBranchValue}`
                );
                const data = await response.json();
                setGetMember(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMembers();
    }, [selectFieldBranchValue]);

    useEffect(() => {
        const fetchManager = async () => {
            try {
                const response = await fetch(`
                /api/v1/manager/${id}`);
                const data = await response.json();
                // console.log(data.data);
                setManagerName(`${data.data.firstName} ${data.data.lastName}`);
            } catch (error) {
                console.log(error);
            }
        };

        fetchManager();
    }, []);

    const onChangeDropDownBranch = (event) => {
        const clickedBranch = event.target.value;
        setSelectFieldBranchValue(clickedBranch);
    };

    const onChangeDropDownMember = (event) => {
        const clickedMember = event.target.value;
        setSelectFieldMemberValue(clickedMember);
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

    const postManagerResponse = (e) => {
        e.preventDefault();
        console.log(`
        Manager name ->${managerName}
        Manager id ->${id}
        Manager region ->${selectFieldBranchValue}
        Selected member ->${selectFieldMemberValue}
        Work quality -> ${workQuality}
        Work quality reason -> ${workQualityReason}
        Task completion ->${taskCompletion}
        Task completion reason ->${taskCompletionReason}
        Over and abroad ->${overAndAbroad}
        Over and abroad reason ->${overAndAbroadReason}
        Communication ->${communication}
        Communication reason->${communicationReason}
        `);
    };

    const submitFormData = async () => {
        const response = await "/";
    };

    const submitForm = async (e) => {
        e.preventDefault();
        await submitFormData();
        try {
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <body>
            <main>
                <div class="container">
                    <form class="single-task-form">
                        <h4>Employee Evaluation</h4>
                        <div class="form-control">
                            <label for="name">Manager</label>
                            <p>{managerName}</p>
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
                            >
                                <option disabled selected value>
                                    {" "}
                                    -- select an option --{" "}
                                </option>
                                {getMembers.map((item) => {
                                    return (
                                        <option
                                            value={`${item.firstName} ${item.lastName}`}
                                            key={item._id}
                                        >
                                            {`${item.firstName} ${item.lastName}`}
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
                            onClick={postManagerResponse}
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
