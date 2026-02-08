import { useState, useEffect } from 'react';
import { getDirectImageUrl, getAvatarFallback } from '../utils/imageUtils';

/**
 * Smart Image component that handles various image URL formats
 * Automatically converts Google Drive, Dropbox links to direct URLs
 * Provides fallback for failed images
 */
const SmartImage = ({ 
  src, 
  alt = '', 
  fallbackName = '',
  className = '',
  style = {},
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (src) {
      const directUrl = getDirectImageUrl(src);
      setImageSrc(directUrl);
      setImageError(false);
    } else {
      setImageError(true);
    }
  }, [src]);

  const handleError = () => {
    console.warn(`Failed to load image: ${imageSrc}`);
    setImageError(true);
  };

  const handleLoad = () => {
    setImageError(false);
  };

  // If image failed or no src, show fallback
  if (imageError || !imageSrc) {
    const fallbackSrc = getAvatarFallback(fallbackName || alt);
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default SmartImage;
