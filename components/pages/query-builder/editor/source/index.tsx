import styles from './index.module.scss';
import { forwardRef, Ref } from 'react';
import { MdLens } from 'react-icons/md';
import { SourceType, ColumnType } from 'types/query-builder';

type PropType = {
  state: SourceType;
  mouseUpOnSourcePointer: (sourceId: number, e: any) => void;
  mouseDownOnSourcePointer: (sourceId: number, e: any) => void;
  mouseDownOnSourceHeader: (source: SourceType, e: any) => void;
  handleAppendColumn: (source: SourceType, column: ColumnType) => void;
};

const Source = forwardRef((props: PropType, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      className={styles.source}
      style={{
        top: `${props.state.top}px`,
        left: `${props.state.left}px`,
      }}
    >
      <div className={styles['source__flame']}>
        {/* 実装済）リサイズ時：フラグがtrueの場合のみポインターのマウスアップ処理を実行する */}
        {/* 未実装）ソース移動時：移動ソースが先頭に来るようにする */}
        <button
          data-position='L'
          className={`${styles['source__pointer']}`}
          onMouseDown={props.mouseDownOnSourcePointer.bind(
            this,
            props.state.id
          )}
          onMouseUp={props.mouseUpOnSourcePointer.bind(this, props.state.id)}
        >
          <MdLens />
        </button>
        <div className={styles['source__content']}>
          <div
            className={styles['source__content-title']}
            onMouseDown={props.mouseDownOnSourceHeader.bind(this, props.state)}
            style={{
              width: `${props.state.list.width}px`,
            }}
          >
            {props.state.name}
          </div>
          <div
            ref={ref}
            data-source-id={props.state.id.toString()}
            className={styles['source__content-list']}
            style={{
              height: `${props.state.list.height}px`,
              width: `${props.state.list.width}px`,
            }}
          >
            {props.state.columns.map((column: ColumnType) => (
              <div
                key={column.name}
                className={styles['source__content-list-item']}
              >
                <label
                  htmlFor={`${props.state.name} ${column.name}`}
                  className={`${styles['source__content-list-item-column']}`}
                  onClick={props.handleAppendColumn
                    .bind(this, props.state)
                    .bind(this, column)}
                >
                  {column.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          data-position='R'
          className={`${styles['source__pointer']}`}
          onMouseDown={props.mouseDownOnSourcePointer.bind(
            this,
            props.state.id
          )}
          onMouseUp={props.mouseUpOnSourcePointer.bind(this, props.state.id)}
        >
          <MdLens />
        </button>
      </div>
    </div>
  );
});
Source.displayName = 'source';

export default Source;
