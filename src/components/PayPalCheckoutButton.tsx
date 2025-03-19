
import React, { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface PayPalCheckoutButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  disabled?: boolean;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  amount,
  onSuccess,
  disabled = false,
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load the PayPal SDK script when the component mounts
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
    script.async = true;

    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            createOrder: (_: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: async (_: any, actions: any) => {
              try {
                const details = await actions.order.capture();
                toast({
                  title: "Payment Successful",
                  description: "Thank you for your purchase!",
                });
                onSuccess(details);
              } catch (error) {
                console.error("Error capturing PayPal order:", error);
                toast({
                  variant: "destructive",
                  title: "Payment Failed",
                  description: "There was a problem processing your payment.",
                });
              }
            },
            onError: (err: any) => {
              console.error("PayPal Error:", err);
              toast({
                variant: "destructive",
                title: "Payment Error",
                description: "PayPal checkout encountered an error.",
              });
            },
            style: {
              layout: "vertical",
              color: "black",
              shape: "rect",
              label: "pay",
            },
          })
          .render(paypalRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, onSuccess, toast]);

  return (
    <div className={`paypal-button-container ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <div ref={paypalRef} />
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-gothic-black/50 rounded-md">
          <p className="text-gothic-silver text-sm">Please fill out all required fields</p>
        </div>
      )}
    </div>
  );
};

export default PayPalCheckoutButton;
