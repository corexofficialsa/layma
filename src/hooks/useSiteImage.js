import { useState, useEffect } from 'react';
import { getSiteImage } from '../data/store';

// Returns the current URL for a site image key, re-renders when admin updates it
export default function useSiteImage(key) {
  const [url, setUrl] = useState(() => getSiteImage(key));

  useEffect(() => {
    const onUpdate = () => setUrl(getSiteImage(key));
    window.addEventListener('layma_images_updated', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('layma_images_updated', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, [key]);

  return url;
}
