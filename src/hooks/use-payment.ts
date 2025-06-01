import { useState } from "react";
import { mockStripeAPI } from "@/lib/stripe-mock";
import { currentUser } from "@/lib/mock-data";

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const payFromBalance = async (
    hackathonId: string,
    amount: number
  ): Promise<boolean> => {
    setIsProcessing(true);
    setError("");

    try {
      // Check if user has sufficient balance
      if (currentUser.balance < amount) {
        setError("Insufficient balance. Please add funds to your account.");
        return false;
      }

      // Process payment from balance
      await mockStripeAPI.processHackathonPayment(
        currentUser.id,
        hackathonId,
        amount
      );

      // Update user balance (in a real app, this would be handled by the backend)
      currentUser.balance -= amount;

      return true;
    } catch {
      setError("Payment failed. Please try again.");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const parseEntryFee = (entryFee: string): number => {
    if (entryFee.toLowerCase() === "free") return 0;

    // Extract number from strings like "€1", "€3", etc.
    const match = entryFee.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  return {
    payFromBalance,
    parseEntryFee,
    isProcessing,
    error,
    clearError: () => setError(""),
  };
};
