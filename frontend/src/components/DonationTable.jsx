/* eslint-disable react/prop-types */
import { Table, Text, Box, Pagination, Alert, Skeleton } from "@mantine/core";
import { useGetAllDonationsQuery } from "../api/donationSlice";
import { useState } from "react";
// import PropTypes from "prop-types";

const SkeletonRows = () => (
  <Table.Tbody>
    {Array(10)
      .fill()
      .map((_, i) => (
        <Table.Tr key={i}>
          <Table.Td style={{ width: "5%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "25%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "30%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "20%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "20%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
        </Table.Tr>
      ))}
  </Table.Tbody>
);

const DonationTable = () => {
  const [activePage, setPage] = useState(1);
  const {
    data: donations,
    isLoading: loading,
    error,
  } = useGetAllDonationsQuery({
    limit: 10,
    offset: 10 * (activePage - 1),
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (!loading && (!donations?.data || donations?.data.length === 0)) {
    return <Text>No donations found.</Text>;
  }

  if (error) {
    <Alert variant="light" color="red" title="Error">
      {error.message || "An error occurred while fetching data."}
    </Alert>;
  }

  return (
    <Box
      className="mx-[5vw] shadow-lg pb-4"
      style={{ border: "1px solid gray" }}
    >
      <Table>
        <Table.Thead className="bg-[#F7FFF7] text-[#195258]">
          <Table.Tr>
            <Table.Th style={{ width: "5%" }}>Serial</Table.Th>
            <Table.Th style={{ width: "25%" }}>Donor Name</Table.Th>
            <Table.Th style={{ width: "30%" }}>Donor Email</Table.Th>
            <Table.Th style={{ width: "20%" }}>Amount (USD)</Table.Th>
            <Table.Th style={{ width: "20%" }}>Donation Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {loading ? (
          <SkeletonRows />
        ) : (
          <TableBody donations={donations?.data} activePage={activePage} />
        )}
      </Table>
      {!loading && donations && (
        <Pagination
          total={Math.ceil(donations.totalRecords / 10)}
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

const TableBody = ({ donations, activePage }) => {
  return (
    <Table.Tbody>
      {donations.map((donation, index) => (
        <Table.Tr key={donation.id}>
          <Table.Td style={{ width: "5%", paddingBlock: "0.75rem" }}>
            {(activePage - 1) * 10 + index + 1}
          </Table.Td>
          <Table.Td style={{ width: "25%" }}>{donation.donor_name}</Table.Td>
          <Table.Td style={{ width: "30%" }}>{donation.donor_email}</Table.Td>
          <Table.Td style={{ width: "20%" }}>
            {/* Ensure the amount is formatted to two decimal places */}
            {donation.amount}
          </Table.Td>
          <Table.Td style={{ width: "20%" }}>
            {/* Format the donation_date to a readable format */}
            {new Date(donation.donation_date).toLocaleString()}
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};

// DonationTable.propTypes = {
//   donations: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       donor_name: PropTypes.string.isRequired,
//       donor_email: PropTypes.string.isRequired,
//       amount: PropTypes.number.isRequired,
//       donation_date: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   loading: PropTypes.bool.isRequired,
// };

export default DonationTable;
