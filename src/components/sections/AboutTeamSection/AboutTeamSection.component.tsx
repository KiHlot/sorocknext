import { FC } from 'react';
import Link from 'next/link';
import Img from '@/components/elems/Img/Img.component';
import {
    ABOUT_TEAM_COPY,
    ABOUT_TEAM_SOC_ICON,
    ABOUT_TEAM_SOC_LABEL,
} from '@/components/sections/AboutTeamSection/AboutTeamSection.config';
import styles from '@/components/sections/AboutTeamSection/AboutTeamSection.module.scss';
import { AboutTeamSectionPropsIF } from '@/components/sections/AboutTeamSection/AboutTeamSection.types';

const AboutTeamSection: FC<AboutTeamSectionPropsIF> = ({ members }) => (
    <section
        className={styles.section}
        aria-labelledby={ABOUT_TEAM_COPY.titleId}
        itemScope
        itemType="https://schema.org/NewsMediaOrganization"
    >
        <h2
            id={ABOUT_TEAM_COPY.titleId}
            className={styles.title}
            itemProp="name"
        >
            {ABOUT_TEAM_COPY.title}
        </h2>
        <ul className={styles.list}>
            {members.map((member) => {
                const avatar = (
                    <Img
                        className={styles.avatar}
                        url={member.avatar}
                        type="user250"
                    />
                );

                return (
                    <li
                        key={member.fullName}
                        className={styles.card}
                        itemScope
                        itemType="https://schema.org/Person"
                        itemProp="member"
                    >
                        {member.uri ? (
                            <Link
                                href={member.uri}
                                className={styles.avatarLink}
                                title={`Профиль пользователя ${member.fullName}`}
                            >
                                {avatar}
                            </Link>
                        ) : (
                            <span className={styles.avatarLink}>{avatar}</span>
                        )}
                        <div className={styles.body}>
                            {member.uri ? (
                                <Link
                                    href={member.uri}
                                    className={styles.name}
                                    itemProp="name"
                                >
                                    {member.fullName}
                                </Link>
                            ) : (
                                <span className={styles.name} itemProp="name">
                                    {member.fullName}
                                </span>
                            )}
                            <div
                                className={styles.position}
                                itemProp="jobTitle"
                            >
                                {member.position}
                            </div>
                            <div className={`cvscroll ${styles.about}`}>
                                {member.description}
                            </div>
                            {member.soclist?.length ? (
                                <ul className={styles.socList}>
                                    {member.soclist.map((soc) => {
                                        const SocIcon =
                                            ABOUT_TEAM_SOC_ICON[soc.mode];

                                        return (
                                            <li key={soc.mode}>
                                                <a
                                                    href={soc.link}
                                                    className={styles.socLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={
                                                        ABOUT_TEAM_SOC_LABEL[
                                                            soc.mode
                                                        ]
                                                    }
                                                >
                                                    <SocIcon aria-hidden />
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : null}
                        </div>
                    </li>
                );
            })}
        </ul>
    </section>
);

export default AboutTeamSection;
