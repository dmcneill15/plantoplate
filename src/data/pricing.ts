import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Basic',
        price: 'Free',
        subtitle:'Perfect for casual users and curious new cooks',
        features: [
            'Plan up to 3 meals per week',
            'Save up to 15 recipes',
            'Drag-and-drop calendar',
            'Mobile-friendly UI',
        ],
    },
    {
        name: 'Kitchen Pro',
        price: 10,
        subtitle:'Ideal for weekly planners and organized home cooks',
        features: [
            'Unlimited meals & recipe storage',
            'Printable planners',
            'Smart grocery list generator (coming soon)',
            'Priority support',
        ],
    },
    {
        name: 'Plan Together',
        price: 15,
        subtitle:'Best for families, flatmates, or shared planning',
        features: [
            'All Pro features',
            'Add up to 4 users (shared planning)',
            'Shared grocery lists',
            '24/7 dedicated support',
        ],
    },
]