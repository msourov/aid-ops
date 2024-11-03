import { Paper, Select, Table } from "@mantine/core";
import {
  useGetAllVolunteersQuery,
  useGetAvailableVolunteersQuery,
} from "../api/volunteerSlice";
import { useState } from "react";

const Volunteer = () => {
  const [value, setValue] = useState("All"); // Default value set to 'All'

  const {
    data: allVolunteers = [],
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetAllVolunteersQuery();

  const {
    data: availableVolunteers = [],
    isLoading: isLoadingAvailable,
    error: errorAvailable,
  } = useGetAvailableVolunteersQuery(undefined, {
    skip: value !== "Available",
  });

  const isLoading = value === "All" ? isLoadingAll : isLoadingAvailable;
  const error = value === "All" ? errorAll : errorAvailable;
  const volunteers = value === "All" ? allVolunteers : availableVolunteers;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching volunteers: {error.message}</div>;

  return (
    <Paper shadow="md" mx={"5vw"} my={"2rem"}>
      <Table className="border border-gray-500">
        <Table.Thead className="bg-gray-300">
          <Table.Tr>
            <Table.Th style={{ width: "5%" }}>ID</Table.Th>
            <Table.Th style={{ width: "20%" }}>Name</Table.Th>
            <Table.Th style={{ width: "25%" }}>Email</Table.Th>
            <Table.Th style={{ width: "15%" }}>Task Count</Table.Th>
            <Table.Th style={{ width: "20%" }}>Assigned Crisis ID</Table.Th>
            <Table.Th style={{ width: "15%" }}>
              <Select
                label="Status"
                value={value}
                onChange={setValue}
                placeholder="Select status"
                data={["All", "Available"]}
              />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {volunteers.map((volunteer) => (
            <Table.Tr key={volunteer.user_id}>
              <Table.Td style={{ width: "5%" }}>{volunteer.user_id}</Table.Td>
              <Table.Td style={{ width: "20%" }}>{volunteer.name}</Table.Td>
              <Table.Td style={{ width: "25%" }}>{volunteer.email}</Table.Td>
              <Table.Td style={{ width: "15%" }}>
                {volunteer.task_count}
              </Table.Td>
              <Table.Td style={{ width: "20%" }}>
                {volunteer.assigned_crisis_id || "None"}
              </Table.Td>
              <Table.Td style={{ width: "15%" }}>{volunteer.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default Volunteer;
