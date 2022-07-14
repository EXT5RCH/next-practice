import type { NextPage } from 'next';
import styles from './index.module.scss';
import Header from 'components/uiParts/header';
import SideMenu from 'components/uiParts/side-menu';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <SideMenu />
        <main className={styles.layout__main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
