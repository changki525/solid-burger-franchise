'use client';

import { Suspense, lazy, useState, useEffect } from 'react';

// Lazy load Spline to avoid SSR issues
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  fallback?: React.ReactNode;
  className?: string;
}

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-brand-gold/20 rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold rounded-full" />
        </div>
        <span className="absolute top-20 left-1/2 -translate-x-1/2 text-sm text-brand-cream-dark whitespace-nowrap">
          3D 로딩중...
        </span>
      </div>
    </div>
  );
}

export default function SplineScene({ scene, fallback, className = '' }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // On mobile, always show fallback for performance
  if (isMobile && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (hasError && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <Suspense fallback={<SplineLoader />}>
        <ErrorBoundary onError={() => setHasError(true)} fallback={fallback}>
          <Spline scene={scene} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

// Simple error boundary
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
