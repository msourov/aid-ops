import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, NumberInput, Paper, Button, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCreateDonationMutation } from "../api/donationSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  donor_name: z.string().min(1, "Donor name is required"),
  donor_email: z.string().email("Invalid email format"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

const DonationForm = () => {
  const [loading, setLoading] = useState(false);
  const [createDonation] = useCreateDonationMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await createDonation(data).unwrap();
      notifications.show({
        title: "Success",
        message: `Thank you for your donation, ${response.result.donor_name} `,
        color: "green",
      });
      setLoading(false);
      reset({ donor_name: "", donor_email: "", amount: 0 });
    } catch (error) {
      console.error("Donation error:", error);
      notifications.show({
        title: "Error",
        message: error?.data?.detail || "Donation failed",
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <Paper withBorder shadow="xl" radius="md" p={20} mb={30} bg="#7492C3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-4"
      >
        <TextInput
          variant="filled"
          label="Donor Name"
          placeholder="John Doe"
          {...register("donor_name")}
          error={errors.donor_name?.message}
          required
        />

        <TextInput
          variant="filled"
          label="Donor Email"
          placeholder="johndoe@example.com"
          {...register("donor_email")}
          error={errors.donor_email?.message}
          required
        />

        <NumberInput
          variant="filled"
          label="Amount"
          placeholder="100"
          {...register("amount", { valueAsNumber: true })}
          error={errors.amount?.message}
          onChange={(value) => setValue("amount", value)}
          required
        />

        <div className="flex flex-col items-center">
          <Button
            mt="lg"
            type="submit"
            color="black"
            className="rounded-lg bg-[#3D3B8E]"
            disabled={loading}
          >
            {loading ? <Loader color="white" size={20} /> : "Donate"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default DonationForm;
