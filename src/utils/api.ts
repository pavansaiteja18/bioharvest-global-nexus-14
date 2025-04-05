
interface FetchOptions extends RequestInit {
  token?: string;
}

const API_URL = 'http://localhost:8000/api/';

/**
 * Utility function for making authenticated API requests
 */
export const fetchApi = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  const userJson = localStorage.getItem('bioHarvestUser');
  const user = userJson ? JSON.parse(userJson) : null;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(user?.token && { 'Authorization': `Bearer ${user.token}` }),
    ...options.headers,
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    console.log(`API request to ${endpoint}:`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.parse(options.body.toString()) : undefined
    });

    // Check server connectivity before making request
    if (!sessionStorage.getItem('serverChecked')) {
      try {
        const healthResponse = await fetch(`${API_URL}health`);
        if (healthResponse.ok) {
          sessionStorage.setItem('serverChecked', 'true');
        } else {
          throw new Error('Server health check failed');
        }
      } catch (error) {
        console.error('Server health check failed:', error);
        throw new Error('Cannot connect to the server. Please make sure the server is running.');
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
    
    console.log(`API response from ${endpoint}:`, {
      status: response.status,
      statusText: response.statusText
    });
    
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log(`API response data from ${endpoint}:`, data);
    } else {
      data = await response.text();
      console.log(`API response text from ${endpoint}:`, data);
    }

    if (!response.ok) {
      throw new Error(
        data.message || data.error || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
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
