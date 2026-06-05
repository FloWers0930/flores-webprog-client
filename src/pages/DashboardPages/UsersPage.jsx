import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Visibility,
  VisibilityOff,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const genders = ["male", "female", "other"];
const roles = ["editor", "viewer"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers();
      setUsers(res.data?.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      showSnackbar("Failed to load users.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?._id ?? null });
    setForm(
      user
        ? {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            age: user.age || "",
            gender: user.gender || "",
            contactNumber: user.contactNumber || "",
            email: user.email || "",
            type: user.type || "",
            username: user.username || "",
            password: "",
            address: user.address || "",
            isActive: user.isActive ?? true,
          }
        : { ...blankForm },
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["type", "Role"],
      ["username", "Username"],
      [modal.id ? null : "password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (key && label && !String(form[key] ?? "").trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!nextErrors.email) {
      const duplicate = users.find(
        (u) => u._id !== modal.id && u.email.toLowerCase() === email,
      );
      if (duplicate) nextErrors.email = "Email address already exists.";
    }

    if (!nextErrors.username) {
      const duplicate = users.find(
        (u) => u._id !== modal.id && u.username.toLowerCase() === username,
      );
      if (duplicate) nextErrors.username = "Username already exists.";
    }

    if (!modal.id && form.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (
      form.contactNumber &&
      !/^\d{11}$/.test(form.contactNumber.replace(/\D/g, ""))
    ) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (
      form.age &&
      (!/^\d+$/.test(String(form.age)) ||
        parseInt(form.age) < 1 ||
        parseInt(form.age) > 150)
    ) {
      nextErrors.age = "Age must be a valid number between 1 and 150.";
    }

    if (form.username && /\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: String(form.age).trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.replace(/\D/g, "").trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (form.password.trim()) {
      payload.password = form.password.trim();
    }

    try {
      setSaving(true);
      if (modal.id) {
        await updateUser(modal.id, payload);
        showSnackbar("User updated successfully!");
      } else {
        await createUser(payload);
        showSnackbar("User created successfully!");
      }
      await loadUsers();
      closeModal();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Unknown error";
      showSnackbar("Failed to save user: " + message, "error");
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateUser(id, { isActive: !currentStatus });
      showSnackbar(
        `User ${!currentStatus ? "activated" : "disabled"} successfully!`,
      );
      await loadUsers();
    } catch (err) {
      showSnackbar("Failed to update user status.", "error");
      console.error("Toggle error:", err);
    }
  };

  const clearFilters = () => {
    setFilterRole("");
    setFilterGender("");
    setFilterStatus("");
    setSearchQuery("");
  };

  const hasActiveFilters =
    filterRole || filterGender || filterStatus || searchQuery;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.username?.toLowerCase().includes(searchLower);

      const matchesRole = !filterRole || user.type === filterRole;
      const matchesGender = !filterGender || user.gender === filterGender;
      const matchesStatus =
        filterStatus === "" ||
        (filterStatus === "active" && user.isActive) ||
        (filterStatus === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterGender, filterStatus]);

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "username", headerName: "Username", minWidth: 130 },
    { field: "age", headerName: "Age", width: 70 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      valueGetter: (_, row) =>
        row.gender
          ? row.gender.charAt(0).toUpperCase() + row.gender.slice(1)
          : "",
    },
    { field: "contactNumber", headerName: "Contact No.", minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 170 },
    {
      field: "type",
      headerName: "Role",
      minWidth: 110,
      valueGetter: (_, row) =>
        row.type ? row.type.charAt(0).toUpperCase() + row.type.slice(1) : "",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row._id, row.isActive)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4">Users</Typography>
          <Typography variant="body2" color="text.secondary">
            {users.length} total user{users.length !== 1 ? "s" : ""}
            {hasActiveFilters ? ` · ${filteredUsers.length} shown` : ""}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add User
        </Button>
      </Stack>

      {/* Search & Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Search by first name, last name, email, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              size="small"
              variant={showFilters ? "contained" : "outlined"}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            {hasActiveFilters && (
              <Button size="small" color="error" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </Stack>

          {showFilters && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              <TextField
                select
                label="Filter by Role"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All Roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Filter by Gender"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All Genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Filter by Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>

              <Button
                variant="outlined"
                size="small"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* Data Table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {filteredUsers.length ? (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {hasActiveFilters
              ? "No users match your current filters. Try adjusting or clearing them."
              : "No users found. Click Add User to create your first record."}
          </Alert>
        )}
      </Paper>

      {/* Add / Edit Modal */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {/* Name */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>

              {/* Age & Gender */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("age", "Age")}
                  type="number"
                  inputProps={{ min: 1, max: 150 }}
                />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Contact & Email */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("contactNumber", "Contact Number")}
                  placeholder="09171234567"
                  inputProps={{ maxLength: 11 }}
                />
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
              </Stack>

              {/* Role & Username */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("type", "Role", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...fieldProps("username", "Username")}
                  inputProps={{ autoComplete: "off" }}
                />
              </Stack>

              {/* Password */}
              <TextField
                {...fieldProps(
                  "password",
                  modal.id
                    ? "Password (leave blank to keep current)"
                    : "Password",
                  {
                    type: showPassword ? "text" : "password",
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                              onMouseDown={(e) => e.preventDefault()}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  },
                )}
              />

              {/* Address */}
              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />

              {/* Status Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} disabled={saving}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} /> : null}
            >
              {saving
                ? modal.id
                  ? "Updating..."
                  : "Saving..."
                : modal.id
                  ? "Update User"
                  : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
