import {
  Box,
  Text,
  Card,
  Title,
  Pill,
  Button,
  Divider,
  Skeleton,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CrisisSection = ({ crises, loading, error }) => {
  const navigate = useNavigate();

  if (error) {
    return <Box>{error.message}</Box>;
  }

  const skeletons = Array(2)
    .fill()
    .map((_, index) => (
      <Card
        key={index}
        padding="xl"
        shadow="sm"
        radius="md"
        style={{
          backgroundColor: "#315771",
          color: "wheat",
          marginBottom: "6px",
          paddingBlock: "0.75rem",
        }}
      >
        <Skeleton height={16} width="40%" mb="sm" />
        <Skeleton height={12} width="60%" mb="sm" />
        <Skeleton height={12} width="40%" mb="sm" />
        <Skeleton height={12} width="30%" />
      </Card>
    ));

  return (
    <div className="py-8 bg-[#D7D0BA] text-[#3f5041]">
      <Box
        style={{
          maxHeight: "400px",
          overflowY: "none",
          paddingInline: "5vw",
          marginBottom: "1rem",
        }}
      >
        <Title order={3} className="font-bold text-[#000000] text-center">
          Recent Crises
        </Title>
        <div className="flex justify-center mb-8">
          <Divider w="500px" color="#07553B" />
        </div>
        {loading
          ? skeletons
          : crises &&
            crises.slice(2).map((crisis) => (
              <Card
                key={crisis.id}
                padding="xl"
                shadow="sm"
                radius="md"
                style={{
                  backgroundColor: "#315771",
                  color: "wheat",
                  marginBottom: "6px",
                  paddingBlock: "0.5rem",
                }}
              >
                <Text weight={500} size="lg">
                  {crisis.title}
                </Text>
                <Text c="yellow">{crisis.description}</Text>
                <Text>Location: {crisis.location}</Text>
                <Text>
                  Severity:{" "}
                  <Pill
                    style={{
                      backgroundColor:
                        crisis.severity === "low"
                          ? "#FEF3C7"
                          : crisis.severity === "medium"
                          ? "#F97316"
                          : crisis.severity === "high"
                          ? "#B91C1C"
                          : "#9CA3AF",
                    }}
                  >
                    {crisis.severity || "N/A"}
                  </Pill>
                </Text>
                <Text>Status: {crisis.status}</Text>
              </Card>
            ))}
      </Box>
      <div className="flex justify-center mt-8">
        <Button
          variant="light"
          color="#3D3B8E"
          onClick={() => navigate("/crisis")}
        >
          Show more
        </Button>
      </div>
    </div>
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
