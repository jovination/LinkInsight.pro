
// Basic API service using React Query for data fetching

import { toast } from "sonner";

const BASE_URL = "https://api.example.com"; // Change to your actual API

interface APIError {
  message: string;
  status?: number;
}

// Wrapper for fetch with error handling
async function fetchWithError<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || `Error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    return response.json();
  } catch (error) {
    const apiError = error as APIError;
    toast.error(apiError.message || "An unexpected error occurred");
    throw error;
  }
}

export interface LinkData {
  id: string;
  url: string;
  status: "healthy" | "broken" | "redirected";
  responseTime?: string;
  lastChecked: string;
}

export interface UserStats {
  totalLinks: number;
  brokenLinks: number;
  healthyLinks: number;
  avgLoadTime: string;
}

// API services
export const apiService = {
  // Links
  getLinks: () => fetchWithError<LinkData[]>("/links"),
  createLink: (url: string) => 
    fetchWithError<LinkData>("/links", {
      method: "POST",
      body: JSON.stringify({ url }),
    }),
  deleteLink: (id: string) => 
    fetchWithError<void>(`/links/${id}`, {
      method: "DELETE",
    }),
  checkLink: (id: string) => 
    fetchWithError<LinkData>(`/links/${id}/check`, {
      method: "POST",
    }),
  
  // User dashboard data
  getDashboardStats: () => fetchWithError<UserStats>("/dashboard/stats"),
  
  // Billing
  getInvoices: () => fetchWithError<any[]>("/billing/invoices"),
  updatePaymentMethod: (paymentMethodId: string) => 
    fetchWithError<void>("/billing/payment-method", {
      method: "POST",
      body: JSON.stringify({ paymentMethodId }),
    }),
    
  // Notifications
  getNotifications: () => fetchWithError<any[]>("/notifications"),
  markNotificationAsRead: (id: string) => 
    fetchWithError<void>(`/notifications/${id}/read`, {
      method: "POST",
    }),
};
