import {
  Box,
  Table,
  Loader,
  TextInput,
  NumberInput,
  Button,
  Paper,
  Select,
  Pagination,
  Skeleton,
} from "@mantine/core";
import {
  useAddToInventoryMutation,
  useGetInventoryDataQuery,
} from "../api/inventorySlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

const schema = z.object({
  item_name: z.string().min(1, { message: "Item name is required" }),
  item_type: z.enum(["relief", "expense"]),
  quantity: z.string().nonempty({ message: "Quantity is required" }),
});

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
          <Table.Td style={{ width: "10%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "10%" }}>
            <Skeleton height={24} radius="md" />
          </Table.Td>
          <Table.Td style={{ width: "10%" }}>
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

const Inventory = () => {
  const [activePage, setPage] = useState(1);
  const limit = 10;
  const offset = 10 * (activePage - 1);

  const {
    data: inventory,
    error,
    isLoading,
  } = useGetInventoryDataQuery({ limit: limit, offset: offset });
  const [createInventoryItem] = useAddToInventoryMutation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (error?.status === 401) {
    localStorage.clear();
  }
  console.log(error);

  const handlePageChange = (page) => setPage(page);

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = "cost" in data ? data : { ...data, cost: 0 };
    try {
      const response = await createInventoryItem(payload).unwrap();
      // console.log(response);
      notifications.show({
        title: "Success",
        message: response.message,
        color: "green",
      });
      setLoading(false);
      reset();
      setValue("item_type", "");
    } catch (error) {
      console.error("Error adding item:", error);
      setLoading(false);
      notifications.show({
        title: "Error",
        message: error?.data?.detail || "Something went wrong.",
        color: "red",
      });
    }
  };

  const item_type = watch("item_type");

  if (error?.status === 401) {
    localStorage.clear();
  }

  if (error) {
    return <div>Error fetching inventory data</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 my-6 lg:my-10  lg:mx-[5vw]">
      <Box className="lg:w-[30%] mx-auto">
        <Paper withBorder shadow="xl" radius="md" px={30} py={10}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <TextInput
              label="Item Name"
              placeholder="Utensils"
              {...register("item_name")}
              error={errors.item_name?.message}
              required
            />
            <Select
              label="Item Type"
              placeholder="Select item type"
              error={errors.item_type?.message}
              required
              value={item_type}
              onChange={(value) => {
                if (value) {
                  setValue("item_type", value);
                }
              }}
              data={[
                { value: "relief", label: "Relief" },
                { value: "expense", label: "Expense" },
              ]}
            />

            <TextInput
              label="Quantity"
              placeholder="10 unit"
              {...register("quantity")}
              error={errors.quantity?.message}
              required
            />
            <NumberInput
              label="Cost"
              placeholder="1000"
              {...register("cost", { valueAsNumber: true })}
              error={errors.cost?.message}
              onChange={(value) => setValue("cost", value)}
            />
            <div className="flex flex-col items-center">
              <Button
                mt="lg"
                type="submit"
                color="black"
                className="rounded-lg bg-black"
                disabled={loading}
              >
                {loading ? <Loader color="white" size={20} /> : "Add Item"}
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
      <Box
        padding="md"
        className="mx-auto shadow-lg w-full"
        style={{ border: "1px solid gray" }}
      >
        <Table className="border border-gray-500">
          <Table.Thead className="bg-[#F7FFF7] text-[#195258]">
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>ID</Table.Th>
              <Table.Th style={{ width: "25%" }}>Item Name</Table.Th>
              <Table.Th style={{ width: "10%" }}>Item Type</Table.Th>
              <Table.Th style={{ width: "10%" }}>Quantity</Table.Th>
              <Table.Th style={{ width: "10%" }}>Cost</Table.Th>
              <Table.Th style={{ width: "20%" }}>Purchased By</Table.Th>
              <Table.Th style={{ width: "20%" }}>Purchased Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {isLoading ? (
            <SkeletonRows />
          ) : (
            <Table.Tbody>
              {inventory?.data.map((item, index) => (
                <Table.Tr key={`i-${index}`}>
                  <Table.Td style={{ width: "5%" }}>
                    {index + offset + 1}
                  </Table.Td>
                  <Table.Td style={{ width: "25%" }}>{item.item_name}</Table.Td>
                  <Table.Td style={{ width: "10%" }}>{item.item_type}</Table.Td>
                  <Table.Td style={{ width: "10%" }}>{item.quantity}</Table.Td>
                  <Table.Td style={{ width: "10%" }}>
                    {item.cost !== null ? item.cost : "N/A"}
                  </Table.Td>
                  <Table.Td style={{ width: "20%" }}>
                    {item.purchased_by.name}
                  </Table.Td>
                  <Table.Td style={{ width: "20%" }}>
                    {new Date(item.purchased_date).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          )}
        </Table>
        {!isLoading && inventory && (
          <Pagination
            total={Math.ceil(inventory.totalRecords / 10)}
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
    </div>
  );
};

export default Inventory;
