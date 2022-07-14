import Source from './source';
import Line from './line';
import styles from './index.module.scss';
import { Ref } from 'react';
import { SourceType, ColumnType, LineType } from 'types/query-builder';

type PropType = {
  sources: SourceType[];
  callbackRefs: Ref<HTMLDivElement>[];
  mouseUpOnSourcePointer: (sourceId: number, e: any) => void;
  mouseDownOnSourcePointer: (sourceId: number, e: any) => void;
  mouseDownOnSourceHeader: (source: SourceType, e: any) => void;
  handleAppendColumn: (source: SourceType, column: ColumnType) => void;
  lines: LineType[];
  openLineSettingIcon: boolean;
};

const Editor = (props: PropType) => {
  return (
    <div className={styles.editor}>
      <div className={styles.builder}>
        {props.sources.map((v, i) => (
          <Source
            key={v.id}
            ref={props.callbackRefs[i]}
            state={v}
            mouseDownOnSourceHeader={props.mouseDownOnSourceHeader}
            mouseDownOnSourcePointer={props.mouseDownOnSourcePointer}
            mouseUpOnSourcePointer={props.mouseUpOnSourcePointer}
            handleAppendColumn={props.handleAppendColumn}
          />
        ))}
        {props.lines.map((v, i) => (
          <Line
            key={i}
            value={v}
            openLineSettingIcon={props.openLineSettingIcon}
            func={() => alert('結合条件設定モーダルを表示する')}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;
