/**
 * The SAGE Triad drawn as three overlapping circles. Plain geometry only,
 * so it can be replaced by the approved Sagework triad graphic when supplied.
 */

export function TriadMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="11.5" r="7.5" />
      <circle cx="10.5" cy="20.5" r="7.5" />
      <circle cx="21.5" cy="20.5" r="7.5" />
    </svg>
  );
}

export function TriadDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 380"
      fill="none"
      role="img"
      aria-label="The SAGE Triad: biology, environment and behaviour overlap. Sagework operates where all three meet."
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="138" r="104" />
        <circle cx="134" cy="244" r="104" />
        <circle cx="266" cy="244" r="104" />
      </g>
      <circle cx="200" cy="208" r="4" fill="var(--accent)" />
      <g
        fill="currentColor"
        fontFamily="var(--font-dm-mono), monospace"
        fontSize="11"
        letterSpacing="2"
        textAnchor="middle"
      >
        <text x="200" y="92">BIOLOGY</text>
        <text x="92" y="286">ENVIRONMENT</text>
        <text x="308" y="286">BEHAVIOUR</text>
      </g>
    </svg>
  );
}
