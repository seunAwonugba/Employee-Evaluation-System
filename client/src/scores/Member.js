import { useEffect, useState } from "react";
import baseUrl from "../base-url/base-url";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { capitalize } from "@mui/material";

const params = window.location.search;

const memberId = new URLSearchParams(params).get("memberId");

export default function MemberScores() {
    const [evaluations, setEvaluations] = useState([{}]);

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

    const getEvaluations = async () => {
        try {
            const response = await baseUrl.get(
                `/evaluation/member/${memberId}`
            );
            console.log(response.data.data);
            setEvaluations(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEvaluations();
    }, []);
    return (
        <body>
            <div className="eval">
                <p>Evaluation Score</p>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S/N</StyledTableCell>
                                <StyledTableCell align="center">
                                    Evaluation for
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Work quality
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Reason
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Task completion
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Reason
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Over and abroad
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Reason
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Communication
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Reason
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {evaluations.map((row, index) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    {console.log(row.evaluation_for_month)}
                                    {console.log(
                                        typeof row.evaluation_for_month
                                    )}
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {row.evaluation_for_month}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.work_quality}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.work_quality_reason}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.task_completion}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.task_completion_reason}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.over_and_abroad}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.over_and_abroad_reason}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.communication}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.communication_reason}
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
