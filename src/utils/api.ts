
interface FetchOptions extends RequestInit {
  token?: string;
}

const API_URL = 'http://localhost:5000/api/';

/**
 * Utility function for making authenticated API requests
 */
export const fetchApi = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  const userJson = localStorage.getItem('bioHarvestUser');
  const user = userJson ? JSON.parse(userJson) : null;
  
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(user?.token && { 'Authorization': `Bearer ${user.token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

/**
 * Get user's transactions
 */
export const getTransactions = async () => {
  return fetchApi('transactions');
};

/**
 * Create a new transaction
 */
export const createTransaction = async (transactionData: {
  transactionType: string;
  amount: number;
  description: string;
  status?: string;
}) => {
  return fetchApi('transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
};

/**
 * Update a transaction
 */
export const updateTransaction = async (
  id: string,
  transactionData: Partial<{
    transactionType: string;
    amount: number;
    description: string;
    status: string;
  }>
) => {
  return fetchApi(`transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(transactionData),
  });
};
