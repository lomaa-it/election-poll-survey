import ReactApexChart from "react-apexcharts";
import { Box, Card, CardHeader } from "@mui/material";
import { fNumber } from "../../utils/formatNumber";
import { useChart } from "../../components/chart";

export default function BarChartWidget({
  title,
  subheader,
  chartLabels,
  chartData,
  chartColors,
  distributed = false,
  withCard = true,
  ...other
}) {
  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    dataLabels: {
      enabled: true,
      position: "inside",
    },
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
      tickAmount: 6, // reduce this number to create more space for each label  
      labels: {
        rotate: 0, // this will prevent the labels from rotating
        style: {
          fontSize: "8px", // specify your desired font size here
        },
      },
    },
  });

  // function updateFontSize() {
  //   if (window.innerWidth < 600) {
  //     chartOptions.xaxis.labels.style.fontSize = "8px";
  //   } else if (window.innerWidth < 900) {
  //     chartOptions.xaxis.labels.style.fontSize = "10px";
  //   } else {
  //     chartOptions.xaxis.labels.style.fontSize = "12px";
  //   }
  // }

  // // listen for window resize events
  // window.addEventListener("resize", updateFontSize);
  // // initial font size update
  // updateFontSize();
  const chartComponent = (
    <ReactApexChart
      type="bar"
      series={chartData}
      options={chartOptions}
      height={352}
    />
  );

  if (withCard)
    return (
      <Card
        style={{
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
