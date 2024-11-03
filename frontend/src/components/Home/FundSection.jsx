/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Box, Button, Loader, Paper, Text } from "@mantine/core";
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

const FundSection = ({ dailyData, financialsData, loading, error }) => {
  const navigate = useNavigate();
  if (loading) return <Loader />;
  if (error) {
    return <Box>Something went wrong.</Box>;
  }
  const data = {
    labels: ["Donations", "Expenses"],
    datasets: [
      {
        data: [
          parseFloat(dailyData.today_donation),
          parseFloat(dailyData.today_expense),
        ],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Donation vs Expense",
      },
    },
  };

  return (
    <div className="py-12 bg-[#abd7f3]">
      <Box className="flex flex-col md:flex-row ">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 flex flex-col items-center place-content-center">
          <Paper radius="lg" shadow="md" p="xl" className="text-center">
            <Text size="lg" fw={700} mb={4}>
              Today&apos;s Summary
            </Text>
            <Text fw={600}>Fund: {financialsData?.fund || "N/A"}</Text>
            <Text fw={600}>
              Total Donations: {financialsData?.total_donation || "N/A"}
            </Text>
            <Text fw={600}>
              Total Expenses: {financialsData?.total_expenses || 0}
            </Text>
          </Paper>
        </div>
        <div className="sm:w-[80vw] md:w-1/3 sm:mx-auto">
          <Bar data={data} options={options} />
        </div>
      </Box>
      <div className="flex justify-center mt-12 mb-0">
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
    today_donation: PropTypes.string.isRequired,
    today_expense: PropTypes.string.isRequired,
  }).isRequired,
  financialsData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default FundSection;
