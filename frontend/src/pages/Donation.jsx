import DonationForm from "../components/DonationForm";
import DonationTable from "../components/DonationTable";

const Donation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-10">
      <div className="donation-form w-fit">
        <DonationForm />
      </div>
      <div className="donation-list w-[80%]">
        <DonationTable />
      </div>
    </div>
  );
};

export default Donation;
