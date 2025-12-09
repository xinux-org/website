import styles from "./Hero.module.css";

export default function Downloads({ title, link }) {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
// <Cards>
//   <Card title="Nostabil (25.11)" href={props.latestUrl}>
//     {props.latestName}
//   </Card>
//   <Card title="Stabil (25.11) [Tez kunda]" href="https://cdn.xinux.uz/releases/" />
// </Cards>
