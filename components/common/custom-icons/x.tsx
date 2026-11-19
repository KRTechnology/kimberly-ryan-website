import type { SVGProps } from "react";

type XIconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  size?: number | string;
};

/**
 * X (formerly Twitter) logo.
 *
 * This used to be built with lucide-react's `createLucideIcon`, but the
 * installed version (0.511) renders icon nodes without React keys and logs
 * "Each child in a list should have a unique key" on every render. A plain
 * single-path SVG avoids that while keeping the same `size`/`className` API as
 * the lucide icons it sits next to.
 */
export const XIcon = ({ size = 24, ...props }: XIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);
