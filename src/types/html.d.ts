import React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    // Add fetchPriority with correct camelCase
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}