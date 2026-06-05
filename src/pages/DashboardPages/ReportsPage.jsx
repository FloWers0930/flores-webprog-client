import { useRef } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

const colors = {
  bg: "#F5F5F0",
  surface: "#FFFFFF",
  primary: "#4A5D4E",
  primaryLight: "#5A6D5E",
  text: "#2C3E2D",
  textMuted: "#6B7B6D",
  border: "#D4D8D4",
  hover: "#E8EBE8",
  chartBlue: "#4A5D4E",
  chartOrange: "#C4A35A",
  chartRed: "#B85C5C",
  chartGreen: "#6B8E6B",
};

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell {
              padding: 28px;
            }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }
            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root {
              padding: 20px;
            }
            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Sample data for charts
  const barData = [
    { data: [18, 24, 20, 27], label: "Generated", color: colors.chartBlue },
    { data: [12, 19, 17, 23], label: "Completed", color: colors.chartOrange },
  ];

  const pieData = [
    { id: 0, value: 14, label: "Sales", color: colors.chartBlue },
    { id: 1, value: 10, label: "Users", color: colors.chartOrange },
    { id: 2, value: 8, label: "Inventory", color: colors.chartRed },
    { id: 3, value: 6, label: "Finance", color: colors.chartGreen },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "reportName", headerName: "Report Name", flex: 1 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "date", headerName: "Date", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      reportName: "Monthly Sales",
      category: "Sales",
      status: "Completed",
      date: "2025-04-01",
    },
    {
      id: 2,
      reportName: "User Growth",
      category: "Users",
      status: "Pending",
      date: "2025-04-05",
    },
    {
      id: 3,
      reportName: "Stock Analysis",
      category: "Inventory",
      status: "Completed",
      date: "2025-04-10",
    },
    {
      id: 4,
      reportName: "Financial Q1",
      category: "Finance",
      status: "In Progress",
      date: "2025-04-15",
    },
    {
      id: 5,
      reportName: "Weekly Report",
      category: "Sales",
      status: "Completed",
      date: "2025-04-20",
    },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: colors.text,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.75rem", md: "2.125rem" },
            }}
          >
            Reports
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.textMuted,
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: colors.primary,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 500,
              px: 2.5,
              py: 1,
              "&:hover": {
                bgcolor: colors.primaryLight,
              },
            }}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            startIcon={<DownloadIcon />}
            sx={{
              color: colors.primary,
              borderColor: colors.border,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 500,
              px: 2.5,
              py: 1,
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: colors.hover,
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{
              color: colors.primary,
              borderColor: colors.border,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 500,
              px: 2.5,
              py: 1,
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: colors.hover,
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      {/* Charts Section */}
      <Stack ref={printRef} spacing={3}>
        {/* Monthly Report Output */}
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            border: `1px solid ${colors.border}`,
            bgcolor: colors.surface,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: colors.text,
                fontSize: "1.125rem",
                mb: 1,
              }}
            >
              Monthly Report Output
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.textMuted,
                mb: 3,
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              This chart compares how many reports were generated and how many
              were completed across the last four months.
            </Typography>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <BarChart
                series={barData}
                height={300}
                xAxis={[
                  {
                    data: ["January", "February", "March", "April"],
                    scaleType: "band",
                    label: "Months",
                  },
                ]}
                colors={[colors.chartBlue, colors.chartOrange]}
                sx={{
                  "& .MuiChartsAxis-tickLabel": {
                    fill: colors.textMuted,
                    fontSize: "0.75rem",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Pie Chart and Gauge Row */}
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          {/* Report Category Share */}
          <Card
            sx={{
              flex: 1,
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: `1px solid ${colors.border}`,
              bgcolor: colors.surface,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: "1.125rem",
                  mb: 1,
                }}
              >
                Report Category Share
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.textMuted,
                  mb: 3,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                This chart shows the distribution of report requests by category
                for the current reporting period.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[
                    {
                      data: pieData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  width={280}
                  height={220}
                  colors={[
                    colors.chartBlue,
                    colors.chartOrange,
                    colors.chartRed,
                    colors.chartGreen,
                  ]}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card
            sx={{
              flex: 1,
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: `1px solid ${colors.border}`,
              bgcolor: colors.surface,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: "1.125rem",
                  mb: 1,
                }}
              >
                Completion Rate
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.textMuted,
                  mb: 3,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                The gauge highlights the current percentage of reports completed
                on time based on the latest reporting cycle.
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Gauge
                  width={180}
                  height={180}
                  value={78}
                  sx={{
                    "& .MuiGauge-valueText": {
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      fill: colors.text,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Data Table */}
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            border: `1px solid ${colors.border}`,
            bgcolor: colors.surface,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: "1.125rem",
                }}
              >
                Recent Reports
              </Typography>
            </Box>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${colors.border}`,
                  color: colors.text,
                },
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: colors.bg,
                  borderBottom: `1px solid ${colors.border}`,
                  color: colors.text,
                  fontWeight: 600,
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: `1px solid ${colors.border}`,
                  bgcolor: colors.bg,
                },
                "& .MuiCheckbox-root.Mui-checked": {
                  color: colors.primary,
                },
                "& .MuiDataGrid-row:hover": {
                  bgcolor: colors.hover,
                },
              }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
