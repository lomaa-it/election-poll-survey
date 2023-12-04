import ReactApexChart from "react-apexcharts";
import { Box, Card, CardHeader } from "@mui/material";
import { fNumber } from "../../utils/formatNumber";
import { useChart } from "../../components/chart";

export default function BarChartWidget({ title, subheader, chartLabels, chartData, chartColors, distributed = false, withCard = true, ...other }) {
  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    plotOptions: {
      bar: {
        borderRadius: 2,
        distributed: distributed,
        dataLabels: {
          total: {
            enabled: true,
          },
        },
      },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  const chartComponent = <ReactApexChart type="bar" series={chartData} options={chartOptions} height={352} />;

  if (withCard)
    return (
      <Card
        sx={{
          boxShadow: "0px 0px 5px #969696",
        }}
        {...other}
      >
        <CardHeader title={title} subheader={subheader} />

        <Box sx={{ mx: 3 }} dir="ltr">
          {chartComponent}
        </Box>
      </Card>
    );

  return chartComponent;
}
