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
} from "@mui/material";
import { Settings, Download, Fullscreen } from "@mui/icons-material";

interface AnalysisChartProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  filters?: Record<string, any>;
}

const AnalysisChart = ({
  title = "Blocked Starved Analysis: WEP",
  subtitle = "Chart",
  lastUpdated = "16 Jan 2025",
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

  const handleExportChart = () => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.exportChart({
        type: "image/png",
        filename: "blocked-starved-analysis",
      });
    }
  };

  const handleFullscreen = () => {
    if (chartRef.current && chartRef.current.chart) {
      if (chartRef.current.chart.fullscreen) {
        chartRef.current.chart.fullscreen.toggle();
      }
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-4">
        <Box className="flex justify-between items-center mb-4">
          <Box>
            <Typography variant="h6" className="font-medium">
              {title}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {subtitle}
            </Typography>
          </Box>
          <Box className="flex items-center gap-2">
            <Typography variant="caption" className="text-gray-500">
              Last Updated: {lastUpdated}
            </Typography>
            <Box className="flex gap-1">
              <IconButton size="small" onClick={handleExportChart}>
                <Download fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleFullscreen}>
                <Fullscreen fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Settings fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className="flex items-center gap-4 mb-4">
          <Box className="flex items-center gap-1">
            <Box className="w-4 h-1 bg-blue-600 rounded"></Box>
            <Typography variant="caption">Blocked (%)</Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <Box className="w-4 h-1 bg-yellow-400 rounded"></Box>
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
