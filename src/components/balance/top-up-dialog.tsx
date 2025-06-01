"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency, mockStripeAPI } from "@/lib/stripe-mock";
import { currentUser } from "@/lib/mock-data";
import { CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (amount: number) => void;
  currentBalance: number;
}

const PRESET_AMOUNTS = [10, 25, 50, 100];

export const TopUpDialog = ({
  open,
  onOpenChange,
  onSuccess,
  currentBalance,
}: TopUpDialogProps) => {
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount("");
    setError("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
      setError("");
    }
  };

  const handleTopUp = async () => {
    if (amount < 5) {
      setError("Minimum top-up amount is €5");
      return;
    }

    if (amount > 500) {
      setError("Maximum top-up amount is €500");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Simulate payment processing
      await mockStripeAPI.processBalanceTopup(currentUser.id, amount);

      setSuccess(true);
      setTimeout(() => {
        onSuccess(amount);
        handleClose();
      }, 1500);
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setAmount(25);
    setCustomAmount("");
    setError("");
    setSuccess(false);
    setIsProcessing(false);
    onOpenChange(false);
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-charcoal-600">
              {formatCurrency(amount)} has been added to your account.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Add Funds to Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Balance */}
          <Card className="bg-charcoal-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-charcoal-600">Current Balance</p>
                <p className="text-2xl font-bold text-charcoal-900">
                  {formatCurrency(currentBalance)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Amount Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Amount</Label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_AMOUNTS.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={
                    amount === presetAmount && !customAmount
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleAmountSelect(presetAmount)}
                  className="h-12"
                  disabled={isProcessing}
                >
                  {formatCurrency(presetAmount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount" className="text-sm font-medium">
              Or enter custom amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-500">
                €
              </span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="0.00"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="pl-8"
                min="5"
                max="500"
                step="0.01"
                disabled={isProcessing}
              />
            </div>
            <p className="text-xs text-charcoal-500">
              Minimum: €5 • Maximum: €500
            </p>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Payment Method</Label>
            <Card className="border-charcoal-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-charcoal-500">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Amount to add:</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing fee:</span>
                  <span className="font-medium">€0.00</span>
                </div>
                <Separator className="bg-blue-200" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-600">
                  <span>New balance:</span>
                  <span>{formatCurrency(currentBalance + amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTopUp}
              className="flex-1 bg-charcoal-900 hover:bg-charcoal-800"
              disabled={isProcessing || amount < 5}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Add ${formatCurrency(amount)}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
