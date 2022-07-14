import { Layout } from 'components/uiParts';
import ColumnSetting from './column-setting';
import ModalWhere from './modal-where';
import Editor from './editor';
import Menu from './menu';
import styles from './index.module.scss';
import { useColumnSetting, useQueryBuilder, useWhere } from './hooks';

const QueryBuilder = () => {
  const {
    sourceState,
    callbackRefs,
    lineState,
    drawingLineFlg,
    mouseMove,
    mouseUp,
    mouseDownOnSourceHeader,
    mouseDownOnSourcePointer,
    mouseUpOnSourcePointer,
  } = useQueryBuilder();
  const {
    columnSettingState,
    handleAppendColumn,
    handleChangeDisplayName,
    handleChangeGroupBy,
    handleChangeOrder,
    handleChangeDisplay,
    handleDeleteSource,
  } = useColumnSetting();
  const { whereOpen, handleClickOpenWhere, handleClickCloseWhere } = useWhere();

  return (
    <Layout>
      <div
        className={styles['query-builder']}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      >
        <div className={styles.content}>
          <Menu handleClickOpenWhere={handleClickOpenWhere} />
          <Editor
            sources={sourceState}
            callbackRefs={callbackRefs}
            mouseUpOnSourcePointer={mouseUpOnSourcePointer}
            mouseDownOnSourcePointer={mouseDownOnSourcePointer}
            mouseDownOnSourceHeader={mouseDownOnSourceHeader}
            handleAppendColumn={handleAppendColumn}
            lines={lineState}
            openLineSettingIcon={!drawingLineFlg}
          />
          <ColumnSetting
            columns={columnSettingState}
            handleChangeDisplayName={handleChangeDisplayName}
            handleChangeGroupBy={handleChangeGroupBy}
            handleChangeOrder={handleChangeOrder}
            handleChangeDisplay={handleChangeDisplay}
            handleDeleteSource={handleDeleteSource}
          />
        </div>
      </div>
      <ModalWhere
        title='検索条件の設定'
        fade={whereOpen}
        funcClose={handleClickCloseWhere}
      />
    </Layout>
  );
};

export default QueryBuilder;
