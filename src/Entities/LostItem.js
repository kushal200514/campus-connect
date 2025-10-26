// src/entities/LostItem.js
const DEMO_ITEMS = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Space Gray',
    description: 'Space gray iPhone 13 Pro with black case. Screen has a small crack in the top right corner.',
    photo_url: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
    location_found: 'Library 2nd Floor Study Area',
    date_found: '2024-01-15',
    category: 'electronics',
    status: 'available',
    finder_contact: 'lost.found@campus.edu',
    created_date: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Blue Nike Backpack',
    description: 'Medium-sized blue Nike backpack with white swoosh logo. Contains some textbooks.',
    photo_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    location_found: 'Student Center Main Lobby',
    date_found: '2024-01-14',
    category: 'bags',
    status: 'available',
    finder_contact: 'lost.found@campus.edu',
    created_date: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    title: 'Silver Car Keys with Honda Keychain',
    description: 'Set of silver car keys with Honda keychain and small black remote. Also has a library card attached.',
    photo_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    location_found: 'Parking Lot C Near Engineering Building',
    date_found: '2024-01-13',
    category: 'keys',
    status: 'claimed',
    finder_contact: 'lost.found@campus.edu',
    created_date: '2024-01-13T09:15:00Z'
  }
];

export class LostItem {
  static async list(sortBy = '-created_date') {
    // Return demo data
    return [...DEMO_ITEMS];
  }

  static async filter(criteria, sortBy = '-created_date') {
    return DEMO_ITEMS.filter(item => {
      return Object.entries(criteria).every(([key, value]) => item[key] === value);
    });
  }

  static async create(data) {
    const newItem = {
      id: Date.now().toString(),
      ...data,
      created_date: new Date().toISOString(),
      status: 'available'
    };
    DEMO_ITEMS.unshift(newItem);
    return newItem;
  }
}

export default LostItem;
