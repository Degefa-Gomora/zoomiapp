const ZoomiIcon = ({ className = "", size = 36 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <defs>
      <linearGradient
        id="zoomiGradient"
        x1="0"
        y1="0"
        x2="64"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#082ad5ff" />
        <stop offset="1" stopColor="#031b85ff" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#zoomiGradient)" />
    <path
      d="M20 22C18.9 22 18 22.9 18 24V40C18 41.1 18.9 42 20 42H36C37.1 42 38 41.1 38 40V34.5L46 40V24L38 29.5V24C38 22.9 37.1 22 36 22H20Z"
      fill="white"
    />
    <text
      x="32"
      y="58"
      fontSize="10"
      textAnchor="middle"
      fill="#ffffff"
      fontFamily="Arial, sans-serif"
    >
      Zoomi
    </text>
  </svg>
);

export default ZoomiIcon;
