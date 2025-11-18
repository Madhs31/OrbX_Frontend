import React, { useState, useEffect } from 'react';
import { geoAPI } from '../../services/api';

interface DynamicImageProps {
  query: string; 
  alt: string;
  style?: React.CSSProperties;
}

const DynamicImage: React.FC<DynamicImageProps> = ({ query, alt, style }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const res = await geoAPI.getImageForQuery(`${query} continent landscape`);
        if (isMounted && res.data?.src?.medium) {
          setImageUrl(res.data.src.medium);
        }
      } catch (error) {
        console.warn(`Nenhuma imagem encontrada para ${query}`);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [query]);

  if (!imageUrl) {
    return <div style={style} className="image-placeholder-loading" />;
  }

  return <img src={imageUrl} alt={alt} style={style} />;
};

export default DynamicImage;