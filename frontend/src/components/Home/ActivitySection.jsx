import {
  Box,
  Divider,
  Text,
  Title,
  Card,
  Button,
  Loader,
  SimpleGrid,
} from "@mantine/core";
import PropTypes from "prop-types";
import { IconCheck, IconAlertCircle, IconX } from "@tabler/icons-react"; // Ensure you have the Tabler icons installed

const statusStyles = {
  pending: {
    color: "black",
    backgroundColor: "#FEF3C7",
    icon: <IconAlertCircle size={16} />,
  },
  "in-progress": {
    color: "black",
    backgroundColor: "#F97316",
    icon: <IconCheck size={20} />,
  },
  completed: {
    color: "black",
    backgroundColor: "#BBF7D0",
    icon: <IconCheck size={16} />,
  },
  rejected: {
    color: "white",
    backgroundColor: "#FCA5A5",
    icon: <IconX size={16} />,
  },
};

export const ActivitySection = ({ recentTasks, tasksLoading, error }) => {
  if (tasksLoading) {
    return (
      <Box className="flex justify-center py-8">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Text color="red" align="center">
        Error fetching tasks: {error.message}
      </Text>
    );
  }

  if (!recentTasks || recentTasks.length === 0) {
    return <Text>No tasks found.</Text>;
  }

  return (
    <div className="py-8 bg-[#4F484F] shadow-lg">
      <Box style={{ paddingInline: "5vw", marginBottom: "1rem" }}>
        <Title order={3} className="font-bold text-[#F8F7FF] text-center">
          Recent Activities
        </Title>
        <div className="flex justify-center mb-8">
          <Divider w="500px" color="#F8F7FF" />
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="md">
          {recentTasks.map((task) => (
            <Card
              key={task.id}
              padding="xl"
              shadow="sm"
              radius="md"
              className="min-w-[360px]"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
                border: `2px solid ${
                  statusStyles[task.status]?.backgroundColor
                }`, // Dynamic border color
                backgroundColor: "#ffffff",
                color: "#846C5B",
              }}
            >
              <div className="flex items-center mb-2">
                {statusStyles[task.status]?.icon}
                <Text
                  fw={600}
                  size="lg"
                  className={`ml-2 text-${statusStyles[task.status]?.color}`}
                >
                  {task.task_description}
                </Text>
              </div>
              <Text style={{ color: "#2563EB" }}>{task.crisis.name}</Text>
              <Text
                style={{
                  width: "100px",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "5px",
                  backgroundColor: statusStyles[task.status]?.backgroundColor,
                  color: statusStyles[task.status]?.color,
                }}
              >
                {task.status.split("-")[0][0].toUpperCase() +
                  task.status.split("-")[0][1] +
                  " " +
                  task.status.split("-")[1]}
              </Text>
              <Text color="dimmed" style={{ color: "#4B5563" }}>
                Assigned to: {task.volunteer.name}
              </Text>
              <Text style={{ color: "#6B7280" }}>
                Assigned At: {new Date(task.assigned_at).toLocaleString()}
              </Text>
              <Text style={{ color: "#1F2937" }}>
                Created By: {task.created_by.name}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      <div className="flex justify-center">
        <Button variant="light" color="#3f5041">
          Show more
        </Button>
      </div>
    </div>
  );
};

// Prop Types validation
ActivitySection.propTypes = {
  recentTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task_description: PropTypes.string.isRequired,
      volunteer_id: PropTypes.number.isRequired,
      crisis_id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      assigned_at: PropTypes.string.isRequired,
      created_by: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      volunteer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      crisis: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  tasksLoading: PropTypes.bool.isRequired,
  error: PropTypes.object, // error can be an object or null
};

export default ActivitySection;
