import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { ArrowBack, BackHand, Save } from "@mui/icons-material";

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [filterName, setFilterName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filters, setFilters] = useState<FilterState>({
    year: "",
    month: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    parentGroupName: "",
    segment: "",
    lineGroup: "",
    aggAssetName: "",
    assetType: "",
    shiftName: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      year: "",
      month: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      parentGroupName: "",
      segment: "",
      lineGroup: "",
      aggAssetName: "",
      assetType: "",
      shiftName: "",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const handleSave = () => {
    alert(`Filter "${filterName}" saved!`);
    handleClose();
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Card
          elevation={0}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            overflowY: "auto",
          }}
        >
          <CardContent sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
                width: "auto",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                FILTERS
              </Typography>
              <Button variant="outlined" onClick={handleReset} size="small">
                Reset
              </Button>

              <IconButton size="small" onClick={handleOpen}>
                <Save fontSize="inherit" />
              </IconButton>

              <IconButton size="small">
                <ArrowBack fontSize="inherit" />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  label="Year"
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Month</InputLabel>
                <Select
                  value={filters.month}
                  onChange={(e) => handleFilterChange("month", e.target.value)}
                  label="Month"
                >
                  <MenuItem value="01">January</MenuItem>
                  <MenuItem value="02">February</MenuItem>
                  <MenuItem value="03">March</MenuItem>
                  <MenuItem value="04">April</MenuItem>
                  <MenuItem value="05">May</MenuItem>
                  <MenuItem value="06">June</MenuItem>
                  <MenuItem value="07">July</MenuItem>
                  <MenuItem value="08">August</MenuItem>
                  <MenuItem value="09">September</MenuItem>
                  <MenuItem value="10">October</MenuItem>
                  <MenuItem value="11">November</MenuItem>
                  <MenuItem value="12">December</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <DatePicker
                  label="From Date"
                  value={filters.dateRange.from}
                  onChange={(date) =>
                    handleDateRangeChange({ ...filters.dateRange, from: date })
                  }
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
                <DatePicker
                  label="To Date"
                  value={filters.dateRange.to}
                  onChange={(date) =>
                    handleDateRangeChange({ ...filters.dateRange, to: date })
                  }
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>Parent Group Name</InputLabel>
                <Select
                  value={filters.parentGroupName}
                  onChange={(e) =>
                    handleFilterChange("parentGroupName", e.target.value)
                  }
                  label="Parent Group Name"
                >
                  <MenuItem value="group1">Group 1</MenuItem>
                  <MenuItem value="group2">Group 2</MenuItem>
                  <MenuItem value="group3">Group 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Segment</InputLabel>
                <Select
                  value={filters.segment}
                  onChange={(e) =>
                    handleFilterChange("segment", e.target.value)
                  }
                  label="Segment"
                >
                  <MenuItem value="segment1">Segment 1</MenuItem>
                  <MenuItem value="segment2">Segment 2</MenuItem>
                  <MenuItem value="segment3">Segment 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Line/Group</InputLabel>
                <Select
                  value={filters.lineGroup}
                  onChange={(e) =>
                    handleFilterChange("lineGroup", e.target.value)
                  }
                  label="Line/Group"
                >
                  <MenuItem value="line1">Line 1</MenuItem>
                  <MenuItem value="line2">Line 2</MenuItem>
                  <MenuItem value="line3">Line 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Agg Asset Name</InputLabel>
                <Select
                  value={filters.aggAssetName}
                  onChange={(e) =>
                    handleFilterChange("aggAssetName", e.target.value)
                  }
                  label="Agg Asset Name"
                >
                  <MenuItem value="asset1">A101</MenuItem>
                  <MenuItem value="asset2">A104</MenuItem>
                  <MenuItem value="asset3">A105</MenuItem>
                  <MenuItem value="asset4">A10</MenuItem>
                  <MenuItem value="asset5">A124</MenuItem>
                  <MenuItem value="asset6">A55W</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Asset Type</InputLabel>
                <Select
                  value={filters.assetType}
                  onChange={(e) =>
                    handleFilterChange("assetType", e.target.value)
                  }
                  label="Asset Type"
                >
                  <MenuItem value="type1">Type 1</MenuItem>
                  <MenuItem value="type2">Type 2</MenuItem>
                  <MenuItem value="type3">Type 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Shift Name</InputLabel>
                <Select
                  value={filters.shiftName}
                  onChange={(e) =>
                    handleFilterChange("shiftName", e.target.value)
                  }
                  label="Shift Name"
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="night">Night</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </LocalizationProvider>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Save Filter
          </Typography>
          <TextField
            id="filter-name"
            label="Filter Name"
            variant="outlined"
            fullWidth
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FilterPanel;
