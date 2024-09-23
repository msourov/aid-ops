/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Box, Button, Loader, Text } from "@mantine/core";
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

// Register the necessary chart.js components
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
    labels: ["Donations", "Expenses"], // X-axis labels
    datasets: [
      {
        // label: "Today's Funds",
        data: [
          parseFloat(dailyData.today_donation),
          parseFloat(dailyData.today_expense),
        ], // Y-axis values
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
    <>
      <Box className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 text-center place-content-center">
          <Text size="lg" weight={500}>
            Today&apos;s Summary
          </Text>
          <Text>Fund: {financialsData?.fund || "N/A"}</Text>
          <Text>
            Total Donations: {financialsData?.total_donation || "N/A"}
          </Text>
          <Text>Total Expenses: {financialsData?.total_expense || 0}</Text>
        </div>
        <div className="sm:w-[80vw] md:w-1/3 sm:mx-auto">
          <Bar data={data} options={options} />
        </div>
      </Box>
      <div className="flex justify-center mt-8 mb-6">
        <Button
          leftSection={<FaDonate size={14} />}
          color="orange"
          onClick={() => navigate("/donation")}
        >
          Donate
        </Button>
      </div>
    </>
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
