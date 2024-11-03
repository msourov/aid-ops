import {
  Box,
  Table,
  Loader,
  TextInput,
  NumberInput,
  Button,
  Paper,
  Select,
  ScrollArea,
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
import classes from "../global.module.css";

const schema = z.object({
  item_name: z.string().min(1, { message: "Item name is required" }),
  item_type: z.enum(["relief", "expense"]),
  quantity: z.string().nonempty({ message: "Quantity is required" }),
});

const Inventory = () => {
  const { data: inventoryItems, error, isLoading } = useGetInventoryDataQuery();
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching inventory data.</div>;
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
        className="lg:w-[70%] max-h-[70svh] overflow-y-auto px-4 mx-auto shadow-lg"
      >
        <ScrollArea offsetScrollbars classNames={classes}>
          <Table className="border border-gray-500 ">
            <Table.Thead className="bg-gray-300 sticky">
              <Table.Tr>
                <Table.Th style={{ width: "5%" }}>ID</Table.Th>
                <Table.Th style={{ width: "25%" }}>Item Name</Table.Th>
                <Table.Th style={{ width: "25%" }}>Item Type</Table.Th>
                <Table.Th style={{ width: "15%" }}>Quantity</Table.Th>
                <Table.Th style={{ width: "15%" }}>Cost</Table.Th>
                <Table.Th style={{ width: "15%" }}>Purchased By</Table.Th>
                <Table.Th style={{ width: "15%" }}>Purchased Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {inventoryItems.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td style={{ width: "5%" }}>{item.id}</Table.Td>
                  <Table.Td style={{ width: "25%" }}>{item.item_name}</Table.Td>
                  <Table.Td style={{ width: "25%" }}>{item.item_type}</Table.Td>
                  <Table.Td style={{ width: "15%" }}>{item.quantity}</Table.Td>
                  <Table.Td style={{ width: "15%" }}>
                    {item.cost !== null ? item.cost : "N/A"}
                  </Table.Td>
                  <Table.Td style={{ width: "15%" }}>
                    {item.purchased_by}
                  </Table.Td>
                  <Table.Td style={{ width: "15%" }}>
                    {new Date(item.purchased_date).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </div>
  );
};

export default Inventory;
