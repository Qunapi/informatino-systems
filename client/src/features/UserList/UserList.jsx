import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userService } from "../../services/userService";
import { NavBar } from "../../common/Common";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Badge";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "Name", headerName: "Name", width: 90 },
  { field: "Surname", headerName: "Surname", width: 90 },
  { field: "MiddleName", headerName: "MiddleName", width: 90 },
  { field: "Citizenship", headerName: "Citizenship", width: 70 },
  { field: "DateOfBirth", headerName: "DateOfBirth", width: 130 },
  { field: "DateOfIssue", headerName: "DateOfIssue", width: 130 },
  { field: "Disability", headerName: "Disability", width: 90 },
  { field: "EMail", headerName: "EMail", width: 90 },
  { field: "FamilyStatus", headerName: "FamilyStatus", width: 90 },
  { field: "HomeAddress", headerName: "HomeAddress", width: 90 },
  { field: "HomeCity", headerName: "HomeCity", width: 90 },
  { field: "HomeTelephone", headerName: "HomeTelephone", width: 90 },
  { field: "Id", headerName: "Id", width: 90 },
  {
    field: "IdentificationalNumber",
    headerName: "IdentificationalNumber",
    width: 90,
  },
  { field: "IsConscript", headerName: "IsConscript", width: 90 },
  { field: "IsRetiree", headerName: "IsRetiree", width: 90 },
  { field: "MobileTelephone", headerName: "MobileTelephone", width: 90 },
  { field: "PassportNumber", headerName: "PassportNumber", width: 90 },
  {
    field: "PassportSerialNumber",
    headerName: "PassportSerialNumber",
    width: 90,
  },
  { field: "PlaceOfBirth", headerName: "PlaceOfBirth", width: 90 },
  { field: "PlaceOfIssue", headerName: "PlaceOfIssue", width: 90 },
  { field: "PlaceOfWork", headerName: "PlaceOfWork", width: 90 },
  { field: "Position", headerName: "Position", width: 90 },
  { field: "Sallary", headerName: "Sallary", width: 90 },
  { field: "createdAt", headerName: "createdAt", width: 90 },
  { field: "updatedAt", headerName: "updatedAt", width: 90 },
];

export function DataTable() {
  const [users, setUsers] = React.useState([]);

  const [state, setState] = React.useState({});

  async function getUsers() {
    const users = await userService.getUsers();
    setUsers(users.data.clients.map((user) => ({ ...user, id: user.Id })));
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = async () => {
    await userService.deleteUser(state.selection[0]);
    getUsers();
  };

  const navigate = useNavigate();

  const onUpdateClick = () => {
    navigate(`/users/${state.selection[0]}`);
  };

  return (
    <>
      <NavBar />
      <div style={{ height: users.length * 70 + 100, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={100}
          // rowsPerPageOptions={[5]}
          // checkboxSelection
          onStateChange={(e) => setState(e)}
        />
        {!!state.selection?.length && (
          <>
            <Button
              sx={{ m: 2 }}
              variant="outlined"
              onClick={onDeleteClick}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>

            <Button
              onClick={onUpdateClick}
              sx={{ m: 2 }}
              variant="contained"
              endIcon={<UpdateIcon />}
            >
              Update
            </Button>
          </>
        )}
      </div>
    </>
  );
}
