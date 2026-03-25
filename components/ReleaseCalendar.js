import styles from "./ReleaseCalendar.module.css";

const badgeClass = {
  stable: styles.badgeStable,
  unstable: styles.badgeUnstable,
  eol: styles.badgeEol,
  dev: styles.badgeDev,
};

const badgeLabel = {
  stable: "Stabil",
  unstable: "Nostabil",
  eol: "Eskirgan",
  dev: "Rivojlanmoqda",
};

export function ReleaseTable({ releases }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Versiya</th>
            <th>Turi</th>
            <th>Sana</th>
            <th>Mas'ul</th>
          </tr>
        </thead>
        <tbody>
          {releases.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 600 }}>{r.version}</td>
              <td>
                <span className={`${styles.badge} ${badgeClass[r.type] || ""}`}>
                  {badgeLabel[r.type] || r.type}
                </span>
              </td>
              <td>{r.date}</td>
              <td style={{ opacity: 0.7 }}>{r.notes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FreezeSchedule({ freezes }) {
  return (
    <div className={styles.freezeGrid}>
      {freezes.map((f, i) => (
        <div className={styles.freezeCard} key={i}>
          <div className={styles.freezeLabel}>{f.label}</div>
          <div className={styles.freezeDate}>{f.date}</div>
        </div>
      ))}
    </div>
  );
}
