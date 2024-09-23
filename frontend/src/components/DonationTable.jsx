/* eslint-disable react/prop-types */
import { Table, Text, Loader, Box } from "@mantine/core";
// import PropTypes from "prop-types";

const DonationTable = ({ donations, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!donations || donations.length === 0) {
    return <Text>No donations found.</Text>;
  }

  return (
    <Box className="mx-[5vw] shadow-lg">
      <Table>
        <TableHeading />
        <TableBody donations={donations} />
      </Table>
    </Box>
  );
};

const TableHeading = () => {
  return (
    <Table.Thead className="bg-gray-300">
      <Table.Tr>
        <Table.Th style={{ width: "5%" }}>ID</Table.Th>
        <Table.Th style={{ width: "25%" }}>Donor Name</Table.Th>
        <Table.Th style={{ width: "30%" }}>Donor Email</Table.Th>
        <Table.Th style={{ width: "20%" }}>Amount (USD)</Table.Th>
        <Table.Th style={{ width: "20%" }}>Donation Date</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

const TableBody = ({ donations }) => {
  return (
    <Table.Tbody>
      {donations.map((donation, index) => (
        <Table.Tr key={index}>
          <Table.Td style={{ width: "5%" }}>{donation.id}</Table.Td>
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
