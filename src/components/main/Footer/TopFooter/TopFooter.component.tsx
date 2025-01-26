import { FC } from "react";
import { DefaultProps } from "@/components/Footer/TopFooter/TopFooter.types";
import styles from "@/components/Footer/TopFooter/TopFooter.module.scss";
import MainWrapper from "@/components/Blocks/MainWrapper/MainWrapper.component";
import FooterMenuColumn from "@/components/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.component";
import PopularTags from "@/components/Blocks/PopularTags/PopularTags.component";
import ContactForm from "@/components/Forms/ContactForm/ContactForm.component";
import { FOOTER_MENU } from "@/components/Footer/TopFooter/TopFooter.config";

const TopFooter: FC<DefaultProps> = ({ popularTags }) => {
  return (
    <div className={styles.top_footer}>
      <MainWrapper className={styles.full_wrapper}>
        <div className={styles.footer_col}>
          <div className={styles.title}>Теги</div>
          {popularTags && <PopularTags popularTags={popularTags} />}
        </div>

        <div className={`${styles.footer_col} ${styles.menu}`}>
          <div className={styles.title}>Категории</div>
          <FooterMenuColumn menuItems={FOOTER_MENU[947]} />
        </div>

        <div className={`${styles.footer_col} ${styles.menu}`}>
          <div className={styles.title}>Разделы сайта</div>
          <FooterMenuColumn menuItems={FOOTER_MENU[948]} />
        </div>

        <div className={`${styles.footer_col} ${styles.menu}`}>
          <div className={styles.title}>Инфо</div>
          <FooterMenuColumn menuItems={FOOTER_MENU[949]} />
        </div>

        <div className={styles.footer_col}>
          <div className={styles.title}>Обратная связь</div>
          <ContactForm />
        </div>
      </MainWrapper>
    </div>
  );
};

export default TopFooter;
