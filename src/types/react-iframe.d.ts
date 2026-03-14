import 'react';

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    mozallowfullscreen?: string;
    webkitallowfullscreen?: string;
    'xr-spatial-tracking'?: string;
    'execution-while-out-of-viewport'?: string;
    'execution-while-not-rendered'?: string;
    'web-share'?: string;
  }
}
