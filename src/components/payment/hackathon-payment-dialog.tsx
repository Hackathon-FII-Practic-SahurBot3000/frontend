"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/stripe-mock";
import { currentUser } from "@/lib/mock-data";
import { usePayment } from "@/hooks/use-payment";
import {
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wallet,
} from "lucide-react";

interface HackathonPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  hackathonTitle: string;
  hackathonId: string;
  entryFee: string;
}

export const HackathonPaymentDialog = ({
  open,
  onOpenChange,
  onSuccess,
  hackathonTitle,
  hackathonId,
  entryFee,
}: HackathonPaymentDialogProps) => {
  const [success, setSuccess] = useState(false);
  const { payFromBalance, parseEntryFee, isProcessing, error, clearError } =
    usePayment();

  const amount = parseEntryFee(entryFee);
  const isFree = amount === 0;

  const handlePayment = async () => {
    if (isFree) {
      // For free hackathons, just proceed
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
      return;
    }

    const paymentSuccess = await payFromBalance(hackathonId, amount);
    if (paymentSuccess) {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    clearError();
    onOpenChange(false);
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-charcoal-900 mb-2">
              {isFree ? "Registration Successful!" : "Payment Successful!"}
            </h3>
            <p className="text-charcoal-600">
              You have successfully joined {hackathonTitle}!
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
            {isFree ? "Join Hackathon" : "Pay Entry Fee"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hackathon Info */}
          <Card className="bg-charcoal-50">
            <CardContent className="pt-4">
              <div className="text-center">
                <h3 className="font-semibold text-charcoal-900 mb-1">
                  {hackathonTitle}
                </h3>
                <p className="text-sm text-charcoal-600">Entry Fee</p>
                <p className="text-2xl font-bold text-charcoal-900">
                  {isFree ? "Free" : formatCurrency(amount)}
                </p>
              </div>
            </CardContent>
          </Card>

          {!isFree && (
            <>
              {/* Current Balance */}
              <Card className="border-charcoal-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-charcoal-600" />
                      <div>
                        <p className="text-sm font-medium text-charcoal-900">
                          Account Balance
                        </p>
                        <p className="text-xs text-charcoal-500">
                          Available funds
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-charcoal-900">
                        {formatCurrency(currentUser.balance)}
                      </p>
                      {currentUser.balance < amount && (
                        <p className="text-xs text-red-600">
                          Insufficient funds
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Payment Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Entry fee:</span>
                      <span className="font-medium">
                        {formatCurrency(amount)}
                      </span>
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
                      <span>Remaining balance:</span>
                      <span>
                        {formatCurrency(
                          Math.max(0, currentUser.balance - amount)
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

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
              onClick={handlePayment}
              className="flex-1 bg-charcoal-900 hover:bg-charcoal-800"
              disabled={
                isProcessing || (!isFree && currentUser.balance < amount)
              }
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isFree ? (
                "Join Hackathon"
              ) : (
                `Pay ${formatCurrency(amount)}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
