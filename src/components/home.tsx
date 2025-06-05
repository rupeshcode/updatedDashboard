import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { Info, Download, Print, Save } from "@mui/icons-material";
import FilterPanel from "./dashboard/FilterPanel";
import AnalysisChart from "./dashboard/AnalysisChart";
import DataTable from "./dashboard/DataTable";

interface FilterState {
  year: string;
  month: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  parentGroupName: string;
  segment: string;
  lineGroup: string;
  aggAssetName: string;
  assetType: string;
  shiftName: string;
}

const Home = () => {
  const [activeTab, setActiveTab] = useState("blocked-starved");
  const [filters, setFilters] = useState<FilterState>({
    year: "",
    month: "",
    dateRange: { from: undefined, to: undefined },
    parentGroupName: "",
    segment: "",
    lineGroup: "",
    aggAssetName: "",
    assetType: "",
    shiftName: "",
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      year: "",
      month: "",
      dateRange: { from: undefined, to: undefined },
      parentGroupName: "",
      segment: "",
      lineGroup: "",
      aggAssetName: "",
      assetType: "",
      shiftName: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        marginBottom: 2,
      }}
    >
      <AppBar position="static" elevation={1} sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ px: 4, width: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <Box
              component="img"
              src="/ford.jpeg"
              alt="Ford Logo"
              sx={{ height: 32, width: "auto" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "grey.900",
                fontWeight: 600,
              }}
            >
              MOS - Constraint Management
            </Typography>
            <Tooltip title="Constraint Details">
              <IconButton size="small" sx={{ color: "grey.500" }}>
                <Info fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "grey.700",
                borderColor: "grey.300",
              }}
            >
              Saved Filters
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "grey.700",
                borderColor: "grey.300",
              }}
            >
              Change Location
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ fontSize: "0.875rem" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "grey.900",
                  }}
                >
                  User
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.500" }}>
                  Super Admin
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "grey.500",
                    display: "block",
                  }}
                >
                  Date as of 04/06/25
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          padding: 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 288,
            borderRight: 1,
            borderColor: "grey.200",
            padding: 4,
            marginTop: 2,
          }}
        >
          <FilterPanel onFilterChange={handleFilterChange} />
        </Paper>

        <Box
          sx={{
            flex: 1,
            padding: 4,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={{ marginBottom: 4 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                label="Blocked Starved"
                value="blocked-starved"
                sx={{ px: 6 }}
              />
              <Tab label="Bottleneck" value="bottleneck" sx={{ px: 6 }} />
              <Tab label="Downtime" value="downtime" sx={{ px: 6 }} />
              <Tab label="Availability" value="availability" sx={{ px: 6 }} />
              <Tab label="Cycle Time" value="cycle-time" sx={{ px: 6 }} />
              <Tab label="Insights" value="insights" sx={{ px: 6 }} />
            </Tabs>

            {activeTab === "blocked-starved" && (
              <Box
                sx={{
                  "& > *": {
                    marginBottom: 4,
                  },
                }}
              >
                <Card sx={{ boxShadow: 1 }}>
                  <CardContent sx={{ padding: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Chart
                      </Typography>
                    </Box>
                    <AnalysisChart filters={filters} />
                  </CardContent>
                </Card>

                <Card sx={{ boxShadow: 1 }}>
                  <CardContent sx={{ padding: 4 }}>
                    <DataTable filters={filters} />
                  </CardContent>
                </Card>
              </Box>
            )}

            {activeTab === "bottleneck" && (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 256,
                  border: 1,
                  borderColor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Bottleneck Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "downtime" && (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 256,
                  border: 1,
                  borderColor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Downtime Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "availability" && (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 256,
                  border: 1,
                  borderColor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Availability Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "cycle-time" && (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 256,
                  border: 1,
                  borderColor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Cycle Time Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "insights" && (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 256,
                  border: 1,
                  borderColor: "grey.200",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ color: "grey.500" }}>
                  Insights Content
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
