

import React, { useState } from 'react';
import { 
  Shield, 
  // CreditCard, 
  // Smartphone, 
  // Building2, 
  // Wallet, 
  Check, 
  Lock, 
  Phone,
  Mail,
  RefreshCw,
  //CheckCircle,
  Clipboard,
  FileText,
  List
} from 'lucide-react';
import '../Styles/RazorpayPayment.css';

const Payment = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const services = [
    { id: 1, name: 'Premium Job Matching', price: 2999, description: 'AI-powered job recommendations tailored to your profile' },
    { id: 2, name: 'Expert Career Guidance', price: 1999, description: 'One-on-one consultation with industry experts' },
    { id: 3, name: 'Professional Resume Services', price: 1499, description: 'ATS-optimized resume by certified writers' },
    { id: 4, name: 'Interview Preparation', price: 1799, description: 'Mock interviews and personalized feedback' },
    { id: 5, name: 'Skill Enhancement Programs', price: 3499, description: 'Industry-relevant skill development courses' },
    { id: 6, name: 'Smart Job Alerts', price: 599, description: 'Personalized job notifications and market insights' },
    { id: 7, name: 'Mentorship Network', price: 2499, description: 'Access to industry mentors and networking events' },
    { id: 8, name: 'Career Development Resources', price: 899, description: 'Comprehensive career planning tools and resources' },
    { id: 9, name: 'Market Insights', price: 799, description: 'Industry trends and salary benchmarking reports' },
    { id: 10, name: 'Career Protection', price: 999, description: 'Job security analysis and career risk assessment' }
  ];

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (field, value) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };

  const getTotalAmount = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const API_BASE = process.env.REACT_APP_API_BASE_URL;


  // Load Razorpay SDK script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Create order on backend
  const createOrder = async (amount) => {
    const response = await fetch(`${API_BASE}/api/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    const data = await response.json();
    return data.orderId;
  };

  // Verify payment on backend
  const verifyPayment = async (details) => {
    const response = await fetch(`${API_BASE}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    const data = await response.json();
    return data.valid;
  };

  // Handle payment button click
  const handlePayment = async () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    if (!billingDetails.name || !billingDetails.email || !billingDetails.phone) {
      alert('Please fill in all billing details');
      return;
    }

    const amount = getTotalAmount();

    setIsProcessing(true);

    try {
      const res = await loadRazorpayScript();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      const orderId = await createOrder(amount);

      const options = {
        key: "rzp_test_qNDbphLy268mfz", // Replace with your Razorpay Key ID
        amount: amount * 100, // amount in paise
        currency: "INR",
        name: billingDetails.name,
        description: "Career Services Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verification = await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verification) {
              alert(`✅ Payment of ₹${amount.toLocaleString()} Successful and Verified!`);
              // Reset form
              setSelectedServices([]);
              setBillingDetails({ name: '', email: '', phone: '' });
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            alert("❌ Verification error: " + err.message);
          }
        },
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.phone,
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,         // Enable UPI QR and Apps (QR code will be shown)
          card: true,        // Enable Card
          netbanking: true,  // Enable Netbanking
          wallet: true       // Enable Wallets
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      alert("Payment failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <div className="header-content">
          <h1 className="payment-title">
            <Lock className="title-icon" />
            Secure & Simple Checkout for Your Career Services
          </h1>
          <p className="payment-subtitle">
            We're excited to help you unlock the full potential of your career. 
            Please review your selected services below and proceed with the secure payment.
          </p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="security-banner">
        <Shield className="security-icon" />
        <div className="security-text">
          <h3>Your Payment is Safe with Us</h3>
          <p>All transactions are encrypted and processed securely through our trusted payment gateway partners. We do not store your card details.</p>
        </div>
      </div>

      <div className="payment-content">
        {/* Services Section */}
        <div className="services-section">
          <div className="section-header">
            <h2>
              <Clipboard className="section-icon" size={20} />
              Services
            </h2>
            <p>Select the services that best fit your career goals</p>
          </div>
          
          <div className="services-grid">
            {services.map(service => (
              <div 
                key={service.id} 
                className={`service-card ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="service-header">
                  <div className="service-checkbox">
                    {selectedServices.includes(service.id) && <Check className="check-icon" />}
                  </div>
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                <div className="service-price">₹{service.price.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="help-text">
            <span className="help-icon">💡</span> Need help choosing the right service? 
            <a href="#support">Contact our support</a> or chat with our career assistant.
          </div>
        </div>

        {/* Billing Section */}
        <div className="billing-section">
          <h2>
            <FileText className="section-icon" size={20} />
            Billing Details
          </h2>
          <p>This info will be used to send invoices and service confirmations.</p>
          
          <div className="billing-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={billingDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={billingDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={billingDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {selectedServices.length > 0 && (
          <div className="order-summary">
            <h3>
              <List className="section-icon" size={18} />
              Order Summary
            </h3>
            <div className="summary-items">
              {selectedServices.map(serviceId => {
                const service = services.find(s => s.id === serviceId);
                return (
                  <div key={serviceId} className="summary-item">
                    <span>{service.name}</span>
                    <span>₹{service.price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
            <div className="summary-total">
              <strong>Total: ₹{getTotalAmount().toLocaleString()}</strong>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <button 
          className={`pay-button ${isProcessing ? 'processing' : ''} ${selectedServices.length === 0 ? 'disabled' : ''}`}
          onClick={handlePayment}
          disabled={isProcessing || selectedServices.length === 0}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="processing-icon spinning" />
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="pay-icon" />
              Pay Securely Now - ₹{getTotalAmount().toLocaleString()}
            </>
          )}
        </button>

        <p className="terms-text">
          By clicking "Pay Securely Now", you agree to our 
          <a href="/terms&conditions">Terms Of Use</a> and <a href="/privacypolicy">Privacy Policy</a>.
        </p>
      </div>

      {/* Footer Sections */}
      <div className="footer-sections">
        <div className="refund-section">
          <h3>Refund Policy</h3>
          <p>
            Your satisfaction is important to us. If you're not satisfied with any paid service, 
            you may be eligible for a refund within 7 days. 
            <a href="/privacypolicy">Read Full Refund Policy →</a>
          </p>
        </div>

        <div className="support-section">
          <h3>Need Help?</h3>
          <p>Our support team is available 24/7 for payment or service-related queries.</p>
          <div className="support-contacts">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span>support@momentum-merge.com</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span>1800-123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;