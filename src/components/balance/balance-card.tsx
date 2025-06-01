"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency,
  mockStripeAPI,
  type Transaction,
} from "@/lib/stripe-mock";
import { currentUser } from "@/lib/mock-data";
import { CreditCard, Plus, History, Wallet } from "lucide-react";
import { TopUpDialog } from "./top-up-dialog";
import { TransactionHistory } from "./transaction-history";

interface BalanceCardProps {
  className?: string;
}

export const BalanceCard = ({ className }: BalanceCardProps) => {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [balance, setBalance] = useState(currentUser.balance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopUpSuccess = (amount: number) => {
    setBalance((prev) => prev + amount);
    setShowTopUp(false);
    // Refresh transactions
    loadTransactions();
  };

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const userTransactions = await mockStripeAPI.getUserTransactions(
        currentUser.id
      );
      setTransactions(userTransactions);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(true);
    loadTransactions();
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5 text-charcoal-700" />
            Account Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Display */}
          <div className="text-center p-4 bg-charcoal-50 rounded-lg">
            <div className="text-3xl font-bold text-charcoal-900">
              {formatCurrency(balance)}
            </div>
            <p className="text-sm text-charcoal-600 mt-1">Available Balance</p>
          </div>

          <Separator className="bg-charcoal-100" />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-800">
                {formatCurrency(50)}
              </div>
              <p className="text-xs text-green-600">Total Added</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-800">
                {formatCurrency(1)}
              </div>
              <p className="text-xs text-blue-600">Total Spent</p>
            </div>
          </div>

          <Separator className="bg-charcoal-100" />

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => setShowTopUp(true)}
              className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Funds
            </Button>

            <Button
              variant="outline"
              onClick={handleShowHistory}
              className="w-full border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
              disabled={isLoading}
            >
              <History className="h-4 w-4 mr-2" />
              {isLoading ? "Loading..." : "Transaction History"}
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal-700">
                Payment Methods
              </span>
              <Badge variant="outline" className="text-xs">
                <CreditCard className="h-3 w-3 mr-1" />1 card
              </Badge>
            </div>
            <div className="text-xs text-charcoal-500">Visa ending in 4242</div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <TopUpDialog
        open={showTopUp}
        onOpenChange={setShowTopUp}
        onSuccess={handleTopUpSuccess}
        currentBalance={balance}
      />

      <TransactionHistory
        open={showHistory}
        onOpenChange={setShowHistory}
        transactions={transactions}
        isLoading={isLoading}
      />
    </>
  );
};
