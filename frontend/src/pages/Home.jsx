import { Container, Divider } from "@mantine/core";
import FundSection from "../components/Home/FundSection";
import CrisisSection from "../components/Home/CrisisSection";
import VolunteerSection from "../components/Home/VolunteerSection";
import { useGetTodayDonationExpenseQuery } from "../api/donationSlice";
import { useGetFinancialDataQuery } from "../api/financialsSlice";
import { useGetCrisesQuery } from "../api/crisisSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: dailyData,
    isLoading: loadingDailyData,
    error: dailyDataError,
  } = useGetTodayDonationExpenseQuery();
  const {
    data: financialsData,
    isLoading: loadingFinancialsData,
    error: financialDataError,
  } = useGetFinancialDataQuery();
  const {
    data: crisesData,
    isLoading: crisesDataLoading,
    error: crisesError,
  } = useGetCrisesQuery();

  const filteredCrisisData =
    crisesData && crisesData.filter((item) => item.status !== "rejected");

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const volunteers = users && users.filter((item) => item.role === "volunteer");
  return (
    <Container fluid className="max-h-[90vh] overflow-y-auto">
      {dailyData && financialsData && (
        <FundSection
          dailyData={dailyData}
          financialsData={financialsData}
          loading={loadingDailyData || loadingFinancialsData}
          error={financialDataError || dailyDataError}
        />
      )}
      <Divider my="0.5rem" />
      <CrisisSection
        crises={filteredCrisisData}
        loading={crisesDataLoading}
        error={crisesError}
      />
      <VolunteerSection volunteers={volunteers} loading={loading} />
    </Container>
  );
};

export default Home;
