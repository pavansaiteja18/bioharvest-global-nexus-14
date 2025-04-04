
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PaymentModal from '@/components/PaymentModal';
import { CheckCircle2 } from 'lucide-react';

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  
  const handlePaymentRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount greater than 0',
        variant: 'destructive',
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: 'Missing Description',
        description: 'Please provide a description for this transaction',
        variant: 'destructive',
      });
      return;
    }
    
    // Open payment modal
    setShowPaymentModal(true);
  };
  
  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    setPaymentSuccess(true);
    setTimeout(() => {
      // In a real app, you'd record this transaction in your database
      if (user?.role === 'farmer') {
        navigate('/farmer');
      } else {
        navigate('/operator');
      }
    }, 3000);
  };
  
  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      {paymentSuccess ? (
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center">Payment Successful!</CardTitle>
            <CardDescription className="text-center">
              Your transaction has been completed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Amount</span>
                <span className="font-semibold">₹{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Transaction ID</span>
                <span className="font-mono text-xs">{paymentId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              You will be redirected to your dashboard shortly.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>
              Enter payment details for your transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Transaction Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter details about this transaction"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground w-full text-center">
              Payments are processed securely via Razorpay
            </p>
          </CardFooter>
        </Card>
      )}
      
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        amount={amount}
        description={description}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Payment;
