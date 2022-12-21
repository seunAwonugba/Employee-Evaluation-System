import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [selectedBranch, setSelectedBranch] = useState("");

    //api response state values
    const [getUsers, setGetUsers] = useState([{}]);
    const [getMembers, setGetMember] = useState([{}]);

    //input field state values
    const [inputFieldFirstNameValue, setInputFieldFirstNameValue] =
        useState("");
    const [inputFieldLastNameValue, setInputFieldLastNameValue] = useState("");
    const [selectFieldBranchValue, setSelectFieldBranchValue] = useState("");
    const [selectFieldMemberValue, setSelectFieldMemberValue] = useState("");
    const [workQuality, setWorkQuality] = useState("");
    const [taskCompletion, setTaskCompletion] = useState("");
    const [overAndAbroad, setOverAndAbroad] = useState("");
    const [communication, setCommunication] = useState("");

    const availableBranch = ["lagos", "abuja"];
    const employeeRating = [0, 1, 2, 3, 4, 5];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/v1/users");
                const data = await response.json();
                setGetUsers(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(
                    `/api/v1/members/branch/?branch=${selectFieldBranchValue}`
                );
                const data = await response.json();
                setGetMember(data.data);
                console.log(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMembers();
    }, [selectFieldBranchValue]);

    const onChangeDropDownBranch = (event) => {
        event.preventDefault();

        const clickedBranch = event.target.value;
        // console.log(clickedBranch);
        setSelectFieldBranchValue(clickedBranch);
    };

    const onChangeDropDownMember = (event) => {
        event.preventDefault();

        const clickedMember = event.target.value;
        setSelectFieldMemberValue(clickedMember);
    };

    const onWorkQuality = (event) => {
        event.preventDefault();

        const selectedValue = event.target.value;
        setWorkQuality(selectedValue);
    };

    const onTaskCompletion = (event) => {
        event.preventDefault();

        const selectedValue = event.target.value;
        setTaskCompletion(selectedValue);
    };

    const onOverAndAbroad = (event) => {
        event.preventDefault();

        const selectedValue = event.target.value;
        setOverAndAbroad(selectedValue);
    };

    const onCommunication = (event) => {
        event.preventDefault();

        const selectedValue = event.target.value;
        setCommunication(selectedValue);
    };

    return (
        <body>
            <div class="container">
                <form class="single-task-form">
                    <h4>Employee Evaluation</h4>
                    <div class="form-control">
                        <label for="name">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            class="task-edit-name"
                            value={inputFieldFirstNameValue}
                            onChange={(e) => {
                                setInputFieldFirstNameValue(e.target.value);
                            }}
                        />
                    </div>
                    <div class="form-control">
                        <label for="name">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            class="task-edit-name"
                            value={inputFieldLastNameValue}
                            onChange={(e) => {
                                setInputFieldLastNameValue(e.target.value);
                            }}
                        />
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
                                        value={`${item.firstName}_${item.lastName}`}
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
                                        value={`work_quality_${item}`}
                                        key={`work_quality_${item}`}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
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
                                        value={`task_completion${item}`}
                                        key={`task_completion${item}`}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
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
                                        value={`over_and_abroad${item}`}
                                        key={`over_and_abroad${item}`}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
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
                                        value={`communication${item}`}
                                        key={`communication${item}`}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button type="submit" class="block btn task-edit-btn">
                        Submit
                    </button>
                    <div class="form-alert"></div>
                </form>
            </div>
        </body>
    );
}

export default App;
