import { useGetCrisesQuery } from "../api/crisisSlice";
import { Table, Box, Title, Loader, Divider } from "@mantine/core";

const Crisis = () => {
  const { data: crises, isLoading, error } = useGetCrisesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Box>Something went wrong.</Box>;
  }

  if (!crises || crises.length === 0) {
    return <Box>No crises available.</Box>;
  }
  const filteredCrises = crises.filter((item) => item.status === "approved");
  return (
    <Box padding="md" className="mx-[2vw]">
      <Title order={3} align="center">
        All Crises
      </Title>
      <Divider mb={30} />
      <Table className="border border-gray-500">
        <Table.Thead className="bg-gray-300">
          <Table.Tr>
            <Table.Th style={{ width: "5%" }}>ID</Table.Th>
            <Table.Th style={{ width: "25%" }}>Title</Table.Th>
            <Table.Th style={{ width: "35%" }}>Description</Table.Th>
            <Table.Th style={{ width: "20%" }}>Location</Table.Th>
            <Table.Th style={{ width: "15%" }}>Severity</Table.Th>
            <Table.Th style={{ width: "15%" }}>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredCrises.map((crisis) => (
            <Table.Tr key={crisis.id}>
              <Table.Td style={{ width: "5%" }}>{crisis.id}</Table.Td>
              <Table.Td style={{ width: "25%" }}>{crisis.title}</Table.Td>
              <Table.Td style={{ width: "35%" }}>{crisis.description}</Table.Td>
              <Table.Td style={{ width: "20%" }}>{crisis.location}</Table.Td>
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
    </Box>
  );
};

export default Crisis;
