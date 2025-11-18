import React, { useState, useEffect } from 'react';

interface SafeImageProps {
  src: string | null | undefined; 
  fallbackSrc: string;           
  alt: string;
  style?: React.CSSProperties;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackSrc, alt, style }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      onError={handleError} 
    />
  );
};

export default SafeImage;