import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../common/Common";
import { accountService } from "../../services/accountService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const AccountPage = () => {
  const [transactions, setTransactions] = useState([]);

  const { contractNumber } = useParams();

  useEffect(() => {
    accountService.getTransactions(contractNumber).then((e) => {
      setTransactions(e.data.transactions);
    });
  }, [contractNumber]);

  const rows = transactions.map((transaction) => {
    return {
      _id: transaction._id,
      date: transaction.Date,
      money: transaction.Cash,
    };
  });
  console.log(transactions);
  return (
    <div>
      <NavBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
