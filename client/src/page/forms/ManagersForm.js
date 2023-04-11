import { useState, useEffect } from "react";
import baseUrl from "../../base_url/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const params = window.location.search;
const managerId = new URLSearchParams(params).get("userId");
const evaluationMonth = new URLSearchParams(params).get("month");

// console.log(currentMonth);

export default function ManagerForm() {
    const navigate = useNavigate();

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

    const [enableSelectMember, setEnableSelectMember] = useState(true);

    const availableBranch = ["lagos", "abuja"];
    const employeeRating = [0, 1, 2, 3, 4, 5];

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchManager = async () => {
            try {
                const response = await baseUrl.get(`/manager/${managerId}`);
                setManagerName(
                    `${response.data.data.first_name} ${response.data.data.last_name}`
                );

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchManager();
    }, []);

    const onChangeDropDownBranch = async (event) => {
        const clickedBranch = event.target.value;
        setSelectFieldBranchValue(clickedBranch);
        if (clickedBranch) {
            setEnableSelectMember(false);
            const fetchMembers = await baseUrl.get(
                `/members/branch/?branch=${clickedBranch}`
            );
            console.log(fetchMembers);
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

    const submitForm = async (e) => {
        e.preventDefault();
        const userResponse = {
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
            evaluationForMonth: evaluationMonth,
        };

        try {
            const response = await baseUrl.post(
                "evaluation/manager/submit-form",
                userResponse
            );
            // console.log(response);

            if (response.data.success === true) {
                toast.success(`Evaluation submitted successfully`);
                navigate("/");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast("All fields are required");
        }
    };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <body>
            <form onSubmit={submitForm} className="single-task-form">
                <h4>Employee Evaluation</h4>
                <div className="form-control">
                    <label for="name">Manager</label>

                    <p>{managerName}</p>
                </div>
                <div className="form-control">
                    <label for="evaluationMonth">Evaluation month</label>
                    <p className="eval-month">{evaluationMonth}</p>
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
                    <label for="select_member">Select member</label>
                    <select
                        name="select_member"
                        className="task-edit-name"
                        onChange={(e) => {
                            onChangeDropDownMember(e);
                        }}
                        disabled={enableSelectMember}
                    >
                        <option disabled selected value>
                            {" "}
                            -- select an option --{" "}
                        </option>
                        {getMembers.map((item) => {
                            return (
                                <option value={`${item.id}`} key={item.id}>
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
                        value={workQualityReason.trim()}
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
                        value={taskCompletionReason.trim()}
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
                        value={overAndAbroadReason.trim()}
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
                        value={communicationReason.trim()}
                        onChange={(e) => {
                            setCommunicationReason(e.target.value);
                        }}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="block btn task-edit-btn">
                    Submit
                </button>
                <div className="form-alert"></div>
            </form>
        </body>
    );
}
