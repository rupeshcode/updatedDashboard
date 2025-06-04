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
    <Box className="min-h-screen bg-white-50 mb-2">
      <AppBar
        position="static"
        elevation={1}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar className="px-4 w-auto">
          <Box className="flex items-center gap-2 flex-1">
            <img src="/ford.jpeg" alt="Ford Logo" className="h-8 w-auto" />
            <Typography variant="h6" className="text-gray-900 font-semibold">
              MOS - Constraint Management
            </Typography>
            <IconButton size="small" className="text-gray-500">
              <Info fontSize="small" />
            </IconButton>
          </Box>

          <Box className="flex items-center gap-4">
            <Button
              variant="outlined"
              className="text-gray-700 border-gray-300"
            >
              Saved Filters
            </Button>
            <Button
              variant="outlined"
              className="text-gray-700 border-gray-300"
            >
              Change Location
            </Button>
            <Box className="flex items-center gap-2">
              <Box className="text-sm">
                <Typography
                  variant="body2"
                  className="font-medium text-gray-900"
                >
                  Rupesh
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Super Admin
                </Typography>
                <Typography variant="caption" className="text-gray-500 block">
                  Date as of 04/06/25
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} className="flex p-0">
        <Paper className="w-72 border-r border-gray-200 p-4 mt-2" elevation={0}>
          <FilterPanel onFilterChange={handleFilterChange} />
        </Paper>

        <Box className="flex-1 p-4 max-w-full overflow-x-auto">
          <Box className="w-full">
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              className="mb-4"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                label="Blocked Starved"
                value="blocked-starved"
                className="px-6"
              />
              <Tab label="Bottleneck" value="bottleneck" className="px-6" />
              <Tab label="Downtime" value="downtime" className="px-6" />
              <Tab label="Availability" value="availability" className="px-6" />
              <Tab label="Cycle Time" value="cycle-time" className="px-6" />
              <Tab label="Insights" value="insights" className="px-6" />
            </Tabs>

            {activeTab === "blocked-starved" && (
              <Box className="space-y-4">
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <Box className="flex items-center justify-between mb-2">
                      <Typography variant="h6" className="font-medium">
                        Chart
                      </Typography>
                    </Box>
                    <AnalysisChart filters={filters} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <DataTable filters={filters} />
                  </CardContent>
                </Card>
              </Box>
            )}

            {activeTab === "bottleneck" && (
              <Paper className="flex items-center justify-center h-64 border border-gray-200 rounded-md">
                <Typography className="text-gray-500">
                  Bottleneck Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "downtime" && (
              <Paper className="flex items-center justify-center h-64 border border-gray-200 rounded-md">
                <Typography className="text-gray-500">
                  Downtime Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "availability" && (
              <Paper className="flex items-center justify-center h-64 border border-gray-200 rounded-md">
                <Typography className="text-gray-500">
                  Availability Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "cycle-time" && (
              <Paper className="flex items-center justify-center h-64 border border-gray-200 rounded-md">
                <Typography className="text-gray-500">
                  Cycle Time Analysis Content
                </Typography>
              </Paper>
            )}

            {activeTab === "insights" && (
              <Paper className="flex items-center justify-center h-64 border border-gray-200 rounded-md">
                <Typography className="text-gray-500">
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
