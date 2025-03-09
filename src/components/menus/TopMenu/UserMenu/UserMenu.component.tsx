import { FC, useMemo } from 'react';
import { usersApi } from '@/api/users/users';
import Img from '@/components/elems/Img/Img.component';
import { getUserMenu } from '@/components/menus/TopMenu/UserMenu/UserMenu.config';
import styles from '@/components/menus/TopMenu/UserMenu/UserMenu.module.scss';
import { UserIF } from '@/types/user';

const UserMenu: FC = () => {
    // const [, { data: userData }] = usersApi.useGetUserDataMutation();

    // const userMenu = useMemo(() => {
    //     return getUserMenu(userData);
    // }, [userData]);

    return (
        <div className={styles.userMenuWrapper}>
            <button type="button">
                {/*<Img url={userData?.avatarUrl} />*/}
            </button>
            <ul>
                {/*{userMenu.map(({ label, icon, callBackType, url }) => {*/}
                {/*    return callBackType ? (*/}
                {/*        <li>{callBackType}</li>*/}
                {/*    ) : (*/}
                {/*        <li key={`${url}${callBackType}`} className="asd">*/}
                {/*            {label}*/}
                {/*        </li>*/}
                {/*    );*/}
                {/*})}*/}
            </ul>
        </div>
    );
};

export default UserMenu;
