
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// This would typically come from your backend
const generateOrderId = () => {
  return `order_${Math.random().toString(36).substring(2, 15)}`;
};

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  description: string;
  onSuccess: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onOpenChange,
  amount,
  description,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => {
        toast({
          title: 'Failed to load Razorpay',
          description: 'Please check your internet connection and try again.',
          variant: 'destructive'
        });
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setIsLoading(false);
      return;
    }
    
    // In a real application, this order would be created on your backend
    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your actual test key
      amount: amount * 100, // Razorpay takes amount in smallest currency unit (paise)
      currency: 'INR',
      name: 'BioHarvest',
      description: description,
      order_id: generateOrderId(),
      handler: function (response: any) {
        toast({
          title: 'Payment Successful',
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        onSuccess(response.razorpay_payment_id);
        onOpenChange(false);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#10B981'
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
          onOpenChange(false);
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast({
        title: 'Payment Error',
        description: 'There was an error initiating the payment.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Please confirm your payment for {description}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-lg bg-green-50 p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount</span>
              <span className="text-lg font-semibold">₹{amount.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You'll be redirected to Razorpay's secure payment gateway to complete your purchase.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              `Pay ₹${amount.toFixed(2)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
