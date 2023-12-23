import ReactApexChart from "react-apexcharts";
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import { useChart } from "../../components/chart";
import { fNumber } from "../../utils/formatNumber";
import { Typography } from "@mui/material";
import { VerticalAlignBottom } from "@mui/icons-material";

const CHART_HEIGHT = 352;
const LEGEND_HEIGHT = 80;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default function PieChartWidget({
  title,
  subheader,
  chartColors,
  chartData,
  type = "pie",
  ...other
}) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);
  // console.log("chartData", chartData);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartData.map((item) => item.label + ` (${fNumber(item.value)})`),
    // labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      floating: true,
      horizontalAlign: "center",
      verticalAlign: "center",
      fontSize: "10px",
    },
    dataLabels: {
      enabled: true,
      minAngleToShowLabel: 0,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => "",
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: false },
        },
        dataLabels: {
          minAngleToShowLabel: 0,
        },
      },
    },
  });

  const [headerTitle, totalCount] = title.split("-");
  // console.log(headerTitle, totalCount);

  return (
    <Card
      {...other}
      sx={{
        boxShadow: "0px 0px 5px #969696",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0px",
              margin: "0px",
            }}
          >
            {totalCount === undefined ? (
              <>{headerTitle}</>
            ) : (
              <>
                {" "}
                {headerTitle} - &nbsp;
                <Typography
                  sx={{
                    backgroundColor: "#3890BF",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "bold",
                    borderRadius: "25%",
                    padding: "0px 10px",
                  }}
                >
                  {totalCount}
                </Typography>
              </>
            )}
          </Typography>
        }
        subheader={subheader}
      />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          type={type}
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
}
