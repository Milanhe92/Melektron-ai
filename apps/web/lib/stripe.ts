import Stripe from 'stripe';


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const PRICING_PLANS = {
  basic: {
    id: 'price_basic_plan_id', 
    name: 'Basic Plan',
    price: 29,
    features: ['50 AI requests', 'Basic quantum simulations', 'Community access'],
    priceId: 'price_1234567890' // Dobićete iz Stripe dashboard
  },
  pro: {
    id: 'price_pro_plan_id',
    name: 'Pro Plan', 
    price: 99,
    features: ['500 AI requests', 'Advanced quantum computing', 'Priority support', 'API access'],
    priceId: 'price_0987654321'
  },
  enterprise: {
    id: 'price_enterprise_plan_id',
    name: 'Enterprise',
    price: 499, 
    features: ['Unlimited usage', 'Custom AI training', 'Dedicated support', 'White-label solutions'],
    priceId: 'price_5432167890'
  }
};
