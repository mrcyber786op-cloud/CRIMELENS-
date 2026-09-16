// CRIMELENS Backend API
// Replace the URL below with your live Render backend URL.

export const API_BASE_URL = 'https://YOUR-RENDER-BACKEND.onrender.com';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getCourses() {
  return apiRequest('/api/courses');
}

export async function getWebinars() {
  return apiRequest('/api/webinars');
}

export async function getPosts() {
  return apiRequest('/api/posts');
}

export async function getGallery() {
  return apiRequest('/api/gallery');
}

export async function submitEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}) {
  return apiRequest('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
