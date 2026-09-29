// ==========================================
// JusticeLaw Attorneys - API Service Utility
// ==========================================

import { getAuthToken } from '../auth';

// Base URL for your ASP.NET Core 8 Web API backend
const API_BASE_URL = 'https://localhost:7001/api';

// Helper function to build headers including JWT authorization token if available
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// ------------------------------------------
// Client API Endpoints
// ------------------------------------------

export const getClients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch clients from server.');
    return await response.json();
  } catch (error) {
    console.error('API Error [getClients]:', error);
    return [];
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(clientData)
    });
    if (!response.ok) throw new Error('Failed to create client record.');
    return await response.json();
  } catch (error) {
    console.error('API Error [createClient]:', error);
    throw error;
  }
};

// ------------------------------------------
// Attorney API Endpoints
// ------------------------------------------

export const getAttorneys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/attorneys`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch attorneys from server.');
    return await response.json();
  } catch (error) {
    console.error('API Error [getAttorneys]:', error);
    return [];
  }
};

export const createAttorney = async (attorneyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attorneys`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(attorneyData)
    });
    if (!response.ok) throw new Error('Failed to create attorney record.');
    return await response.json();
  } catch (error) {
    console.error('API Error [createAttorney]:', error);
    throw error;
  }
};

// ------------------------------------------
// Case API Endpoints
// ------------------------------------------

export const getCases = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cases`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch cases from server.');
    return await response.json();
  } catch (error) {
    console.error('API Error [getCases]:', error);
    return [];
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(caseData)
    });
    if (!response.ok) throw new Error('Failed to create case record.');
    return await response.json();
  } catch (error) {
    console.error('API Error [createCase]:', error);
    throw error;
  }
};