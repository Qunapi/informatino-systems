import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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
import * as dayjs from "dayjs";
import { toast } from "react-toastify";

const CashAccuracy = 100_000;

export function PercentDialog({
  ContractStartDeposit,
  StartDate,
  ContractPercent,
  EndDate,
  setOpen,
  open,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  // const handleSuccess = () => {
  //   onSuccess();
  //   setOpen(false);
  // };
  const rows = [];
  let da = 0;
  const incomePerDay =
    Math.trunc(
      Number(ContractStartDeposit) *
        (Number(ContractPercent) / 365 / 100) *
        CashAccuracy,
    ) / CashAccuracy;

  let i;

  var monthDifference = dayjs(EndDate).diff(StartDate, "month") + 1;
  const da2 =
    Math.trunc((ContractStartDeposit * CashAccuracy) / monthDifference) /
    CashAccuracy;

  console.log(StartDate, EndDate, ContractStartDeposit, ContractPercent);
  let c = StartDate.toDate();
  console.log(incomePerDay);
  //   for (i = startDateDefault; dayjs(i).diff(EndDate) <= 0; ) {
  for (; c <= EndDate.toDate(); i++) {
    c = new Date(c.setDate(c.getDate() + 1));
    // console.log(i.toDate());
    if (c.getDate() === 1) {
      rows.push({ date: c || new Date(), amount: da });
      rows.push({ date: c || new Date(), amount: da2 });

      da = 0;
    } else {
      da += incomePerDay;
    }
    // rows.push({ date: i, amount: incomePerDay });
    // console.log(c);
  }
  rows.push({ date: c || new Date(), amount: da });

  if (StartDate.diff(EndDate) !== 0) {
    rows.push({ date: c || new Date(), amount: da2 });
  }
  console.log(rows);
  rows.sort((a, b) => a.date >= b.date);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Печатать чек?
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Money</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* {() => {
                        console.log(row);
                        // (row.date || 0)?.toSting();
                        return row.date.toString();
                      }} */}
                      {row.date.toString()}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </div>
  );
}
