import { Box, Text, Card, Title, Loader, Pill, Button } from "@mantine/core";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CrisisSection = ({ crises, loading, error }) => {
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Box>Something went wrong.</Box>;
  }
  if (!crises || crises.length === 0) {
    return <Box>No recent crises available.</Box>;
  }

  return (
    <>
      <Box
        style={{
          maxHeight: "400px",
          overflowY: "none",
          paddingInline: "5vw",
          marginBottom: "1.5rem",
        }}
      >
        <Title order={4} ta="center">
          Recent Crises
        </Title>
        {crises.slice(2).map((crisis) => (
          <Card
            key={crisis.id}
            padding="xl"
            shadow="sm"
            radius="md"
            style={{ marginBottom: "6px", paddingBlock: "0.5rem" }}
          >
            <Text weight={500} size="lg">
              {crisis.title}
            </Text>
            <Text color="dimmed">{crisis.description}</Text>
            <Text>Location: {crisis.location}</Text>
            <Text>
              Severity:{" "}
              <Pill
                className={
                  crisis.severity === "low"
                    ? "bg-yellow-200"
                    : crisis.severity === "medium"
                    ? "bg-orange-500"
                    : crisis.severity === "high"
                    ? "bg-red-700"
                    : "bg-gray-400"
                }
              >
                {crisis.severity || "N/A"}
              </Pill>
            </Text>
            <Text>Status: {crisis.status}</Text>
          </Card>
        ))}
      </Box>
      <div className="flex justify-center mb-6">
        <Button
          variant="light"
          color="blue"
          onClick={() => navigate("/crisis")}
        >
          Show more
        </Button>
      </div>
    </>
  );
};

CrisisSection.propTypes = {
  crises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      severity: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

export default CrisisSection;
