import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Loader,
  Modal,
  Paper,
  Select,
  Table,
  Textarea,
} from "@mantine/core";
import { useCreateTaskMutation, useGetTasksQuery } from "../../api/taskSlice";
import { useGetVolunteerOptionsQuery } from "../../api/volunteerSlice";
import { useGetCrisesOptionsQuery } from "../../api/crisisSlice";
import classes from "../../global.module.css";
import { useDisclosure } from "@mantine/hooks";

const taskSchema = z.object({
  task_description: z.string().min(1, "Task description is required"),
  volunteer_id: z.number().int().min(1, "Volunteer ID is required"),
  crisis_id: z.number().int().min(1, "Crisis ID is required"),
});

const VolunteerManagement = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });
  const { data: tasks = [], isLoading, error } = useGetTasksQuery();
  const { data: volunteerOptions = [], refetch } =
    useGetVolunteerOptionsQuery();
  const { data: crisesOptions = [] } = useGetCrisesOptionsQuery();
  const [createTask] = useCreateTaskMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = async (data) => {
    await createTask(data);
    reset({
      task_description: "",
      volunteer_id: null,
      crisis_id: null,
    });
    close();
    await refetch();
  };

  const vOptions = volunteerOptions.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const cOptions = crisesOptions.map((item) => ({
    label: `${item.title} - ${item?.severity}`,
    value: item.id.toString(),
  }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;

  return (
    <div className="flex flex-col w-[90%] mx-auto">
      <Modal opened={opened} size="lg" onClose={close} withCloseButton={false}>
        <Paper className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <Textarea
              variant="filled"
              label="Task Description"
              placeholder="Provide details about the task"
              required
              radius="md"
              autosize
              minRows={2}
              maxRows={4}
              {...register("task_description")}
              error={errors.task_description?.message}
            />

            <Select
              variant="filled"
              label="Volunteer"
              data={vOptions}
              placeholder="Select Volunteer"
              required
              value={watch("volunteer_id")}
              onChange={(value) => {
                console.log("Selected Volunteer ID:", value);
                setValue("volunteer_id", Number(value));
              }}
              error={errors.volunteer_id?.message}
              comboboxProps={{
                position: "bottom",
                middlewares: { flip: false, shift: false },
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
            <Select
              classNames={{ option: classes.option }}
              variant="filled"
              label="Crisis"
              data={cOptions}
              placeholder="Select Crisis"
              required
              value={watch("crisis_id")}
              onChange={(value) => setValue("crisis_id", Number(value))}
              error={errors.crisis_id?.message}
              comboboxProps={{
                position: "bottom",
                middlewares: { flip: false, shift: false },
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
            <div className="flex flex-col items-center">
              <Button
                mt="xl"
                type="submit"
                color="black"
                className="rounded-lg bg-black"
                disabled={isLoading}
              >
                {isLoading ? <Loader color="white" size={20} /> : "Create Task"}
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>

      <Button
        variant="filled"
        color="orange"
        px="1.75rem"
        className="flex self-end"
        onClick={open}
      >
        Add
      </Button>
      <Paper
        // mx={"2vw"}
        my={"2rem"}
        shadow="lg"
        // style={{ border: "1px solid gray" }}
      >
        <Table>
          <Table.Thead className="bg-[#F7FFF7] text-[#195258]">
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>Serial</Table.Th>
              <Table.Th style={{ width: "30%" }}>Description</Table.Th>
              <Table.Th style={{ width: "15%" }}>Volunteer</Table.Th>
              <Table.Th style={{ width: "15%" }}>Crisis</Table.Th>
              <Table.Th style={{ width: "10%" }}>Status</Table.Th>
              <Table.Th style={{ width: "10%" }}>Assigned At</Table.Th>
              <Table.Th style={{ width: "15%" }}>Created By</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map((task, index) => (
              <Table.Tr key={task.id}>
                <Table.Td style={{ width: "5%" }}>{index + 1}</Table.Td>
                <Table.Td style={{ width: "30%" }}>
                  {task.task_description}
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  {task.volunteer.name}
                </Table.Td>
                <Table.Td style={{ width: "10%" }}>{task.crisis.name}</Table.Td>
                <Table.Td style={{ width: "10%" }}>
                  <span
                    className={
                      task.status === "pending"
                        ? "bg-yellow-200 text-yellow-700 px-2 py-1 rounded-lg"
                        : task.status === "in-progress"
                        ? "bg-orange-200 text-orange-700 px-2 py-1 rounded-lg"
                        : task.status === "completed"
                        ? "bg-green-200 text-green-700 px-2 py-1 rounded-lg"
                        : "bg-gray-400"
                    }
                  >
                    {task.status}
                  </span>
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  {new Date(task.assigned_at).toLocaleString()}
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  {task.created_by.name}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default VolunteerManagement;
