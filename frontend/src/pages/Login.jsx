import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, PasswordInput, Paper, Button, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { MdOutlinePhone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { setToken } from "../utils/getToken";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        "http://localhost:8080/api/v1/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        navigate("/", { replace: true });
        notifications.show({
          title: "Welcome!",
          message: `Welcome back, ${response.data.userData.name}!`,
          color: "green",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Login failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('./assets/loginpage.png')] w-full h-full bg-cover fixed top-0 left-0 z-[-10] flex items-center justify-center">
      {/* <Container className="text-sm drop-shadow-lg -mt-32"> */}
      <Paper
        withBorder
        shadow="md"
        radius="md"
        className="text-sm drop-shadow-lg -mt-32 w-[500px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-10">
          <TextInput
            label="Email"
            placeholder="example@mail.com"
            autoComplete="off"
            leftSection={<MdOutlinePhone />}
            required
            radius="md"
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            placeholder="********"
            required
            leftSection={<CiLock />}
            mt="md"
            radius="md"
            {...register("password")}
            error={errors.password?.message}
          />
          <div className="flex flex-col items-center">
            <Button
              mt="lg"
              type="submit"
              color="black"
              className="rounded-lg bg-black"
              disabled={loading}
            >
              {loading ? <Loader color="white" size={20} /> : "Login"}
            </Button>

            <Button
              mt="md"
              variant="outline"
              color="black"
              onClick={() => navigate("/register")}
              className="rounded-lg"
            >
              Register as a Volunteer
            </Button>
          </div>
        </form>
      </Paper>
      {/* </Container> */}
    </div>
  );
};

export default Login;
