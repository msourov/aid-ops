import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Loader, Paper, Table, TextInput } from "@mantine/core";
import { useCreateTaskMutation, useGetTasksQuery } from "../../api/taskSlice";

const taskSchema = z.object({
  task_description: z.string().min(1, "Task description is required"),
  volunteer_id: z.number().int().min(1, "Volunteer ID is required"),
  crisis_id: z.number().int().min(1, "Crisis ID is required"),
});

const VolunteerManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const { data: tasks = [], isLoading, error } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (data) => {
    await createTask(data);
  };
  console.log("Loading:", isLoading);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;

  return (
    <div >
      <Paper withBorder shadow="md" radius="md" px={20} className="mx-[5vw]">
        <form onSubmit={handleSubmit(onSubmit)} className="p-20">
          <TextInput
            label="Task Description"
            placeholder="Provide details about the task"
            required
            radius="md"
            {...register("task_description")}
            error={errors.task_description?.message}
          />

          <TextInput
            label="Volunteer ID"
            placeholder="Enter Volunteer ID"
            type="number"
            required
            radius="md"
            {...register("volunteer_id")}
            error={errors.volunteer_id?.message}
          />

          <TextInput
            label="Crisis ID"
            placeholder="Enter Crisis ID"
            type="number"
            required
            radius="md"
            {...register("crisis_id")}
            error={errors.crisis_id?.message}
          />

          <div className="flex flex-col items-center">
            <Button
              mt="lg"
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
      <Paper mx={"5vw"} my={"2rem"} shadow="lg">
        <Table className="border border-gray-500">
          <Table.Thead className="bg-gray-300">
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>ID</Table.Th>
              <Table.Th style={{ width: "35%" }}>Description</Table.Th>
              <Table.Th style={{ width: "15%" }}>Volunteer ID</Table.Th>
              <Table.Th style={{ width: "15%" }}>Crisis ID</Table.Th>
              <Table.Th style={{ width: "15%" }}>Status</Table.Th>
              <Table.Th style={{ width: "15%" }}>Assigned At</Table.Th>
              <Table.Th style={{ width: "15%" }}>Created By</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map((task) => (
              <Table.Tr key={task.id}>
                <Table.Td style={{ width: "5%" }}>{task.id}</Table.Td>
                <Table.Td style={{ width: "35%" }}>
                  {task.task_description}
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  {task.volunteer_id}
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>{task.crisis_id}</Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  <span
                    className={
                      task.status === "pending"
                        ? "bg-yellow-200"
                        : task.status === "in-progress"
                        ? "bg-orange-500"
                        : task.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }
                  >
                    {task.status}
                  </span>
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>
                  {new Date(task.assigned_at).toLocaleString()}
                </Table.Td>
                <Table.Td style={{ width: "15%" }}>{task.created_by}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default VolunteerManagement;
