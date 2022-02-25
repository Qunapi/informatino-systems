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
import * as dayjs from "dayjs";
import { toast } from "react-toastify";
import { PercentDialog } from "../CreateUpdateAccount/percentModal";

export const AccountPage = () => {
  const [transactions, setTransactions] = useState([]);

  const { contractNumber } = useParams();

  useEffect(() => {
    accountService.getTransactions(contractNumber).then((e) => {
      setTransactions(e.data.transactions);
    });
  }, [contractNumber]);

  const accountNames = new Map();
  transactions.forEach((e) => {
    e.ToAccountName && accountNames.set(e.ToAccountName, "");
    e.FromAccountName && accountNames.set(e.FromAccountName, "");
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

  const finishMonth = async () => {
    const id = toast.loading("Calculation started");
    for (let i = 0; i < 31; i++) {
      await accountService.finishDay();
    }
    accountService.getTransactions(contractNumber).then((e) => {
      setTransactions(e.data.transactions);
    });
    toast.update(id, {
      render: "Calculation finished",
      type: "success",
      isLoading: false,
      autoClose: true,
    });
  };

  function closeDeposit() {
    accountService
      .closeAccount(contractNumber)
      .then(() => {
        accountService.getTransactions(contractNumber).then((e) => {
          setTransactions(e.data.transactions);
        });
      })
      .then(() => toast.success("Account closed"))
      .catch((e) => {
        toast.error(
          e?.response?.data?.resault?.message || "Cannot close account",
        );
      });
  }

  const accountNameKeys = [...accountNames.keys()];
  accountNameKeys.sort();

  return (
    <div>
      <NavBar />
      <Button onClick={finishDay} sx={{ m: 2 }} variant="contained">
        Finish Day
      </Button>
      <Button onClick={finishMonth} sx={{ m: 2 }} variant="contained">
        Finish Month
      </Button>
      <Button onClick={closeDeposit} sx={{ m: 2 }} variant="contained">
        Close deposit
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Money</TableCell>
                {Array.from(accountNameKeys).map((e) => {
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
                      {dayjs(row.date).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell>{Number(row.money || 0).toFixed(2)}</TableCell>
                    {Array.from(accountNameKeys).map((e) => {
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
