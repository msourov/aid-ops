import { useGetAllDonationsQuery } from "../api/donationSlice";
import DonationForm from "../components/DonationForm";
import DonationTable from "../components/DonationTable";

const Donation = () => {
  const { data: donations, isLoading } = useGetAllDonationsQuery();
  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="donation-form w-full max-w-xl">
        <DonationForm />
      </div>
      <div className="donation-list w-full ">
        <DonationTable donations={donations} loading={isLoading} />
      </div>
    </div>
  );
};

export default Donation;
