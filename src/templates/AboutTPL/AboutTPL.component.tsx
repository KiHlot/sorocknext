import { FC } from 'react';
import { Content } from '@/layouts/CommonLayout/CommonLayout.component';
import AboutHistorySection from '@/components/sections/AboutHistorySection/AboutHistorySection.component';
import AboutPartnersSection from '@/components/sections/AboutPartnersSection/AboutPartnersSection.component';
import AboutPromoSection from '@/components/sections/AboutPromoSection/AboutPromoSection.component';
import AboutTeamSection from '@/components/sections/AboutTeamSection/AboutTeamSection.component';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection/WhoWeAreSection.component';
import { ABOUT_PAGE_MOCK } from '@/templates/AboutTPL/AboutTPL.mock';

const AboutTPL: FC = () => (
    <Content>
        <AboutPromoSection data={ABOUT_PAGE_MOCK.promo} />
        <AboutHistorySection
            history={ABOUT_PAGE_MOCK.history}
            facts={ABOUT_PAGE_MOCK.facts}
        />
        <AboutTeamSection members={ABOUT_PAGE_MOCK.team} />
        <AboutPartnersSection data={ABOUT_PAGE_MOCK.partners} />
        <WhoWeAreSection />
    </Content>
);

export default AboutTPL;
