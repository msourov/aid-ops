import { Pagination, Paper, Select, Skeleton, Table } from "@mantine/core";
import {
  useGetAllVolunteersQuery,
  useGetAvailableVolunteersQuery,
} from "../api/volunteerSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SkeletonRows = () => (
  <Table.Tbody>
    {Array.from({ length: 10 }) // Create 10 skeleton rows
      .fill()
      .map((_, index) => (
        <Table.Tr key={index}>
          <Table.Td style={{ width: "5%", paddingBlock: "0.75rem" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "20%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "25%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "15%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "20%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "15%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
        </Table.Tr>
      ))}
  </Table.Tbody>
);

const Volunteer = () => {
  const [value, setValue] = useState("All");
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  const limit = 10;
  const offset = 10 * (activePage - 1);

  const {
    data: allVolunteers,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetAllVolunteersQuery({ limit, offset });

  const {
    data: availableVolunteers,
    isLoading: isLoadingAvailable,
    error: errorAvailable,
  } = useGetAvailableVolunteersQuery(
    { limit, offset },
    {
      skip: value !== "Available",
    }
  );

  useEffect(() => {
    setPage(1);
  }, [value]);

  const user = JSON.parse(localStorage.getItem("user"));

  const isLoading = value === "All" ? isLoadingAll : isLoadingAvailable;
  const error = value === "All" ? errorAll : errorAvailable;
  const volunteers = value === "All" ? allVolunteers : availableVolunteers;

  if (error) return <div>Error fetching volunteers: {error.message}</div>;

  console.log(errorAvailable);
  if (errorAvailable?.status === 401) {
    localStorage.clear();
    navigate("login");
  }

  const handlePageChange = (page) => setPage(page);

  return (
    <Paper shadow="md" mx={"5vw"} py={"2rem"} my={16}>
      <Table className="bg-blue-100 text-blue-900 font-semibold">
        <Table.Thead className="bg-[#F7FFF7] text-[#195258]">
          <Table.Tr>
            <Table.Th style={{ width: "5%" }}>ID</Table.Th>
            <Table.Th style={{ width: "20%" }}>Name</Table.Th>
            <Table.Th style={{ width: "25%" }}>Email</Table.Th>
            <Table.Th style={{ width: "15%" }}>Task Count</Table.Th>
            <Table.Th style={{ width: "20%" }}>Assigned Crisis ID</Table.Th>
            <Table.Th style={{ width: "15%" }}>
              {user?.role === "admin" ? (
                <Select
                  value={value}
                  onChange={setValue}
                  placeholder="Select status"
                  data={["All", "Available"]}
                />
              ) : (
                "Status"
              )}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        {isLoadingAll || isLoadingAvailable ? (
          <SkeletonRows />
        ) : (
          <Table.Tbody>
            {volunteers?.data.map((volunteer, index) => (
              <Table.Tr key={volunteer.user_id}>
                <Table.Td style={{ width: "5%", paddingBlock: "0.75rem" }}>
                  {index + offset + 1}
                </Table.Td>
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
        )}
      </Table>
      {!isLoading && volunteers && (
        <Pagination
          total={Math.ceil(volunteers.totalRecords / 10)}
          page={activePage}
          boundaries={3}
          onChange={handlePageChange}
          mt="md"
          mr="md"
          color="black"
          className="flex justify-end"
        />
      )}
    </Paper>
  );
};

export default Volunteer;
