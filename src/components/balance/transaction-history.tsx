"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, type Transaction } from "@/lib/stripe-mock";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Trophy,
  Loader2,
  Calendar,
  Receipt,
} from "lucide-react";
import { format } from "date-fns";

interface TransactionHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions: Transaction[];
  isLoading: boolean;
}

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "topup":
      return <ArrowUpCircle className="h-4 w-4 text-green-600" />;
    case "payment":
      return <ArrowDownCircle className="h-4 w-4 text-red-600" />;
    case "refund":
      return <RefreshCw className="h-4 w-4 text-blue-600" />;
    case "prize_payout":
      return <Trophy className="h-4 w-4 text-yellow-600" />;
    default:
      return <Receipt className="h-4 w-4 text-charcoal-600" />;
  }
};

const getTransactionColor = (type: Transaction["type"]) => {
  switch (type) {
    case "topup":
      return "text-green-600";
    case "payment":
      return "text-red-600";
    case "refund":
      return "text-blue-600";
    case "prize_payout":
      return "text-yellow-600";
    default:
      return "text-charcoal-600";
  }
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return (
        <Badge
          variant="outline"
          className="text-green-700 border-green-200 bg-green-50"
        >
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className="text-yellow-700 border-yellow-200 bg-yellow-50"
        >
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge
          variant="outline"
          className="text-red-700 border-red-200 bg-red-50"
        >
          Failed
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const TransactionHistory = ({
  open,
  onOpenChange,
  transactions,
  isLoading,
}: TransactionHistoryProps) => {
  const totalSpent = transactions
    .filter((tx) => tx.type === "payment" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalAdded = transactions
    .filter((tx) => tx.type === "topup" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <div className="text-center">
                  <ArrowUpCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-green-800">
                    {formatCurrency(totalAdded)}
                  </p>
                  <p className="text-sm text-green-600">Total Added</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-4">
                <div className="text-center">
                  <ArrowDownCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-red-800">
                    {formatCurrency(totalSpent)}
                  </p>
                  <p className="text-sm text-red-600">Total Spent</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Transaction List */}
          <div className="space-y-2">
            <h3 className="font-medium text-charcoal-900 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Transactions
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-charcoal-500" />
                <span className="ml-2 text-charcoal-600">
                  Loading transactions...
                </span>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-charcoal-500">
                <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No transactions found</p>
                <p className="text-sm">
                  Your transaction history will appear here
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="border-charcoal-200">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getTransactionIcon(transaction.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-charcoal-900">
                                  {transaction.description}
                                </p>
                                {getStatusBadge(transaction.status)}
                              </div>
                              <p className="text-sm text-charcoal-500">
                                {format(
                                  new Date(transaction.createdAt),
                                  "MMM dd, yyyy • HH:mm"
                                )}
                              </p>
                              {transaction.metadata?.hackathonId && (
                                <p className="text-xs text-charcoal-400 mt-1">
                                  Hackathon ID:{" "}
                                  {transaction.metadata.hackathonId}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${getTransactionColor(
                                transaction.type
                              )}`}
                            >
                              {transaction.type === "topup" ||
                              transaction.type === "prize_payout"
                                ? "+"
                                : "-"}
                              {formatCurrency(transaction.amount)}
                            </p>
                            <p className="text-xs text-charcoal-500 uppercase">
                              {transaction.currency}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
