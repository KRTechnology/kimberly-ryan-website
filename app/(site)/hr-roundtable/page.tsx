import type { Metadata } from "next";
import Image from "next/image";
import { Outfit } from "next/font/google";
import RegistrationForm from "./RegistrationForm";
import styles from "./hr-roundtable.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "KR Virtual Roundtable 3.0: Agile EX | Kimberly Ryan",
  description:
    "Agile EX: Designing Meaningful Employee Experience. Kimberly Ryan Virtual Roundtable 3.0 on 26 November 2026 at 10am. Register now.",
};

type Person = { name: string; detail: string; img: string; role?: string };

const keynote: Person = {
  name: "Solomon Adedeji Adebosin",
  detail: "FCIPM, FIMC, CMC, FNLI, ACIArb (UK), Mediator LMDC, MILR, LL.B",
  img: "solomon",
};

const panel: Person[] = [
  { name: "Ejiro Ogunbanjo", detail: "FCIPD, FCIPM, ACIB, PSM. CHRO, Alternative Bank", img: "ejiro" },
  { name: "Gbenga Totoyi", detail: "Partner, Alan & Grant", img: "gbenga" },
  { name: "Adewole Fasina", detail: "Head, Outsourcing & L&D, Kimberly Ryan Limited", img: "adewole", role: "Panel moderator" },
  { name: "Chimuanya Udeozo", detail: "Digital Communication Exec., Kimberly Ryan Limited", img: "chimuanya", role: "Host" },
];

function PersonCard({ p, keynoteCard }: { p: Person; keynoteCard?: boolean }) {
  return (
    <div className={styles.person}>
      <Image src={`/hr-roundtable/${p.img}.jpg`} alt={p.name} width={228} height={304} />
      <h3>{p.name}</h3>
      <p>{p.detail}</p>
      {p.role && <span className={keynoteCard ? styles.roleYellow : styles.role}>{p.role}</span>}
    </div>
  );
}

export default function HrRoundtablePage() {
  return (
    <div className={`${styles.page} ${outfit.className}`}>
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.tag}>KR Virtual Roundtable 3.0</div>
        <div className={styles.title}>
          <h1>Agile EX: Designing Meaningful Employee Experience</h1>
        </div>
        <div className={styles.rule} />
        <p className={styles.lede}>
          A live virtual conversation on how organizations can design employee experience that adapts quickly and still
          feels meaningful to the people living it. Hear a keynote, then join a panel discussion with HR and legal
          leaders.
        </p>
        <ul className={styles.facts}>
          <li><span>Date</span>Thursday, 26 November 2026</li>
          <li><span>Time</span>10:00 am (WAT)</li>
          <li><span>Format</span>Virtual</li>
        </ul>
        <a className={styles.btn} href="#register">Register now</a>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2>Who you&apos;ll hear from</h2>
          <p className={styles.sub}>A keynote address followed by a moderated panel discussion.</p>
          <span className={styles.groupLabel}>Keynote speaker</span>
          <div className={styles.people}><PersonCard p={keynote} keynoteCard /></div>
          <span className={styles.groupLabel}>Panelists</span>
          <div className={styles.people}>
            {panel.map((p) => <PersonCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      <section className={styles.section} id="register">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <h2>Register</h2>
            <p className={styles.sub}>
              Complete the form to reserve your place at KR Virtual Roundtable 3.0 on 26 November 2026 at 10am. We will
              email you the joining link.
            </p>
          </div>
          <RegistrationForm styles={styles} />
        </div>
      </section>
    </div>
  );
}
