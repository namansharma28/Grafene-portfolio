/**
 * Converts various image link formats to direct image URLs
 * Supports: Google Drive, Dropbox, regular URLs
 */

export const getDirectImageUrl = (url) => {
  if (!url) return '';
  
  // If it's already a direct image URL (ends with image extension), return as is
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) {
    return url;
  }
  
  // Google Drive link conversion
  // From: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // To: https://drive.google.com/uc?export=view&id=FILE_ID
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
    
    // Alternative format: https://drive.google.com/open?id=FILE_ID
    const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openIdMatch && openIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${openIdMatch[1]}`;
    }
  }
  
  // Dropbox link conversion
  // From: https://www.dropbox.com/s/FILE_ID/image.jpg?dl=0
  // To: https://www.dropbox.com/s/FILE_ID/image.jpg?raw=1
  if (url.includes('dropbox.com')) {
    return url.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
  }
  
  // OneDrive link conversion
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    // OneDrive requires embedding, return as is and handle with iframe fallback
    return url;
  }
  
  // LinkedIn CDN or profile links - these won't work, return placeholder
  if (url.includes('linkedin.com')) {
    console.warn('LinkedIn URLs cannot be used as direct image sources. Please use Google Drive or direct image URLs.');
    return ''; // Return empty to trigger fallback
  }
  
  // For any other URL, return as is
  return url;
};

/**
 * Validates if an image URL is accessible
 * Returns a promise that resolves to true if image loads, false otherwise
 */
export const validateImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};

/**
 * Gets a fallback avatar with initials
 */
export const getAvatarFallback = (name) => {
  if (!name) return '';
  
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Generate a color based on the name
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Create SVG avatar
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${bgColor}"/>
      <text x="50" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" 
            fill="white" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `)}`;
};
