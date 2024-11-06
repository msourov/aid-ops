// /* eslint-disable react/prop-types */
// import { Table, Text, Box, Title, Divider } from "@mantine/core";
// import PropTypes from "prop-types";

// const VolunteerSection = ({ volunteers }) => {
//   if (!volunteers || volunteers.length === 0) {
//     return <Text>No volunteers found.</Text>;
//   }

//   return (
//     <Box className="px-[5vw] py-10 ">
//       <Title order={3} className="font-bold text-blue-500 text-center">
//         Here will be recent volunteer activities
//       </Title>
//       <div className="flex justify-center mb-4">
//         <Divider w="500px" color="#07553B" />
//       </div>
//       <Table className="mt-8">
//         <TableHeading />
//         <TableBody volunteers={volunteers} />
//       </Table>
//     </Box>
//   );
// };

// const TableHeading = () => {
//   return (
//     <Table.Thead className="bg-gray-300">
//       <Table.Tr>
//         <Table.Th style={{ width: "10%" }}>Serial</Table.Th>
//         <Table.Th style={{ width: "25%" }}>Name</Table.Th>
//         <Table.Th style={{ width: "25%" }}>Email</Table.Th>
//         <Table.Th style={{ width: "20%" }}>Phone</Table.Th>
//         <Table.Th style={{ width: "20%" }}>Age</Table.Th>
//         {/* <Table.Th style={{ width: "10%" }}>Action</Table.Th> */}
//       </Table.Tr>
//     </Table.Thead>
//   );
// };

// const TableBody = ({ volunteers }) => {
//   return (
//     <Table.Tbody>
//       {volunteers.map((item, index) => (
//         <Table.Tr key={index}>
//           <Table.Td style={{ width: "10%" }}>{index + 1}</Table.Td>
//           <Table.Td style={{ width: "25%" }}>{item.name}</Table.Td>
//           <Table.Td style={{ width: "25%" }}>{item.email}</Table.Td>
//           <Table.Td style={{ width: "25%" }}>{item.mobile}</Table.Td>
//           <Table.Td style={{ width: "20%" }}>{item.age}</Table.Td>
//         </Table.Tr>
//       ))}
//     </Table.Tbody>
//   );
// };

// VolunteerSection.propTypes = {
//   volunteers: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       phone: PropTypes.string.isRequired,
//       created_at: PropTypes.string.isRequired,
//       age: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.bool.isRequired,
// };

// export default VolunteerSection;
