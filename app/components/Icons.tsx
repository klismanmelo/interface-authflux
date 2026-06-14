import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  sw?: number;
}

function Icon({
  d,
  paths,
  size = 20,
  fill,
  sw = 2,
  ...p
}: IconProps & { d?: string; paths?: React.ReactNode; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      {d ? <path d={d} /> : paths}
    </svg>
  );
}

export const HomeIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    }
    {...p}
  />
);

export const GridIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </>
    }
    {...p}
  />
);

export const PulseIcon = (p: IconProps) => (
  <Icon d="M3 12h4l2.5-7 5 14L17 12h4" {...p} />
);

export const BookIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v18H5.5A1.5 1.5 0 0 0 4 22.5z" />
        <path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H12v18h6.5a1.5 1.5 0 0 1 1.5 1.5z" />
      </>
    }
    {...p}
  />
);

export const GearIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2" />
      </>
    }
    {...p}
  />
);

export const LogoutIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </>
    }
    {...p}
  />
);

export const BellIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    }
    {...p}
  />
);

export const UserIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </>
    }
    {...p}
  />
);

export const UsersIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="9" cy="8" r="3.4" />
        <path d="M2.5 21c0-3.6 2.9-5.5 6.5-5.5S15.5 17.4 15.5 21" />
        <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M17.5 15.6c2.4.5 4 2.1 4 5.4" />
      </>
    }
    {...p}
  />
);

export const ShieldIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
        <path d="M9.2 12l2 2 3.6-4" />
      </>
    }
    {...p}
  />
);

export const KeyIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="7.5" cy="15.5" r="4" />
        <path d="M10.5 12.5 20 3M16 7l3 3M14 9l2.5 2.5" />
      </>
    }
    {...p}
  />
);

export const ListIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <circle cx="3.5" cy="6" r="1" />
        <circle cx="3.5" cy="12" r="1" />
        <circle cx="3.5" cy="18" r="1" />
      </>
    }
    {...p}
  />
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon d="M19 12H5M11 18l-6-6 6-6" {...p} />
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon d="M5 12h14M13 6l6 6-6 6" {...p} />
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon d="M9 6l6 6-6 6" {...p} />
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon d="M6 9l6 6 6-6" {...p} />
);

export const CheckIcon = (p: IconProps) => <Icon d="M20 6 9 17l-5-5" {...p} />;

export const CheckCircleIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    }
    {...p}
  />
);

export const XIcon = (p: IconProps) => <Icon d="M18 6 6 18M6 6l12 12" {...p} />;

export const XCircleIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </>
    }
    {...p}
  />
);

export const AlertIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M12 3 2 20h20z" />
        <path d="M12 9v5M12 17.5v.5" />
      </>
    }
    {...p}
  />
);

export const InfoIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8v.5" />
      </>
    }
    {...p}
  />
);

export const PlusIcon = (p: IconProps) => <Icon d="M12 5v14M5 12h14" {...p} />;

export const MailIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    }
    {...p}
  />
);

export const LockIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <rect x="4.5" y="11" width="15" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    }
    {...p}
  />
);

export const EyeIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7" />
        <circle cx="12" cy="12" r="3" />
      </>
    }
    {...p}
  />
);

export const EyeOffIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M9.9 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 3.8M6.3 6.3A16 16 0 0 0 2 12s3.5 7 10 7a9.5 9.5 0 0 0 4-.9" />
        <path d="M9.5 9.6a3 3 0 0 0 4.2 4.2M3 3l18 18" />
      </>
    }
    {...p}
  />
);

export const CopyIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    }
    {...p}
  />
);

export const TerminalIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3 3-3 3M13 15h4" />
      </>
    }
    {...p}
  />
);

export const RocketIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
        <path d="M9 14c-1-3 .5-7 4-10 3 0 5 2 5 5-3 3.5-7 5-10 4z" />
        <circle cx="14.5" cy="9.5" r="1.4" />
      </>
    }
    {...p}
  />
);

export const ClockIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    }
    {...p}
  />
);

export const MoreIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </>
    }
    {...p}
  />
);

export const ExternalIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    }
    {...p}
  />
);

export const RefreshIcon = (p: IconProps) => (
  <Icon
    paths={
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
      </>
    }
    {...p}
  />
);
