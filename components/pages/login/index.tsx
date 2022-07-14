import Link from 'next/link';
import Router from 'next/router';
import styles from './index.module.scss';

const handleClick = (path: string) => {
  Router.push(path);
};

const Login = () => {
  return (
    <>
      <div className={styles.login}>
        <div className={styles['login__content']}>
          <h1 className={styles['login__content-title']}>ログイン</h1>
          <strong>ここではページ遷移のやり方を確認しています。</strong>
          <div className={styles['login__content-body']}>
            <div className={styles['login__content-pattern-link']}>
              <span>1. リンクの場合</span>
              <div>
                <Link href='/query-builder'>
                  <a className={styles['login__content-pattern-button-text']}>
                    クエリビルダーへ遷移
                  </a>
                </Link>
              </div>
            </div>
            <div className={styles['login__content-pattern-button']}>
              <span>2. ボタンの場合</span>
              <div>
                <button onClick={() => handleClick('/query-builder')}>
                  クエリビルダーへ遷移
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
