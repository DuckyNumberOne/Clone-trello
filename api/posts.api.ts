// /src/api/blogApi.ts
import { apiServiceClient } from "~/api/services/apiServicesClient";

const BASE_URL = 'https://66de629ede4426916ee0fc32.mockapi.io/post';

export const getBlog = async () => {
  const url = `${BASE_URL}`;
  try {
    return await apiServiceClient(url, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
};

export const getBlogById = async (id: string) => {
  const url = `${BASE_URL}/${id}`;
  try {
    return await apiServiceClient(url, {
      method: 'GET',
    });
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw new Error(`Failed to fetch blog with ID ${id}`);
  }
};

export const deleteBlogById = async (id: string) => {
  const url = `${BASE_URL}/${id}`;
  try {
    return await apiServiceClient(url, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw new Error(`Failed to delete blog with ID ${id}`);
  }
};

export const updateBlogById = async (id: string, updatedData: any) => {
  const url = `${BASE_URL}/${id}`;
  try {
    return await apiServiceClient(url, {
      method: 'PUT', 
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw new Error(`Failed to update blog with ID ${id}`);
  }
};

export const createBlog = async (newBlogData: any) => {
  const url = `${BASE_URL}`;
  try {
    return await apiServiceClient(url, {
      method: 'POST',
      body: JSON.stringify(newBlogData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating new blog:', error);
    throw new Error('Failed to create new blog');
  }
};
