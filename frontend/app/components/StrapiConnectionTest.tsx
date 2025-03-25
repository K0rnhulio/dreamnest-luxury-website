'use client';

import { useState, useEffect } from 'react';
import { checkStrapiConnection } from '../services/api';
import { STRAPI_CONFIG } from '../config/strapi';
import { theme } from '../styles/theme';

export default function StrapiConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('Testing connection to Strapi...');
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [detailedInfo, setDetailedInfo] = useState<Record<string, string>>({
    'Base URL': STRAPI_CONFIG.baseUrl,
    'API Prefix': STRAPI_CONFIG.apiPrefix,
    'Token Available': Boolean(STRAPI_CONFIG.token).toString(),
    'Content Types Configured': Object.keys(STRAPI_CONFIG.contentTypes).join(', ')
  });

  const testConnection = async () => {
    setStatus('loading');
    setMessage('Testing connection to Strapi...');
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      const result = await checkStrapiConnection();
      
      if (result.status === 'connected') {
        setStatus('connected');
        setMessage(result.message);
        if (result.contentTypes) {
          setContentTypes(result.contentTypes);
        }
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Error connecting to Strapi: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className={`p-6 rounded-lg shadow-sm ${
      status === 'loading' ? 'bg-blue-50 border border-blue-200' :
      status === 'connected' ? 'bg-green-50 border border-green-200' :
      'bg-red-50 border border-red-200'
    }`}>
      <h3 className={`font-bold text-xl mb-3 ${
        status === 'loading' ? 'text-blue-700' :
        status === 'connected' ? 'text-green-700' :
        'text-red-700'
      }`}>
        Strapi Connection Status
      </h3>
      
      <p className={`mb-4 ${
        status === 'loading' ? 'text-blue-600' :
        status === 'connected' ? 'text-green-600' :
        'text-red-600'
      }`}>
        {message}
      </p>
      
      {status === 'error' && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-red-700">Troubleshooting Tips:</h4>
          <ul className="list-disc pl-5 text-red-600 space-y-1">
            <li>Verify that Strapi is running at {STRAPI_CONFIG.baseUrl}</li>
            <li>Check that your API token is correct in frontend/app/config/strapi.ts</li>
            <li>Ensure your content types have proper permissions in Strapi Admin &gt; Settings &gt; Roles</li>
            <li>Try restarting both Strapi and Next.js servers</li>
          </ul>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-gray-700">Detailed Connection Information:</h4>
        <div className="bg-white p-3 rounded border">
          {Object.entries(detailedInfo).map(([key, value]) => (
            <div key={key} className="flex py-1">
              <span className="font-medium w-40 text-gray-700">{key}:</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
      
      {status !== 'loading' && (
        <button
          onClick={testConnection}
          disabled={isRetrying}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            isRetrying 
              ? 'bg-gray-400 cursor-not-allowed' 
              : status === 'connected'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
          }`}
          style={{ 
            backgroundColor: isRetrying 
              ? '#9CA3AF' 
              : status === 'connected'
                ? '#22C55E' // Green color for success
                : '#EF4444'  // Red color for error
          }}
        >
          {isRetrying ? 'Testing...' : `${retryCount > 0 ? 'Retry' : 'Test'} Connection`}
        </button>
      )}
    </div>
  );
}
