import type { Testimonial, FaqItem } from '../models/furniture.model';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    location: 'Bengaluru',
    rating: 5,
    text: 'The Celestial L-shape sofa is the best purchase we\u2019ve made for our home. The fabric feels like a luxury hotel, delivery was exactly on time, and the team even set everything up beautifully.',
    product: 'Celestial L-Shape Sofa',
    avatarColor: 'from-amber-400 to-orange-500',
    initials: 'AS',
  },
  {
    id: 't2',
    name: 'Rahul Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'I compared five brands before choosing Galaxy. The sheesham quality is unmistakable — you can feel the weight and care. Three years on, my Regalia set still looks brand new.',
    product: 'Regalia Wooden Sofa Set',
    avatarColor: 'from-stone-500 to-stone-800',
    initials: 'RM',
  },
  {
    id: 't3',
    name: 'Priya & Karthik',
    location: 'Hyderabad',
    rating: 5,
    text: 'We designed our entire home around Galaxy. From the bedroom Serenity bed to the dining Oakwood set, every piece arrived flawless. The custom service team is genuinely exceptional.',
    product: 'Full Home Package',
    avatarColor: 'from-teal-400 to-emerald-600',
    initials: 'PK',
  },
  {
    id: 't4',
    name: 'David Fernandes',
    location: 'Goa',
    rating: 4,
    text: 'Bought the Nebula recliner for our cinema room. The massage function is a game changer — my back has never been happier. One star off only because I want the office chair next!',
    product: 'Nebula Power Recliner',
    avatarColor: 'from-indigo-400 to-purple-600',
    initials: 'DF',
  },
  {
    id: 't5',
    name: 'Neha Kulkarni',
    location: 'Pune',
    rating: 5,
    text: 'Galaxy turned my 2BHK into something straight out of an interior magazine. The Horizon corner sofa fits perfectly and the bouclé fabric is incredibly soft. Highly recommend the showroom experience.',
    product: 'Horizon Corner Sofa',
    avatarColor: 'from-rose-400 to-pink-600',
    initials: 'NK',
  },
  {
    id: 't6',
    name: 'Arjun Nair',
    location: 'Kochi',
    rating: 5,
    text: 'The warranty and after-sales are real. Two years after purchase, a hinge needed attention — they replaced it free, no questions. That\u2019s how you build trust.',
    product: 'Atlas Wardrobe',
    avatarColor: 'from-cyan-400 to-blue-600',
    initials: 'AN',
  },
  {
    id: 't7',
    name: 'Sara & Imran',
    location: 'New Delhi',
    rating: 5,
    text: 'We were nervous buying furniture online, but the 360-view and video call with a designer sealed it. Our Emperor dining set is the heart of every family dinner now.',
    product: 'Emperor Dining Set',
    avatarColor: 'from-fuchsia-400 to-purple-700',
    initials: 'SI',
  },
  {
    id: 't8',
    name: 'Vikram Singhania',
    location: 'Gurugram',
    rating: 5,
    text: 'Outfitted our entire office with the Apex line. Clients notice. The quality-to-price ratio is honestly unfair to the competition.',
    product: 'Apex Executive Desk',
    avatarColor: 'from-slate-500 to-slate-900',
    initials: 'VS',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    group: 'Orders & Delivery',
    question: 'How long does delivery take?',
    answer:
      'Most in-stock items deliver in 15–25 days; custom and heavy items take 30–40 days. We\u2019ll confirm an exact window by phone after your order and send a live tracking link. Our white-glove team assembles and places everything in your room.',
  },
  {
    id: 'f2',
    group: 'Orders & Delivery',
    question: 'What are your delivery charges?',
    answer:
      'Delivery is free within 75 km of any Galaxy showroom and for orders above ₹25,000 anywhere in India. Smaller orders are charged a flat ₹499, which is always shown before checkout.',
  },
  {
    id: 'f3',
    group: 'Orders & Delivery',
    question: 'Do you assemble the furniture?',
    answer:
      'Yes. Every order includes free white-glove assembly. Our team unboxes, assembles, levels and cleans up — you only enjoy the result.',
  },
  {
    id: 'f4',
    group: 'Warranty & Returns',
    question: 'What warranty do you offer?',
    answer:
      'All wood-frame furniture carries a 5–7 year structural warranty. Mechanisms (recliners, lifts) are warranted 3–7 years, and upholstery 2 years. Warranty is honoured at any of our 28 showrooms, with free servicing.',
  },
  {
    id: 'f5',
    group: 'Warranty & Returns',
    question: 'Can I return or exchange a product?',
    answer:
      'You have a 15-day no-questions-asked return policy on stock items. Custom furniture is crafted to your specifications, so it cannot be returned — but we offer free in-home measurement to get it right the first time.',
  },
  {
    id: 'f6',
    group: 'Materials & Care',
    question: 'What wood do you use?',
    answer:
      'We use 100% solid sheesham, oak, and sustainably sourced mango wood. No plywood cores, no particle board — ever. All timber is kiln-dried and anti-termite treated.',
  },
  {
    id: 'f7',
    group: 'Materials & Care',
    question: 'How do I care for my furniture?',
    answer:
      'Wipe weekly with a soft dry cloth, use coasters for drinks, and keep away from direct harsh sunlight. Re-oil wooden surfaces every 12 months with the care kit we include free. Full care guides are in every box.',
  },
  {
    id: 'f8',
    group: 'Custom Furniture',
    question: 'How does the custom furniture process work?',
    answer:
      'Book a free design consultation. We measure your space, sketch concepts, share a 3D preview and a transparent quote. After approval, our atelier crafts your piece in 30–45 days with weekly progress photos.',
  },
  {
    id: 'f9',
    group: 'Custom Furniture',
    question: 'What is the minimum order for custom work?',
    answer:
      'Custom single pieces start at ₹15,000. Full-room and home projects get dedicated project managers and volume pricing.',
  },
  {
    id: 'f10',
    group: 'Payment & Finance',
    question: 'What payment methods do you accept?',
    answer:
      'UPI, all major cards, net banking, EMI (3–24 months, including no-cost EMI) and cash on delivery on select items. For custom projects, a 50% advance is standard.',
  },
  {
    id: 'f11',
    group: 'Payment & Finance',
    question: 'Do you offer EMI?',
    answer:
      'Yes — instant no-cost EMI on orders above ₹10,000 with all leading banks. Check exact EMI options on any product page or ask our team at the showroom.',
  },
  {
    id: 'f12',
    group: 'Showrooms',
    question: 'Where can I visit a showroom?',
    answer:
      'We operate 28 experience centres across 15 cities — full address, timings and directions are on our Store Location page. Walk-ins are welcome, or book a private consultation.',
  },
];
