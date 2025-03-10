import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import styles from '@/templates/ProfileTPL/ProfileTPL.module.scss';
import { ProfileTPLPropsIF } from '@/templates/ProfileTPL/ProfileTPL.types';

const ProfileTPL: FC<ProfileTPLPropsIF> = ({ data }) => {
    return (
        <CommonLayout>
            <Content className={styles.ProfileTPLWrapper}>Profile</Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default ProfileTPL;
