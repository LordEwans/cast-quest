import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";

type QuestType = "Candy Stride 🍬" | "Sweet Sprint 🏃‍♀️" | "Trend Treats 🍭";
type Currency = "USDC" | "ETH" | "DEGEN";

const QuestModal = () => {
  const { authenticated, login } = usePrivy();

  const [isOpen, setIsOpen] = useState(false);
  const [questType, setQuestType] = useState<QuestType>("Candy Stride 🍬");
  const [currency, setCurrency] = useState<Currency>("USDC");
  const [beginsAt, setBeginsAt] = useState<Date>(new Date());
  const [endsAt, setEndsAt] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [extraInfo, setExtraInfo] = useState<string>("");

  const handleQuestTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestType(event.target.value as QuestType);
  };

  const handleBeginsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeginsAt(new Date(event.target.value));
  };

  const handleEndsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndsAt(new Date(event.target.value));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value, 10) || 0);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value as Currency);
  };

  const handleExtraInfoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExtraInfo(event.target.value);
  };

  const handleSubmit = () => {
    console.log({ questType, beginsAt, endsAt, amount, extraInfo });
    setIsOpen(false);
  };

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modal.current && !modal.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <div>
      <button
        onClick={() => (authenticated ? setIsOpen(true) : login())}
        className="_1n3pr301 w-[126px]"
      >
        New Quest
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-[#FAF9F6] dark:bg-[#0e1111] rounded-lg shadow-lg p-8 w-96"
            ref={modal}
          >
            <h2 className="text-2xl font-bold mb-4">Create New Quest</h2>

            <div className="mb-4">
              <label htmlFor="questType" className="block  font-bold mb-2">
                Quest Type:
              </label>
              <select
                id="questType"
                value={questType}
                onChange={handleQuestTypeChange}
                className="shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Candy Stride 🍬">Candy Stride 🍬</option>
                <option value="Sweet Sprint 🏃‍♀️">Sweet Sprint 🏃‍♀️</option>
                <option value="Trend Treats 🍭">Trend Treats 🍭</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="beginsAt" className="block  font-bold mb-2">
                Begins At:
              </label>
              <input
                type="datetime-local"
                id="beginsAt"
                value={beginsAt.toISOString().slice(0, 16)} // Format for datetime-local input
                onChange={handleBeginsAtChange}
                className="shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endsAt" className="block  font-bold mb-2">
                Ends At:
              </label>
              <input
                type="datetime-local"
                id="endsAt"
                value={endsAt.toISOString().slice(0, 16)} // Format for datetime-local input
                onChange={handleEndsAtChange}
                className="shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block  font-bold mb-2">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="shadow border rounded w-[calc(100%-108px)] py-2 px-3 mr-2  leading-tight focus:outline-none focus:shadow-outline"
              />
              <select
                id="currency"
                value={currency}
                onChange={handleCurrencyChange}
                className="shadow border rounded w-[100px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="DEGEN">DEGEN</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="extraInfo" className="block  font-bold mb-2">
                Extra Information:
              </label>
              <textarea
                id="extraInfo"
                value={extraInfo}
                onChange={handleExtraInfoChange}
                className="shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="_1n3pr302 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="_1n3pr301 py-2 px-4 rounded" // Use your existing button style
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestModal;
