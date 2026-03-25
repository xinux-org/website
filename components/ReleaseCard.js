import Link from "next/link";
import styles from "./ReleaseCard.module.css";

function CardBanner({ version, codename, date }) {
  return (
    <div className={styles.cardBanner}>
      <span className={styles.cardBannerVersion}>{codename}</span>
    </div>
  );
}

function CardMedia({ image, version, codename, date }) {
  if (image) {
    return <img src={image} alt={`Xinux ${version}`} className={styles.cardImage} />;
  }
  return <CardBanner version={version} codename={codename} date={date} />;
}

export function ReleaseCard({ version, codename, date, image, href, description, featured }) {
  if (featured) {
    return (
      <Link href={href} className={`${styles.card} ${styles.featured}`}>
        <div className={styles.cardImageWrapper}>
          <CardMedia image={image} version={version} codename={codename} date={date} />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.featuredLabel}>Oxirgi reliz</span>
          <h3 className={styles.cardVersion}>
            Xinux {version}
          </h3>
          {description && <p className={styles.featuredDescription}>{description}</p>}
          <p className={styles.cardDate}>{date}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <CardMedia image={image} version={version} codename={codename} date={date} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardVersion}>
          Xinux {version}
        </h3>
        <p className={styles.cardDate}>{date}</p>
      </div>
    </Link>
  );
}

export function ReleaseGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export function SectionTitle({ children }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}
