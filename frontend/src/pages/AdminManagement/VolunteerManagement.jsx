import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Loader, Paper, Select, Table, TextInput } from "@mantine/core";
import { useCreateTaskMutation, useGetTasksQuery } from "../../api/taskSlice";
import { useGetVolunteerOptionsQuery } from "../../api/volunteerSlice";
import { useGetCrisesOptionsQuery } from "../../api/crisisSlice";
import classes from "../../global.module.css";

const taskSchema = z.object({
  task_description: z.string().min(1, "Task description is required"),
  volunteer_id: z.number().int().min(1, "Volunteer ID is required"),
  // crisis_id: z.number().int().min(1, "Crisis ID is required"),
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
  const { data: volunteerOptions = [] } = useGetVolunteerOptionsQuery();
  const { data: crisesOptions = [] } = useGetCrisesOptionsQuery();
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (data) => {
    console.log(data);
    await createTask(data);
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
    <div>
      <Paper
        withBorder
        shadow="md"
        radius="md"
        px={20}
        className="mx-auto w-[90%] md:w-[60%]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-20">
          <TextInput
            variant="filled"
            label="Task Description"
            placeholder="Provide details about the task"
            required
            radius="md"
            {...register("task_description")}
            error={errors.task_description?.message}
          />

          <Select
            variant="filled"
            label="Volunteer"
            data={vOptions}
            placeholder="Select Volunteer"
            required
            {...register("volunteer_id")}
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
            {...register("crisis_id")}
            error={errors.crisis_id?.message}
            comboboxProps={{
              position: "bottom",
              middlewares: { flip: false, shift: false },
              offset: 0,
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />

          {/* <TextInput
            label="Volunteer ID"
            placeholder="Enter Volunteer ID"
            type="number"
            required
            radius="md"
            {...register("volunteer_id")}
            error={errors.volunteer_id?.message}
          /> */}
          {/* <Select data={} /> */}

          {/* <TextInput
            label="Crisis"
            placeholder="Enter Crisis ID"
            type="number"
            required
            radius="md"
            {...register("crisis_id")}
            error={errors.crisis_id?.message}
          /> */}

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
