export const apiServiceClient = async (url: string, fetchOptions: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    };
  
    try {
      const response = await fetch(url, defaultOptions); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };
  