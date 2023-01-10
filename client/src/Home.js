import React, { useEffect, useState } from "react";
import baseUrl from "./base-url/base-url";
import "./css/home.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Stack from "@mui/material/Stack";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

export default function Home() {
    const [managers, setManagers] = useState([{}]);
    const [members, setMembers] = useState([{}]);

    const getManagers = async () => {
        try {
            const response = await baseUrl.get(`/managers`);
            console.log(response.data.data);
            setManagers(response.data.data);

            // setIsLoading(false);
        } catch (error) {
            // setIsLoading(false);
            console.log(error);
        }
    };

    const getMembers = async () => {
        try {
            const response = await baseUrl.get(`/members`);
            console.log(response.data.data);
            setMembers(response.data.data);

            // setIsLoading(false);
        } catch (error) {
            // setIsLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getManagers();
        getMembers();
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#645cff",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    return (
        <body>
            <div className="home">
                <p>Managers</p>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S/N</StyledTableCell>
                                <StyledTableCell align="right">
                                    First Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Last Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Email
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Branch
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Phone Number
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {managers.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.first_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.last_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.email}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="right"
                                        className="branch"
                                    >
                                        {row.branch}
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        {row.phone_number}
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={
                                                    <ScoreboardIcon fontSize="small" />
                                                }
                                            >
                                                Scores
                                            </Button>
                                            <Button
                                                href="/managers-form"
                                                size="small"
                                                variant="outlined"
                                                endIcon={
                                                    <PendingActionsIcon fontSize="small" />
                                                }
                                            >
                                                Evaluate
                                            </Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="home">
                <p>Members</p>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S/N</StyledTableCell>
                                <StyledTableCell align="right">
                                    First Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Last Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Email
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Branch
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    Phone Number
                                </StyledTableCell>

                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.first_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.last_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.email}
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="right"
                                        className="branch"
                                    >
                                        {row.branch}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.phone_number}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={
                                                    <ScoreboardIcon fontSize="small" />
                                                }
                                            >
                                                Scores
                                            </Button>
                                            <Button
                                                href="/members-form"
                                                size="small"
                                                variant="outlined"
                                                endIcon={
                                                    <PendingActionsIcon fontSize="small" />
                                                }
                                            >
                                                Evaluate
                                            </Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </body>
    );
}
