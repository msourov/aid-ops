import { Box, Divider } from "@mantine/core";
import FundSection from "../components/Home/FundSection";
import CrisisSection from "../components/Home/CrisisSection";
import { useGetMonthlyDonationExpenseQuery } from "../api/donationSlice";
import { useGetFinancialDataQuery } from "../api/financialsSlice";
import { useGetCrisesQuery } from "../api/crisisSlice";
import { useGetTasksQuery } from "../api/taskSlice";
import { ActivitySection } from "../components/Home/ActivitySection";

const Home = () => {
  const {
    data: monthlyData,
    isLoading: loadingMonthlyData,
    error: monthlyDataError,
  } = useGetMonthlyDonationExpenseQuery();
  const {
    data: financials,
    isLoading: loadingFinancialsData,
    error: financialDataError,
  } = useGetFinancialDataQuery();
  const {
    data: crises,
    isLoading: crisesDataLoading,
    error: crisesError,
  } = useGetCrisesQuery({ limit: 10, offset: 0 });

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useGetTasksQuery({ limit: 10, offset: 0 });

  const recentTasks = tasks?.data.filter(
    (item) => item.status === "in-progress"
  );

  console.log(JSON.stringify(recentTasks, undefined, 2));

  const filteredCrisis =
    crises && crises?.data.filter((item) => item.status !== "rejected");

  return (
    <Box className="overflow-y-auto text-[#07553B]">
      {monthlyData && financials && (
        <FundSection
          monthlyData={monthlyData}
          financialsData={financials}
          loading={loadingMonthlyData || loadingFinancialsData}
          error={financialDataError || monthlyDataError}
        />
      )}
      <Divider color="gray" />
      <CrisisSection
        crises={filteredCrisis}
        loading={crisesDataLoading}
        error={crisesError}
      />
      <Divider color="gray" />
      <ActivitySection
        recentTasks={recentTasks}
        tasksLoading={tasksLoading}
        error={tasksError}
      />
    </Box>
  );
};

export default Home;
