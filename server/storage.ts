import { type Enquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface StoredEnquiry extends Enquiry {
  id: string;
  createdAt: Date;
}

export interface IStorage {
  createEnquiry(enquiry: Enquiry): Promise<StoredEnquiry>;
  getEnquiries(): Promise<StoredEnquiry[]>;
}

export class MemStorage implements IStorage {
  private enquiries: Map<string, StoredEnquiry>;

  constructor() {
    this.enquiries = new Map();
  }

  async createEnquiry(enquiry: Enquiry): Promise<StoredEnquiry> {
    const id = randomUUID();
    const storedEnquiry: StoredEnquiry = {
      ...enquiry,
      id,
      createdAt: new Date(),
    };
    this.enquiries.set(id, storedEnquiry);
    return storedEnquiry;
  }

  async getEnquiries(): Promise<StoredEnquiry[]> {
    return Array.from(this.enquiries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
