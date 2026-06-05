import { useState, useEffect, useMemo } from "react";
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
  Chip,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  fetchArticles,
  createArticle,
  updateArticle,
} from "../../services/ArticleService";

const statusColor = (status) => {
  if (status === "published") return "success";
  if (status === "archived") return "default";
  return "warning";
};

const statusLabel = (status) => {
  if (status === "published") return "Active";
  if (status === "archived") return "Archived";
  return "Draft";
};

const blankForm = {
  title: "",
  slug: "",
  preview: "",
  paragraph: "",
  status: "draft",
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState({ open: false, isEdit: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const res = await fetchArticles();
      setArticles(res.data?.articles || []);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      showSnackbar("Failed to load articles.", "error");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (article = null) => {
    setModal({ open: true, isEdit: !!article, id: article?._id ?? null });
    setForm(
      article
        ? {
            title: article.title || "",
            slug: article.slug || "",
            preview: article.preview || "",
            paragraph: article.paragraph || "",
            status: article.status || "draft",
          }
        : { ...blankForm },
    );
  };

  const closeModal = () => {
    setModal({ open: false, isEdit: false, id: null });
    setForm(blankForm);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      showSnackbar("Title and Slug are required.", "error");
      return;
    }

    try {
      if (modal.isEdit) {
        await updateArticle(modal.id, form);
        showSnackbar("Article updated successfully!");
      } else {
        await createArticle(form);
        showSnackbar("Article created successfully!");
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Unknown error";
      showSnackbar("Failed to save article: " + message, "error");
      console.error("Save error:", err.response?.data || err);
    }
  };

  const handleToggleStatus = async (article) => {
    const nextStatus =
      article.status === "published" ? "archived" : "published";
    try {
      await updateArticle(article._id, { ...article, status: nextStatus });
      showSnackbar(
        `Article ${nextStatus === "published" ? "enabled" : "disabled"}.`,
      );
      await loadArticles();
    } catch (err) {
      showSnackbar(
        "Failed to update status: " +
          (err.response?.data?.message || err.message),
        "error",
      );
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        !searchQuery ||
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.slug?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || article.status === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, filterStatus]);

  const columns = [
    { field: "_id", headerName: "ID", width: 110 },
    { field: "slug", headerName: "Slug", width: 140 },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "paragraph",
      headerName: "Paragraphs",
      width: 110,
      renderCell: (params) =>
        params.value ? params.value.split("\n").filter(Boolean).length : 0,
    },
    { field: "preview", headerName: "Preview", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={statusLabel(params.value)}
          color={statusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.status === "published" ? "warning" : "success"}
            onClick={() => handleToggleStatus(params.row)}
          >
            {params.row.status === "published" ? "Disable" : "Enable"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Articles
        </Typography>
        <Button variant="contained" onClick={() => openModal()}>
          ADD ARTICLE
        </Button>
      </Stack>

      {/* Search + Filter */}
      <Stack direction="row" spacing={2} mb={2} sx={{ alignItems: "center" }}>
        <TextField
          placeholder="Search Articles"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Status Filter"
          size="small"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </TextField>
      </Stack>

      {/* Table */}
      <Paper elevation={2} sx={{ height: 550 }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSizeOptions={[5, 10, 20, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          sx={{
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
              outline: "none",
            },
          }}
        />
      </Paper>

      {/* Add/Edit Modal */}
      <Dialog open={modal.open} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {modal.isEdit ? "Edit Article" : "New Article"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={form.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Slug"
              name="slug"
              fullWidth
              value={form.slug}
              onChange={handleChange}
              required
            />
            <TextField
              label="Preview"
              name="preview"
              fullWidth
              value={form.preview}
              onChange={handleChange}
              multiline
              rows={2}
            />
            <TextField
              label="Content"
              name="paragraph"
              fullWidth
              value={form.paragraph}
              onChange={handleChange}
              multiline
              rows={5}
              helperText="Each line break counts as a paragraph."
            />
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {modal.isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Feedback */}
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

export default DashArticleListPage;
  