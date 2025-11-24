import { FC, memo } from 'react';
import styles from './feed-info.module.css';
import { FeedInfoUIProps } from './type';

export const FeedInfoUI: FC<FeedInfoUIProps> = memo(
  ({ readyOrders, pendingOrders, feed }) => (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3 className='text text_type_main-medium mb-4'>Готовы:</h3>
          <ul className={styles.list}>
            {readyOrders.map((num) => (
              <li key={num} className='text text_type_digits-default'>
                {num}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className='text text_type_main-medium mb-4'>В работе:</h3>
          <ul className={styles.list}>
            {pendingOrders.map((num) => (
              <li key={num} className='text text_type_digits-default'>
                {num}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.total}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{feed.total}</p>
      </div>

      <div className={styles.total}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{feed.totalToday}</p>
      </div>
    </div>
  )
);
