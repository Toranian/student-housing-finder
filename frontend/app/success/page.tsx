'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const PostSuccess: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/listings');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Post Created Successfully!</h1>
      <p>Your post was successfully created. Any interested renters will contact you.</p>
      <button onClick={handleRedirect} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px', cursor: 'pointer' }}>
        Go to Listings
      </button>
    </div>
  );
};

export default PostSuccess;