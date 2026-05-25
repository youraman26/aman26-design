import React from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Responsive sizes query (e.g. "(max-width: 768px) 100vw, 50vw") */
  sizes?: string;
  /** Set to true for LCP or above-the-fold images to optimize rendering priority */
  priority?: boolean;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes,
  priority = false,
  className = '',
  style,
  ...props
}) => {
  // Directly serve the original high-resolution WebP file from /image/ path
  const hasWidthClass = className.split(' ').some(c => c.startsWith('w-'));
  const hasHeightClass = className.split(' ').some(c => c.startsWith('h-'));
  const baseClasses = `${hasWidthClass ? '' : 'w-full'} ${hasHeightClass ? '' : 'h-auto'} object-cover block`;

  return (
    <img
      src={src}
      className={`${baseClasses} ${className}`}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={style}
      {...props}
    />
  );
};
