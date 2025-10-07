import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAvatarUrl, testImageAccessibility } from '../../utils/userDisplay';

/**
 * Debug component to help diagnose profile image issues
 * Add this temporarily to your app to debug Google profile image problems
 */
export const ProfileImageDebug: React.FC = () => {
  const { currentUser } = useAuth();
  const [imageAccessible, setImageAccessible] = useState<boolean | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (currentUser?.avatarUrl) {
      testImageAccessibility(currentUser.avatarUrl).then(setImageAccessible);
      
      setDebugInfo({
        userId: currentUser.id,
        userName: currentUser.name,
        provider: currentUser.provider,
        originalAvatarUrl: currentUser.avatarUrl,
        processedAvatarUrl: getUserAvatarUrl(currentUser),
        hasAvatar: !!currentUser.avatarUrl,
        avatarUrlType: typeof currentUser.avatarUrl,
        avatarUrlLength: currentUser.avatarUrl?.length,
        isGoogleUser: currentUser.provider === 'google',
        isFacebookUser: currentUser.provider === 'facebook'
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
      <h3 className="font-bold text-yellow-800">Debug: No user found</h3>
    </div>;
  }

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg m-4">
      <h3 className="font-bold text-blue-800 mb-2">Profile Image Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <div><strong>User ID:</strong> {debugInfo?.userId}</div>
        <div><strong>User Name:</strong> {debugInfo?.userName}</div>
        <div><strong>Provider:</strong> {debugInfo?.provider}</div>
        <div><strong>Has Avatar URL:</strong> {debugInfo?.hasAvatar ? 'Yes' : 'No'}</div>
        <div><strong>Avatar URL Type:</strong> {debugInfo?.avatarUrlType}</div>
        <div><strong>Avatar URL Length:</strong> {debugInfo?.avatarUrlLength}</div>
        <div><strong>Is Google User:</strong> {debugInfo?.isGoogleUser ? 'Yes' : 'No'}</div>
        <div><strong>Is Facebook User:</strong> {debugInfo?.isFacebookUser ? 'Yes' : 'No'}</div>
        
        <div className="mt-2">
          <strong>Original Avatar URL:</strong>
          <div className="bg-white p-2 rounded text-xs break-all">
            {debugInfo?.originalAvatarUrl || 'None'}
          </div>
        </div>
        
        <div className="mt-2">
          <strong>Processed Avatar URL:</strong>
          <div className="bg-white p-2 rounded text-xs break-all">
            {debugInfo?.processedAvatarUrl || 'None'}
          </div>
        </div>
        
        <div className="mt-2">
          <strong>Image Accessibility:</strong>
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            imageAccessible === true ? 'bg-green-100 text-green-800' :
            imageAccessible === false ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {imageAccessible === true ? 'Accessible' :
             imageAccessible === false ? 'Not Accessible' :
             'Testing...'}
          </span>
        </div>
        
        {currentUser.avatarUrl && (
          <div className="mt-4">
            <strong>Image Preview:</strong>
            <div className="mt-2">
              <img 
                src={currentUser.avatarUrl} 
                alt="Profile preview" 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                onLoad={() => console.log('Image loaded successfully')}
                onError={(e) => console.error('Image failed to load:', e)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
