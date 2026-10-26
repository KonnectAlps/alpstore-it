import Link from 'next/link'

const LAMBDA =
  'M25.9319 37.809L23.1966 31.1687C23.0755 30.8979 22.773 30.7246 22.4583 30.7246C22.1315 30.7246 21.8289 30.8979 21.72 31.1687L18.9846 37.809C18.8273 38.1773 19.0331 38.5564 19.4325 38.6864C19.8319 38.8272 20.2676 38.6431 20.4007 38.2856L22.4582 33.3352L24.5037 38.2856C24.661 38.6431 25.0846 38.8272 25.484 38.6864C25.8955 38.5564 26.0771 38.1773 25.9318 37.809H25.9319Z'

/** Marchio tondo AlpStore: cerchio nero, anello menta, Λ menta. */
export function Mark({ size, className = 'mk' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle className="mk-circle" cx="32" cy="32" r="31" strokeWidth="1.6" />
      <path className="mk-lambda" transform="translate(32 33.2) scale(3.1) translate(-22.46 -34.73)" d={LAMBDA} />
    </svg>
  )
}

export function Brand({ cursor = true }: { cursor?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="AlpStore by KonnectAlps, home">
      <Mark />
      <span className="bt">
        <b>AlpStore</b>
        <small>
          by Konnect<i>Λ</i>lps<i>&gt;</i>
          {cursor ? <em className="cur">_</em> : <em>_</em>}
        </small>
      </span>
    </Link>
  )
}
