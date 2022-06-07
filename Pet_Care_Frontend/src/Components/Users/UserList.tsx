import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userApi from "../../Api/userApi";
import { ICurrentUser } from "../../Interfaces/User/ICurrentUser";
import { IUserChange } from "../../Interfaces/User/IUserChange";
import { IUserFetch } from "../../Interfaces/User/IUserFetch";
import DialogBase from "../../Utils/DialogBase";
import UserEdit from "./UserEdit";

export default function UserList({
  currentUser,
}: {
  currentUser: ICurrentUser;
}) {
  const [userList, setUserList] = useState<IUserFetch[]>([]);
  const [refetch, setRefetch] = useState(true);
  const [editingUser, setEditingUser] = useState("");

  const transferUserInterface = (
    userList: IUserFetch[],
    editingUser: string
  ) => {
    const user = userList.find(
      (user) => user.id.toString() === editingUser
    ) as IUserFetch;
    const newUser: IUserChange = {
      id: user?.id || 0,
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      name: user?.name || "",
      surname: user?.surname || "",
      city: user?.city || "",
    };
    return newUser;
  };

  const handleUserRemove = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await userApi.deleteUser(id);
      toast.success("User was deleted successfully!");
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    async function getUsers() {
      const users = await userApi.getUserList();
      setUserList(users);
    }
    getUsers();
  }, [refetch]);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      minWidth: 100,

      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,

      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Date and time  created",
      flex: 1,
      minWidth: 200,

      type: "dateTime",
      valueFormatter: (value) =>
        moment(value.value).format("YYYY-MM-DD HH:mm:ss"),
    },

    {
      field: "updated_at",
      headerName: "Date and time updated",
      flex: 1,
      minWidth: 200,
      type: "dateTime",
      valueFormatter: (value) =>
        moment(value.value).format("YYYY-MM-DD HH:mm:ss"),
    },

    {
      field: "id",
      minWidth: 200,
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ButtonGroup size="small">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setEditingUser(`${params.id}`)}
              startIcon={<EditIcon />}
            ></Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<DeleteIcon />}
              onClick={() => handleUserRemove(Number(`${params.id}`))}
            ></Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return userList && userList.length ? (
    <>
      <Box marginY={5} sx={{ width: 1 }}>
        <Typography
          variant="h4"
          fontWeight={500}
          color="#793209"
          align="center"
        >
          Users list
        </Typography>
        <Box marginY={2}></Box>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <DataGrid
              sx={{
                borderColor: "#793209",
                borderWidth: 2,
                borderBottomColor: "#793209",
                overflow: "visible",
              }}
              rows={userList}
              columns={columns}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              autoHeight
            />
          </Grid>
        </Grid>

        <DialogBase
          onClose={() => setEditingUser("")}
          open={Boolean(editingUser)}
          title="User edit"
          content={
            <UserEdit
              userForEdit={transferUserInterface(userList, editingUser)}
              onSave={() => setEditingUser("")}
              refetch={refetch}
              refetchUsers={setRefetch}
            ></UserEdit>
          }
        />
      </Box>
      <Box marginY={5}></Box>
    </>
  ) : (
    <Box marginY={15} alignItems="center" justifyContent="center">
      <Typography align="center" color="inherit" sx={{ fontSize: 32 }}>
        There are no users yet
      </Typography>
      <Box sx={{ minHeight: 300 }}></Box>
    </Box>
  );
}
