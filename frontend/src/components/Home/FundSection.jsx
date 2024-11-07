/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Box, Button, Divider, Paper, Skeleton, Text } from "@mantine/core";
import { FaDonate } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoadingFinancials = () =>
  Array(4)
    .fill()
    .map((_, index) => <Skeleton height={16} mt={6} radius="xl" key={index} />);

const FundSection = ({ monthlyData, financialsData, loading, error }) => {
  const navigate = useNavigate();
  if (error) {
    return <Box>Something went wrong.</Box>;
  }

  const data = {
    labels: ["Donations", "Expenses"],
    datasets: [
      {
        data: [
          parseFloat(monthlyData.total_donation),
          parseFloat(monthlyData.total_expense),
        ],
        backgroundColor: ["#D2F898", "#FCFCFC"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Change legend text color to white
        },
      },
      title: {
        display: true,
        text: "Last Month's Statistics",
        color: "white", // Change title text color to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Change x-axis tick color to white
        },
      },
      y: {
        ticks: {
          color: "white", // Change y-axis tick color to white
        },
      },
    },
  };

  return (
    <div className="py-6 bg-[#1A535C]">
      <Box className="flex flex-col md:flex-row ">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 flex flex-col items-center place-content-center">
          {loading ? (
            <LoadingFinancials />
          ) : (
            <Paper radius="lg" shadow="md" p="xl" className="text-left">
              <Text size="lg" fw={700} mb={4}>
                Financial Overview
              </Text>
              <Divider mb={10} />
              <Text fw={600}>
                <Text span c="dimmed" fw="bold">
                  Current Fund:{" "}
                </Text>
                $ {financialsData?.fund || "N/A"}
              </Text>
              <Text fw={600}>
                <Text span c="dimmed" fw="bold">
                  Total Donation:{" "}
                </Text>
                ${financialsData?.total_donation || 0}
              </Text>
              <Text fw={600}>
                <Text span c="dimmed" fw="bold">
                  Total Expense:{" "}
                </Text>
                ${financialsData?.total_expenses || 0}
              </Text>
            </Paper>
          )}
        </div>
        <div className="sm:w-[80vw] md:w-1/3 sm:mx-auto">
          <Bar data={data} options={options} />
        </div>
      </Box>
      <div className="flex justify-center mt-8 mb-0">
        <Button
          leftSection={<FaDonate size={14} />}
          color="orange"
          onClick={() => navigate("/donation")}
        >
          Donate
        </Button>
      </div>
    </div>
  );
};

FundSection.propTypes = {
  dailyData: PropTypes.shape({
    total_donation: PropTypes.string.isRequired,
    total_expense: PropTypes.string.isRequired,
  }).isRequired,
  financialsData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default FundSection;
