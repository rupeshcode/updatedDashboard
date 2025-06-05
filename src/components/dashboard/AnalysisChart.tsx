import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Settings,
  Download,
  Fullscreen,
  Info,
  Expand,
  FullscreenOutlined,
  OpenInFullOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";

interface AnalysisChartProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  filters?: Record<string, any>;
}

const AnalysisChart = ({
  title = "Blocked Starved Analysis: WEP",
  subtitle = "Chart",
  lastUpdated = "04 Jun 2025",
  filters = {},
}: AnalysisChartProps) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "A49",
        "A54",
        "A105",
        "A10",
        "A134",
        "A55W",
        "A55S",
        "A65S",
        "A45S",
        "A45",
        "MB1_DOOR_LGHT",
        "MB1_DOOR_LOOP",
        "MB1_DOOR_LOOP2",
        "MB1_DOOR_SW",
        "MB1_DOOR_SW2",
        "MB1_DOOR_LO",
        "A45S",
        "MB1_DOOR",
        "A45",
      ],
      title: {
        text: "Agg Asset Name",
      },
      labels: {
        style: {
          fontSize: "10px",
        },
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      min: -10,
      max: 70,
    },
    legend: {
      enabled: true,
      align: "right",
      verticalAlign: "top",
      layout: "horizontal",
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
      series: {
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
    series: [
      {
        name: "Blocked (%)",
        data: [
          0, 0, 22, 20, 20, 0, 35, 35, 35, 20, 25, 0, 0, 18, 10, 0, 15, 22, 20,
        ],
        color: "#336699",
        type: "line",
      },
      {
        name: "Starved (%)",
        data: [0, 0, 0, 0, 0, 0, 5, 8, 10, 20, 15, 0, 0, 0, 0, 5, 10, 22, 15],
        color: "#FFD700",
        type: "line",
      },
    ],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      console.log("Filters updated:", filters);
    }
  }, [filters]);

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "medium" }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Last Updated: {lastUpdated}
            </Typography>
            <Tooltip title="Starved Analysis Details">
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <Info fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <OpenInFullOutlined fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <MoreVertOutlined fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 4,
                backgroundColor: "#1976d2",
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">Blocked (%)</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 4,
                backgroundColor: "#ffeb3b",
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">Starved (%)</Typography>
          </Box>
        </Box>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />
      </CardContent>
    </Card>
  );
};

export default AnalysisChart;
