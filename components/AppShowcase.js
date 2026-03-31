import styles from "./AppShowcase.module.css";

function VerifiedBadge() {
  return (
    <svg className={styles.verified} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

export function AppCard({ name, description, icon, href, verified }) {
  const Wrapper = href ? "a" : "div";
  const props = href ? { href, target: "_blank", rel: "noreferrer" } : {};

  return (
    <Wrapper className={styles.card} {...props}>
      {icon ? (
        <img src={icon} alt={name} className={styles.icon} />
      ) : (
        <div className={styles.iconPlaceholder}>
          <svg viewBox="0 0 1003 613" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.iconLogo}>
            <polygon fill="#fff" points="501.946989 612 854 2.5162448 692.207329 1 598.2189 164.746663 503.557486 1.87475661 423.168807 1.90585907 382 72.9983011 516.861589 304.754375 421.12651 471.253605" />
            <polygon fill="#ffffffaa" points="408.244609 447 156 0 312.05486 0 489 306.337213" />
            <polygon fill="#ffffffcc" points="883.052022 2 531 611.483755 692.790115 613 786.779318 449.253337 881.441512 612.125243 961.830854 612.094141 1003 541.001699 868.1373 309.245625 963.877057 142.746395" />
            <polygon fill="#ffffff88" points="119.946409 2 472 611.483755 310.207062 613 216.218478 449.253337 121.560798 612.125243 41.1696526 612.094141 0 541.001699 134.861033 309.245625 39.1242407 142.742508" />
          </svg>
        </div>
      )}
      <div className={styles.info}>
        <p className={styles.name}>
          {name}
          {verified && <VerifiedBadge />}
        </p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Wrapper>
  );
}

export function AppGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
