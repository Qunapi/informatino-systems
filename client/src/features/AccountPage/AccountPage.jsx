import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../common/Common";
import { accountService } from "../../services/accountService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
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

  const accounts = new Map();
  transactions.forEach((e) => {
    e.ToAccountName && accounts.set(e.ToAccountName, "");
    e.FromAccountName && accounts.set(e.FromAccountName, "");
  });

  const rows = transactions.map((transaction) => {
    return {
      _id: transaction._id,
      date: transaction.Date,
      money: transaction.Cash,
      [getColumnName(transaction.FromAccountName, transaction.TypeFrom)]: "-",
      [getColumnName(transaction.ToAccountName, transaction.TypeTo)]: "+",
    };
  });

  const finishDay = () => {
    accountService.finishDay().then((e) => {
      accountService.getTransactions(contractNumber).then((e) => {
        setTransactions(e.data.transactions);
      });
    });
  };

  return (
    <div>
      <NavBar />
      <Button onClick={finishDay} sx={{ m: 2 }} variant="contained">
        Finish Day
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Money</TableCell>
                {Array.from(accounts.keys()).map((e) => {
                  return (
                    <React.Fragment key={e}>
                      <TableCell>{e} debit</TableCell>
                      <TableCell>{e} credit</TableCell>
                    </React.Fragment>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.money}</TableCell>
                    {Array.from(accounts.keys()).map((e) => {
                      return (
                        <React.Fragment key={e}>
                          <TableCell>
                            {row[getColumnName(e, "Debit")]}
                          </TableCell>
                          <TableCell>
                            {row[getColumnName(e, "Credit")]}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

function getColumnName(name, status) {
  return `${name}${status}`;
}
