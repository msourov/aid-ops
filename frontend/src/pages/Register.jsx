import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Container,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

// Define the validation schema using Zod
const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .nonempty("Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .nonempty("Phone is required"),
  age: z.number().min(1, "Age is required"),
  role: z.enum(["admin", "volunteer"]).optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        data
      );
      console.log(response);
      notifications.show({
        title: "Success",
        message: response.data.message,
        color: "green",
      });
      localStorage.setItem("user", response.data.user);
      navigate("/login", replace);
    } catch (error) {
      console.error("Registration error:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.detail || "Registration failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center h-screen">
      <Paper
        withBorder
        shadow="md"
        radius="md"
        p={20}
        className="text-sm drop-shadow-lg -mt-32 w-[500px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-10">
          <TextInput
            label="Name"
            placeholder="Enter your name"
            required
            {...register("name")}
            error={errors.name?.message}
            style={{ width: "400px" }}
          />
          <TextInput
            label="Email"
            placeholder="example@mail.com"
            required
            {...register("email")}
            error={errors.email?.message}
            style={{ width: "400px" }}
          />
          <TextInput
            label="Phone"
            placeholder="1234567890"
            required
            {...register("phone")}
            error={errors.phone?.message}
            style={{ width: "400px" }}
          />
          <TextInput
            label="Age"
            placeholder="Enter your age"
            type="number"
            required
            {...register("age", { valueAsNumber: true })}
            error={errors.age?.message}
            style={{ width: "400px" }}
          />
          <PasswordInput
            label="Password"
            placeholder="********"
            required
            {...register("password")}
            error={errors.password?.message}
            style={{ width: "400px" }}
          />
          <Button mt="lg" type="submit" color="black" disabled={loading}>
            {loading ? (
              <Loader color="white" size={20} />
            ) : (
              "Register as Volunteer"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
