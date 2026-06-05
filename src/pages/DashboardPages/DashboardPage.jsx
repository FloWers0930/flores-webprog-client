import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { fetchUsers } from "../../services/UserService";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (_, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`.trim(),
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    valueGetter: (_, row) =>
      row.type ? row.type.charAt(0).toUpperCase() + row.type.slice(1) : "",
  },
];

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data?.users || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Stats computed from real data
  const totalUsers = users.length;

  const averageAge =
    users.filter((u) => u.age && !isNaN(Number(u.age))).length > 0
      ? (
          users.reduce((sum, u) => sum + (Number(u.age) || 0), 0) /
          users.filter((u) => u.age && !isNaN(Number(u.age))).length
        ).toFixed(1)
      : "N/A";

  // Pie chart: users by role
  const roleCounts = users.reduce((acc, user) => {
    const role = user.type || "unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(roleCounts).map(([role, count], index) => ({
    id: index,
    value: count,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  // Bar chart: users by gender
  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const genderLabels = Object.keys(genderCounts).map(
    (g) => g.charAt(0).toUpperCase() + g.slice(1),
  );
  const genderValues = Object.values(genderCounts);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Age</Typography>
            <Typography variant="h4">{averageAge}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">
              {users.filter((u) => u.isActive).length}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Charts */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        {/* Bar Chart: Users by Gender */}
        <BarChart
          series={[{ data: genderValues, label: "Users by Gender" }]}
          height={290}
          xAxis={[{ data: genderLabels, scaleType: "band", label: "Gender" }]}
        />

        {/* Pie Chart: Users by Role */}
        {pieData.length > 0 && (
          <PieChart series={[{ data: pieData }]} width={400} height={200} />
        )}
      </Stack>

      {/* Data Grid */}
      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>
      <Box sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default DashboardPage;
