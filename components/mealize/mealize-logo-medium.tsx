"use client";

import { useId } from "react";

/** 200×200 Mealize mark from legacy `react-app` `MediumLogo` (gradient IDs uniquified per instance). */
export function MealizeLogoMedium({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `mealize-logo-grad-${uid}`;
  const clipId = `mealize-logo-clip-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#76d97e" />
          <stop offset="1" stopColor="#28a690" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="200" height="170.719" fill={`url(#${gradId})`} />
        </clipPath>
      </defs>
      <g transform="translate(14009 20497)">
        <g transform="translate(-14009 -20497)" fill="#fff" stroke="#707070" strokeWidth="1" opacity="0">
          <rect width="200" height="200" stroke="none" />
          <rect x="0.5" y="0.5" width="199" height="199" fill="none" />
        </g>
        <g transform="translate(-14009 -20482)">
          <g clipPath={`url(#${clipId})`}>
            <path
              fill={`url(#${gradId})`}
              d="M184.407,90.877l-9.122,9.129L107.8,167.486a11.02,11.02,0,0,1-15.584.009l-.007-.009L15.6,90.877A53.225,53.225,0,0,1,15.583,15.6l.013-.014A53.227,53.227,0,0,1,82.948,9.066a11,11,0,0,1,4.8,8.091l.014.108a11.037,11.037,0,0,1-3.682,9.309l-10.13,8.948a41.451,41.451,0,0,0-13.632,36.1L65.1,111.542a6.983,6.983,0,0,0,6.932,6.218h.72a7.3,7.3,0,0,0,7.177-7.427c0-.075,0-.15-.007-.225l-2.868-39.44a7.67,7.67,0,0,1,7.191-8.12c.153-.01.307-.014.461-.014a7.507,7.507,0,0,1,5.253,2.183,7.978,7.978,0,0,1,2.392,5.23l.482,40.874A7.148,7.148,0,0,0,100,117.758a7.311,7.311,0,0,0,7.169-6.938l.958-40.874a7.663,7.663,0,0,1,7.652-7.414,7.819,7.819,0,0,1,7.658,7.973c0,.055,0,.108-.006.161l-2.876,39.441a7.164,7.164,0,0,0,6.66,7.635c.171.012.344.017.516.017a7.156,7.156,0,0,0,4.72-1.765,6.448,6.448,0,0,0,2.2-4.452l5.028-39.922a41.209,41.209,0,0,0-13.63-36.1l-10.129-8.949a11.024,11.024,0,0,1-3.682-9.3l.014-.108a11.062,11.062,0,0,1,4.848-8.134A53.231,53.231,0,0,1,184.414,90.87l-.007.007"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
