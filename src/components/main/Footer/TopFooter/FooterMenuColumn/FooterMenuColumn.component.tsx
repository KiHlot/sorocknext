import { FC } from "react";
import Link from "next/link";

import { DefaultProps } from "@/components/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.types";
import styles from "@/components/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.module.scss";

const FooterMenuColumn: FC<DefaultProps> = ({ menuItems }) => {
  return (
    <div className={styles.menu_column}>
      {menuItems.map(({ uri, label }) => (
        <Link key={uri} href={uri}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default FooterMenuColumn;
