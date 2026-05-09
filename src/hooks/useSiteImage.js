import { useState, useEffect } from 'react';
import { getSiteImage } from '../data/store';

// Returns the current URL for a site image key, re-renders when admin updates it
export default function useSiteImage(key) {
  const [url, setUrl] = useState(() => getSiteImage(key));

  useEffect(() => {
    const onStorage = () => setUrl(getSiteImage(key));
    window.addEventListener('layma_images_updated', onStorage);
    return () => window.removeEventListener('layma_images_updated', onStorage);
  }, [key]);

  return url;
}
