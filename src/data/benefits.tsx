import { FiCalendar, FiTag, FiPlusCircle, FiMonitor, FiCloud, FiLock, FiSliders, FiStar, FiShoppingCart} from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Effortless Meal Planning",
        description: "Take the stress out of “what’s for dinner.” Plan to Plate helps you organise your meals with ease and clarity—so you can focus on enjoying your food, not scrambling for ideas.",
        bullets: [
            {
                title: "Smart Scheduling",
                description: "Map out your week with a drag-and-drop calendar designed for busy lives.",
                icon: <FiCalendar size={26} />
            },
            {
                title: "Flexible Planning",
                description: "Plan just dinners or your entire day—whatever suits your routine.",
                icon: <FiSliders size={26} />
            },
            {
                title: "Built-In Inspiration",
                description: "Browse saved recipes or explore fresh ideas when you're stuck for meals.",
                icon: <FiStar size={26} />
            }
        ],
        imageSrc: "/images/dish1.jpg"
    },
    {
        title: "Your Digital Recipe Book",
        description: "No more lost notes or screenshots. Save, sort, and find your favourite meals all in one place",
        bullets: [
            {
                title: "Quick Save",
                description: "Add recipes in seconds - from links, images, or your own creations",
                icon: <FiPlusCircle  size={26} />
            },
            {
                title: "Organised Your Way",
                description: "Tag and categorise recipes to fit your cooking style, diet, or occasion.",
                icon: <FiTag  size={26} />
            },
            {
                title: "One-Click Access",
                description: "Everything you’ve saved, ready when you need it - on any device.",
                icon: <FiCloud  size={26} />
            }
        ],
        imageSrc: "/images/dish2.jpg"
    },
    {
        title: "Built for Real Life",
        description: "Plan to Plate is designed for how real people eat. Simple. Helpful. Made to fit your life—not the other way around.",
        bullets: [
            {
                title: "Smarter Grocery Planning",
                description: "Cut down on food waste and overspending. Generate your shopping list straight from your meal plan.",
                icon: <FiShoppingCart size={26} />
            },
            {
                title: "Multi-Device Access",
                description: "Start on your tablet, check on your phone, update from your laptop.",
                icon: <FiMonitor  size={26} />
            },
            {
                title: "Secure & Private",
                description: "Your data stays yours - always.",
                icon: <FiLock  size={26} />
            }
        ],
        imageSrc: "/images/dish3.jpg"
    },
]