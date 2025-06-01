// Mock Stripe API for handling payments and balance top-ups
// This simulates Stripe functionality without actual API calls

export type PaymentMethod = {
  id: string;
  type: "card";
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details: {
    name: string;
    email: string;
  };
};

export type PaymentIntent = {
  id: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "processing"
    | "succeeded"
    | "canceled";
  client_secret: string;
  metadata: {
    userId: string;
    type: "balance_topup" | "hackathon_entry";
    hackathonId?: string;
  };
};

export type Transaction = {
  id: string;
  userId: string;
  type: "topup" | "payment" | "refund" | "prize_payout";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  description: string;
  createdAt: string;
  metadata?: {
    hackathonId?: string;
    paymentIntentId?: string;
  };
};

export type CardDetails = {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
  name: string;
  email: string;
  brand?: string;
};

export type PaymentMetadata = {
  userId: string;
  type: "balance_topup" | "hackathon_entry";
  hackathonId?: string;
};

// Mock payment methods for demo
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1234567890",
    type: "card",
    card: {
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
    },
    billing_details: {
      name: "Alex Rivera",
      email: "alex@example.com",
    },
  },
];

// Mock transactions storage
const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    userId: "user1",
    type: "topup",
    amount: 50.0,
    currency: "eur",
    status: "completed",
    description: "Balance top-up",
    createdAt: "2024-01-15T10:30:00Z",
    metadata: {
      paymentIntentId: "pi_001",
    },
  },
  {
    id: "txn_002",
    userId: "user1",
    type: "payment",
    amount: 1.0,
    currency: "eur",
    status: "completed",
    description: "Entry fee for Neon Futures hackathon",
    createdAt: "2024-01-20T14:15:00Z",
    metadata: {
      hackathonId: "2",
      paymentIntentId: "pi_002",
    },
  },
];

// Mock Stripe API functions
export const mockStripeAPI = {
  // Create payment intent for balance top-up
  createPaymentIntent: async (
    amount: number,
    currency: string = "eur",
    metadata: PaymentMetadata
  ): Promise<PaymentIntent> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

    const paymentIntent: PaymentIntent = {
      id: `pi_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      status: "requires_payment_method",
      client_secret: `pi_${Date.now()}_secret_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      metadata,
    };

    return paymentIntent;
  },

  // Confirm payment intent (simulate successful payment)
  confirmPaymentIntent: async (
    paymentIntentId: string
  ): Promise<PaymentIntent> => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

    // Simulate successful payment
    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: 5000, // Mock amount
      currency: "eur",
      status: "succeeded",
      client_secret: `${paymentIntentId}_secret_confirmed`,
      metadata: {
        userId: "user1",
        type: "balance_topup",
      },
    };

    return paymentIntent;
  },

  // Get payment methods for user
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPaymentMethods;
  },

  // Add payment method
  addPaymentMethod: async (
    userId: string,
    cardDetails: CardDetails
  ): Promise<PaymentMethod> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "card",
      card: {
        brand: cardDetails.brand || "visa",
        last4: cardDetails.number?.slice(-4) || "0000",
        exp_month: cardDetails.exp_month || 12,
        exp_year: cardDetails.exp_year || 2025,
      },
      billing_details: {
        name: cardDetails.name || "User",
        email: cardDetails.email || "user@example.com",
      },
    };

    mockPaymentMethods.push(newPaymentMethod);
    return newPaymentMethod;
  },

  // Process balance top-up
  processBalanceTopup: async (
    userId: string,
    amount: number
  ): Promise<Transaction> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId,
      type: "topup",
      amount,
      currency: "eur",
      status: "completed",
      description: `Balance top-up of €${amount}`,
      createdAt: new Date().toISOString(),
      metadata: {
        paymentIntentId: `pi_${Date.now()}`,
      },
    };

    mockTransactions.push(transaction);
    return transaction;
  },

  // Process hackathon entry payment
  processHackathonPayment: async (
    userId: string,
    hackathonId: string,
    amount: number
  ): Promise<Transaction> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId,
      type: "payment",
      amount,
      currency: "eur",
      status: "completed",
      description: `Entry fee for hackathon`,
      createdAt: new Date().toISOString(),
      metadata: {
        hackathonId,
      },
    };

    mockTransactions.push(transaction);
    return transaction;
  },

  // Get user transactions
  getUserTransactions: async (userId: string): Promise<Transaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTransactions
      .filter((tx) => tx.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },
};

// Helper function to format currency
export const formatCurrency = (
  amount: number,
  currency: string = "EUR"
): string => {
  // Custom formatter to avoid hydration issues with Intl.NumberFormat
  const formattedAmount = amount.toFixed(2);
  const parts = formattedAmount.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1];

  const currencySymbol = currency.toUpperCase() === "EUR" ? "€" : "$";
  return `${currencySymbol}${integerPart}.${decimalPart}`;
};

// Helper function to get card brand icon
export const getCardBrandIcon = (brand: string): string => {
  const icons: { [key: string]: string } = {
    visa: "💳",
    mastercard: "💳",
    amex: "💳",
    discover: "💳",
    diners: "💳",
    jcb: "💳",
    unionpay: "💳",
  };
  return icons[brand.toLowerCase()] || "💳";
};
