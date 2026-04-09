export interface City {
  slug: string;
  name: string;
  country: string;
  region: string;
  currency: string;
  phone: string;
}

export const CITIES: City[] = [
  // UK
  { slug: 'london',       name: 'London',       country: 'United Kingdom', region: 'England',          currency: 'GBP', phone: '+44' },
  { slug: 'manchester',   name: 'Manchester',   country: 'United Kingdom', region: 'England',          currency: 'GBP', phone: '+44' },
  { slug: 'birmingham',   name: 'Birmingham',   country: 'United Kingdom', region: 'England',          currency: 'GBP', phone: '+44' },
  // USA
  { slug: 'new-york',     name: 'New York',     country: 'United States',  region: 'New York',         currency: 'USD', phone: '+1'  },
  { slug: 'los-angeles',  name: 'Los Angeles',  country: 'United States',  region: 'California',       currency: 'USD', phone: '+1'  },
  { slug: 'chicago',      name: 'Chicago',      country: 'United States',  region: 'Illinois',         currency: 'USD', phone: '+1'  },
  { slug: 'houston',      name: 'Houston',      country: 'United States',  region: 'Texas',            currency: 'USD', phone: '+1'  },
  { slug: 'san-francisco',name: 'San Francisco',country: 'United States',  region: 'California',       currency: 'USD', phone: '+1'  },
  // Canada
  { slug: 'toronto',      name: 'Toronto',      country: 'Canada',         region: 'Ontario',          currency: 'CAD', phone: '+1'  },
  { slug: 'vancouver',    name: 'Vancouver',    country: 'Canada',         region: 'British Columbia', currency: 'CAD', phone: '+1'  },
  // Australia
  { slug: 'sydney',       name: 'Sydney',       country: 'Australia',      region: 'New South Wales',  currency: 'AUD', phone: '+61' },
  { slug: 'melbourne',    name: 'Melbourne',    country: 'Australia',      region: 'Victoria',         currency: 'AUD', phone: '+61' },
  // UAE
  { slug: 'dubai',        name: 'Dubai',        country: 'UAE',            region: 'Dubai',            currency: 'AED', phone: '+971'},
  { slug: 'abu-dhabi',    name: 'Abu Dhabi',    country: 'UAE',            region: 'Abu Dhabi',        currency: 'AED', phone: '+971'},
  // Singapore
  { slug: 'singapore',    name: 'Singapore',    country: 'Singapore',      region: 'Singapore',        currency: 'SGD', phone: '+65' },
  // India
  { slug: 'noida',        name: 'Noida',        country: 'India',          region: 'Uttar Pradesh',    currency: 'INR', phone: '+91' },
  { slug: 'delhi',        name: 'Delhi',        country: 'India',          region: 'Delhi NCR',        currency: 'INR', phone: '+91' },
  { slug: 'mumbai',       name: 'Mumbai',       country: 'India',          region: 'Maharashtra',      currency: 'INR', phone: '+91' },
  { slug: 'bangalore',    name: 'Bangalore',    country: 'India',          region: 'Karnataka',        currency: 'INR', phone: '+91' },
  { slug: 'hyderabad',    name: 'Hyderabad',    country: 'India',          region: 'Telangana',        currency: 'INR', phone: '+91' },
  { slug: 'pune',         name: 'Pune',         country: 'India',          region: 'Maharashtra',      currency: 'INR', phone: '+91' },
  { slug: 'chennai',      name: 'Chennai',      country: 'India',          region: 'Tamil Nadu',       currency: 'INR', phone: '+91' },
  { slug: 'kolkata',      name: 'Kolkata',      country: 'India',          region: 'West Bengal',      currency: 'INR', phone: '+91' },
  // Europe
  { slug: 'berlin',       name: 'Berlin',       country: 'Germany',        region: 'Berlin',           currency: 'EUR', phone: '+49' },
  { slug: 'amsterdam',    name: 'Amsterdam',    country: 'Netherlands',    region: 'North Holland',    currency: 'EUR', phone: '+31' },
  { slug: 'dublin',       name: 'Dublin',       country: 'Ireland',        region: 'Leinster',         currency: 'EUR', phone: '+353'},
  // Asia
  { slug: 'hong-kong',    name: 'Hong Kong',    country: 'Hong Kong',      region: 'Hong Kong',        currency: 'HKD', phone: '+852'},
  { slug: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia',       region: 'Kuala Lumpur',     currency: 'MYR', phone: '+60' },
  // Africa
  { slug: 'johannesburg', name: 'Johannesburg', country: 'South Africa',   region: 'Gauteng',          currency: 'ZAR', phone: '+27' },
  // New Zealand
  { slug: 'auckland',     name: 'Auckland',     country: 'New Zealand',    region: 'Auckland',         currency: 'NZD', phone: '+64' },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
