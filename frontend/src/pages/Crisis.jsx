import { useState } from "react";
import { useGetCrisesQuery } from "../api/crisisSlice";
import { Table, Skeleton, Box, Pagination } from "@mantine/core";

const SkeletonRows = () => (
  <Table.Tbody>
    {Array(10)
      .fill()
      .map((_, index) => (
        <Table.Tr key={index}>
          <Table.Td style={{ width: "5%", paddingBlock: "0.75rem" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "20%", fontWeight: "700" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "35%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "25%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "15%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "15%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
        </Table.Tr>
      ))}
  </Table.Tbody>
);

const Crisis = () => {
  const [activePage, setPage] = useState(1);
  const {
    data: crises,
    isLoading,
    error,
  } = useGetCrisesQuery({ limit: 10, offset: 10 * (activePage - 1) });

  if (error) {
    return <Box>Error fetching crisis data.</Box>;
  }

  const handlePageChange = (page) => setPage(page);

  const filteredCrises = crises?.data.filter(
    (item) => item.status === "approved"
  );

  return (
    <Box className="my-10">
      <Box className="shadow-xl pb-4 mx-[2vw] bg-red-50 text-gray-500 font-semibold">
        <Table>
          <Table.Thead className="bg-[#F7FFF7] text-[#195258]">
            <Table.Tr>
              <Table.Th style={{ width: "5%", paddingBlock: "0.75rem" }}>
                ID
              </Table.Th>
              <Table.Th style={{ width: "20%" }}>Title</Table.Th>
              <Table.Th style={{ width: "35%" }}>Description</Table.Th>
              <Table.Th style={{ width: "25%" }}>Location</Table.Th>
              <Table.Th style={{ width: "15%" }}>Severity</Table.Th>
              <Table.Th style={{ width: "15%" }}>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {isLoading ? (
            <SkeletonRows />
          ) : (
            <Table.Tbody>
              {filteredCrises.map((crisis) => (
                <Table.Tr key={crisis.id}>
                  <Table.Td style={{ width: "5%", paddingBlock: "0.75rem" }}>
                    {crisis.id}
                  </Table.Td>
                  <Table.Td style={{ width: "20%", fontWeight: "700" }}>
                    {crisis.title}
                  </Table.Td>
                  <Table.Td style={{ width: "35%" }}>
                    {crisis.description}
                  </Table.Td>
                  <Table.Td style={{ width: "25%" }}>
                    {crisis.location}
                  </Table.Td>
                  <Table.Td style={{ width: "15%" }}>
                    <span
                      className={`font-semibold ${
                        crisis.severity === "low"
                          ? "bg-green-200 text-green-500"
                          : crisis.severity === "medium"
                          ? "bg-yellow-200 text-yellow-600"
                          : crisis.severity === "high"
                          ? "bg-red-200 text-red-600"
                          : "bg-gray-400"
                      }`}
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "50px",
                      }}
                    >
                      {crisis.severity || "N/A"}
                    </span>
                  </Table.Td>
                  <Table.Td style={{ width: "15%" }}>{crisis.status}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          )}
        </Table>
        {!isLoading && crises && (
          <Pagination
            total={Math.ceil(crises.totalRecords / 10)}
            page={activePage}
            boundaries={3}
            onChange={handlePageChange}
            mt="xl"
            mb="lg"
            mr="md"
            color="black"
            className="flex justify-end"
          />
        )}
      </Box>
    </Box>
  );
};

export default Crisis;
