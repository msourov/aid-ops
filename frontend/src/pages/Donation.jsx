import DonationForm from "../components/DonationForm";
import DonationTable from "../components/DonationTable";

const Donation = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4">
      <div className="donation-form md:w-[25%] w-[70%]">
        <DonationForm />
      </div>
      <div className="donation-list md:w-[70%] w-[80%]">
        <DonationTable />
      </div>
    </div>
  );
};

export default Donation;
