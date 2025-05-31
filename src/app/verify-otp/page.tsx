"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GridBackground } from "@/components/ui/grid-background";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  ArrowLeft,
  Check,
  RefreshCw,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
    setError("");

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success/failure
          if (otpCode === "123456") {
            resolve(true);
          } else {
            reject(new Error("Invalid verification code"));
          }
        }, 2000);
      });

      // Redirect to success page
      router.push("/verify-success");
    } catch {
      setError("Invalid verification code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResendCooldown(60); // 60 second cooldown
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-background">
      <GridBackground
        className="min-h-screen flex items-center justify-center p-4"
        opacity={0.03}
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Verify Your Email
            </h1>
            <p className="text-muted-foreground mt-2">
              We&apos;ve sent a 6-digit verification code to
            </p>
            <p className="font-medium text-foreground">{email}</p>
          </div>

          {/* OTP Verification Card */}
          <Card className="border-border bg-card/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-xl text-card-foreground">
                Enter Verification Code
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Please enter the 6-digit code sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* OTP Input */}
                <div className="space-y-2">
                  <Label className="text-foreground">Verification Code</Label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(
                            index,
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-xl font-mono border-2 "
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code from your email
                  </p>
                </div>

                {/* Verify Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !isOtpComplete}
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Verify Email
                    </div>
                  )}
                </Button>

                {/* Resend Code */}
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={resendCooldown > 0 || isResending}
                    className="text-primary hover:text-primary/80"
                  >
                    {isResending ? (
                      <div className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </div>
                    ) : resendCooldown > 0 ? (
                      `Resend code in ${resendCooldown}s`
                    ) : (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Resend code
                      </div>
                    )}
                  </Button>
                </div>

                {/* Back to Register */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push("/register")}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Check your spam folder if you don&apos;t see the email.
              <br />
              The code expires in 10 minutes.
            </p>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
