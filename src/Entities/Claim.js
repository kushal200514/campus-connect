// src/entities/Claim.js
// Mock implementation for local development

export class Claim {
  static async list(sortBy = '-created_date') {
    // Return mock data for now
    return [];
  }

  static async filter(criteria, sortBy = '-created_date') {
    // Return mock data for now
    return [];
  }

  static async create(data) {
    console.log('Creating claim:', data);
    return { 
      id: Date.now().toString(), 
      ...data, 
      status: 'pending',
      created_date: new Date().toISOString() 
    };
  }

  static async update(id, data) {
    console.log('Updating claim:', id, data);
    return { id, ...data };
  }
}

export default Claim;
