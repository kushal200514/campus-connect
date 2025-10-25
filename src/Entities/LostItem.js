// src/entities/LostItem.js
// Mock implementation for local development

export class LostItem {
  static async list(sortBy = '-created_date') {
    // Return mock data for now
    return [];
  }

  static async filter(criteria, sortBy = '-created_date') {
    // Return mock data for now
    return [];
  }

  static async create(data) {
    console.log('Creating item:', data);
    return { id: Date.now().toString(), ...data, created_date: new Date().toISOString() };
  }

  static async update(id, data) {
    console.log('Updating item:', id, data);
    return { id, ...data };
  }
}

export default LostItem;
