// API Gateway service for resume analysis
import * as mockService from './mockService';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const USE_MOCK = !API_ENDPOINT || API_ENDPOINT === 'YOUR_API_GATEWAY_URL';

export const analyzeResume = async (file, jobDescription = '') => {
  if (USE_MOCK) {
    console.log('Using mock service for development');
    return await mockService.analyzeResume(file, jobDescription);
  }

  try {
    const fileContent = await fileToBase64(file);
    
    const response = await fetch(`${API_ENDPOINT}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileContent,
        jobDescription,
        contentType: file.type
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Resume analysis error:', error);
    throw error;
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

// Resume versions management
export const getResumeVersions = async (userId) => {
  if (USE_MOCK) {
    return await mockService.getResumeVersions(userId);
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/versions/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cognito_access_token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching resume versions:', error);
    throw error;
  }
};

export const saveResumeVersion = async (versionData) => {
  if (USE_MOCK) {
    return await mockService.saveResumeVersion(versionData);
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cognito_access_token')}`
      },
      body: JSON.stringify(versionData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving resume version:', error);
    throw error;
  }
};