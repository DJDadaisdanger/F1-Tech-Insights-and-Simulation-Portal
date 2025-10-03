import type { SVGProps } from "react";

export function F1Car(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10.154l2-3.846h6l2 3.846" />
      <path d="M7 10.154L3 9v5l4-.154" />
      <path d="M17 10.154L21 9v5l-4-.154" />
      <path d="M12 4.462L10 2h4l-2 2.462" />
      <path d="M3 14l-1 3h2" />
      <path d="M21 14l1 3h-2" />
      <path d="M6 18h12" />
      <path d="M9 18l-1 4h8l-1-4" />
    </svg>
  );
}
