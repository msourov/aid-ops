import { useState } from "react";
import { useGetCrisesQuery } from "../api/crisisSlice";
import { Table, Box, Title, Loader, Divider, Pagination } from "@mantine/core";

const Crisis = () => {
  const [activePage, setPage] = useState(1);
  const {
    data: crises,
    isLoading: loading,
    error,
  } = useGetCrisesQuery({ limit: 10, offset: 10 * (activePage - 1) });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Box>Something went wrong.</Box>;
  }

  if (!crises?.data || crises?.data.length === 0) {
    return <Box>No crises available.</Box>;
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  const filteredCrises = crises?.data.filter(
    (item) => item.status === "approved"
  );
  return (
    <Box padding="md" className="mx-[2vw]">
      <Title order={3} align="center">
        All Crises
      </Title>
      <Divider mb={30} />
      <Table style={{ border: "1px solid gray" }}>
        <Table.Thead className="bg-gray-300">
          <Table.Tr>
            <Table.Th style={{ width: "5%" }}>ID</Table.Th>
            <Table.Th style={{ width: "20%" }}>Title</Table.Th>
            <Table.Th style={{ width: "35%" }}>Description</Table.Th>
            <Table.Th style={{ width: "25%" }}>Location</Table.Th>
            <Table.Th style={{ width: "15%" }}>Severity</Table.Th>
            <Table.Th style={{ width: "15%" }}>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredCrises.map((crisis) => (
            <Table.Tr key={crisis.id}>
              <Table.Td style={{ width: "5%" }}>{crisis.id}</Table.Td>
              <Table.Td style={{ width: "20%" }}>{crisis.title}</Table.Td>
              <Table.Td style={{ width: "35%" }}>{crisis.description}</Table.Td>
              <Table.Td style={{ width: "25%" }}>{crisis.location}</Table.Td>
              <Table.Td style={{ width: "15%" }}>
                <span
                  className={
                    crisis.severity === "low"
                      ? "bg-yellow-200 text-yellow-500"
                      : crisis.severity === "medium"
                      ? "bg-orange-300 text-orange-800"
                      : crisis.severity === "high"
                      ? "bg-red-700"
                      : "bg-gray-400"
                  }
                  style={{ padding: "0.25rem 0.5rem", borderRadius: "50px" }}
                >
                  {crisis.severity || "N/A"}
                </span>
              </Table.Td>
              <Table.Td style={{ width: "15%" }}>{crisis.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {!loading && crises && (
        <Pagination
          total={Math.ceil(crises.totalRecords / 10)}
          page={activePage}
          boundaries={3}
          onChange={handlePageChange}
          my="lg"
          mr="md"
          color="black"
          className="flex justify-end"
        />
      )}
    </Box>
  );
};

export default Crisis;
