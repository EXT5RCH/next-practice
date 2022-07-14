import { useCallback, useEffect, useState } from 'react';
import {
  MoveSourceType,
  SourceType,
  LineType,
  ColumnType,
  ColumnSettingType,
} from 'types/query-builder';

export function useResizeObserver(callback: Function) {
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver | null>(
    null
  );

  useEffect(() => {
    reconnect();
  }, []);

  const reconnect = () => {
    if (resizeObserver !== null) resizeObserver.disconnect();
    setResizeObserver(new ResizeObserver((entries) => callback(entries)));
  };

  const observes = (refs: any) => {
    refs.forEach((v: any) => {
      resizeObserver!.unobserve(v);
      resizeObserver!.observe(v);
    });
  };

  return { resizeObserver, observes, reconnect };
}

export function useCallbackRefs() {
  const [nodes, setNodes] = useState<any>([]);
  const [callbackRefs, setCallbackRefs] = useState<any>([]);

  const initCallbackRefs = (arr: Array<any>) => {
    setNodes(arr.map((_) => null));
    setCallbackRefs(
      arr.map((_, i) => (newNode: any) => {
        if (newNode !== null) {
          nodes[i] = newNode;
          setNodes(nodes);
        }
      })
    );
  };

  const checkSetRef = () => {
    return nodes.filter((node: any) => node === null).length <= 0;
  };

  return { nodes, callbackRefs, initCallbackRefs, checkSetRef };
}

export function useSource() {
  const [sourceState, setSourceState] = useState<SourceType[]>([]);
  const [moveSource, setMoveSource] = useState<MoveSourceType | null>(null);
  const { nodes, callbackRefs, initCallbackRefs, checkSetRef } =
    useCallbackRefs();

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = () => {
    const fetchData = [
      {
        id: 1,
        name: '社員マスタ',
        columns: [
          {
            id: 'employee_id',
            name: '社員ID',
          },
          {
            id: 'employee_nm',
            name: '社員名',
          },
          {
            id: 'company_id',
            name: '会社ID',
          },
          {
            id: 'department_id',
            name: '部門ID',
          },
          {
            id: 'sex',
            name: '性別',
          },
          {
            id: 'age',
            name: '年齢',
          },
          {
            id: 'length_of_service',
            name: '勤続年数',
          },
        ],
        top: 100,
        left: 200,
        list: {
          height: 170,
          width: 200,
        },
        pointer: {
          lx: 0,
          rx: 0,
          y: 0,
        },
      },
      {
        id: 2,
        name: '会社マスタ',
        columns: [
          {
            id: 'id',
            name: '会社ID',
          },
          {
            id: 'company_name',
            name: '会社名',
          },
          {
            id: 'address1',
            name: '住所１',
          },
          {
            id: 'address2',
            name: '住所２',
          },
          {
            id: 'tel',
            name: '電話番号',
          },
          {
            id: 'fax',
            name: 'FAX',
          },
          {
            id: 'email',
            name: 'メールアドレス',
          },
          {
            id: 'scale_id',
            name: '規模ID',
          },
        ],
        top: 300,
        left: 500,
        list: {
          height: 170,
          width: 200,
        },
        pointer: {
          lx: 0,
          rx: 0,
          y: 0,
        },
      },
      {
        id: 3,
        name: '部門マスタ',
        columns: [
          {
            id: 'id',
            name: '部門ID',
          },
          {
            id: 'department_nm',
            name: '部門名',
          },
        ],
        top: 200,
        left: 800,
        list: {
          height: 80,
          width: 200,
        },
        pointer: {
          lx: 0,
          rx: 0,
          y: 0,
        },
      },
    ];
    setSourceState(fetchData);
    initCallbackRefs(fetchData);
  };

  const startMoveSource = (source: SourceType, e: any) => {
    // 移動するデータソースの初期位置情報を記録
    setMoveSource({
      id: source.id,
      startX: e.clientX,
      startY: e.clientY,
      before: {
        left: source.left,
        top: source.top,
        pointer: source.pointer,
      },
    });
  };

  const movingSource = (
    moveSource: MoveSourceType,
    moveX: number,
    moveY: number
  ) => {
    // データソースの位置情報を更新
    const beforePointer = moveSource.before.pointer;
    const newSourceState = sourceState.map((v) => {
      if (v.id === moveSource.id) {
        v.left = moveSource.before.left + moveX;
        v.top = moveSource.before.top + moveY;
        v.pointer = {
          lx: beforePointer.lx + moveX,
          rx: beforePointer.rx + moveX,
          y: beforePointer.y + moveY,
        };
      }
      return v;
    });
    setSourceState(newSourceState);
    return newSourceState;
  };

  const endMoveSource = () => {
    setMoveSource(null);
  };

  const resizeSource = (
    sourceId: number,
    listWidth: number,
    listHeight: number
  ) => {
    let beforeListHeight = 0;
    let beforeListWidth = 0;
    const newSourceState = sourceState.map((v) => {
      if (v.id === sourceId) {
        beforeListHeight = v.list.height;
        beforeListWidth = v.list.width;
        v.list.height = listHeight;
        v.list.width = listWidth;
        // 一旦目視で良さそうな定数を指定
        v.pointer.y = v.top + 13 + v.list.height / 2;
        v.pointer.lx = v.left + 8;
        v.pointer.rx = v.left + v.list.width + 26;
      }
      return v;
    });
    setSourceState(newSourceState);
    return { beforeListHeight, beforeListWidth };
  };

  return {
    sourceState,
    nodes,
    callbackRefs,
    moveSource,
    setSourceState,
    setMoveSource,
    checkSetRef,
    startMoveSource,
    movingSource,
    endMoveSource,
    resizeSource,
  };
}

export function useLine(top: number, left: number) {
  const [lineState, setLineState] = useState<LineType[]>([]);
  const [drawingLineFlg, setDrawingLineFlg] = useState<boolean>(false);

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = () => {
    const fetchData = [] as LineType[];
    setLineState(fetchData);
  };

  const getEndPointCenterPosition = (e: any) => {
    const currentTarget = e.currentTarget;
    const clientRect = currentTarget.getBoundingClientRect();
    const position = currentTarget.getAttribute('data-position');
    const x = clientRect.left + clientRect.width / 2 - left;
    const y = clientRect.top + clientRect.height / 2 - top;
    return { position, x, y };
  };

  const startDrawLine = (sourceId: number, e: any) => {
    const { position, x, y } = getEndPointCenterPosition(e);
    const newLine = {
      start: { sourceId, position, x, y },
      end: { sourceId: null, position, x, y },
    };
    setDrawingLineFlg(true);
    setLineState(lineState.concat([newLine]));
  };

  const drawingLine = (e: any) => {
    const newLine = lineState.slice(-1)[0];
    newLine.end.x = e.clientX - left;
    newLine.end.y = e.clientY - top;
    setLineState(
      lineState.map((v, i) => (i === lineState.length - 1 ? newLine : v))
    );
  };

  const endDrawLine = (sourceId: number, e: any) => {
    // リサイズ時にソース上のポインターでマウスアップした際、呼ばれないようにするため
    if (drawingLineFlg) {
      const { position, x, y } = getEndPointCenterPosition(e);
      const newLine = lineState.slice(-1)[0];
      newLine.end = { sourceId, position, x, y };
      if (!checkDrawLine(newLine)) return;
      setLineState(
        lineState.map((v, i) => (i === lineState.length - 1 ? newLine : v))
      );
      setDrawingLineFlg(false);
    }
    e.stopPropagation();
  };

  const checkDrawLine = (newLine: LineType) => {
    // 同じソース内の結合は出来ないように設定
    // 自己結合する場合は別途ソースを追加してもらう
    if (newLine.start.sourceId === newLine.end.sourceId) {
      setDrawingLineFlg(false);
      return false;
    }

    // 始点と終点が同じソースへの複数結合が許可しない
    let check = lineState.filter(
      (v) =>
        v.start.sourceId === newLine.start.sourceId &&
        v.end.sourceId === newLine.end.sourceId
    );
    if (check.length > 1) {
      setDrawingLineFlg(false);
      return false;
    }

    // 始点と終点が逆の結合が既に作られている場合も許可しない
    check = lineState.filter(
      (v) =>
        v.start.sourceId === newLine.end.sourceId &&
        v.end.sourceId === newLine.start.sourceId
    );
    if (check.length > 0) {
      setDrawingLineFlg(false);
      return false;
    }
    return true;
  };

  const startMoveLines = (sourceId: number) => {
    // 移動するラインの初期位置情報を記録
    const changedLines = lineState.map((v) => {
      if (v.start.sourceId === sourceId) {
        v.before = { start: { x: v.start.x, y: v.start.y } };
      } else if (v.end.sourceId === sourceId) {
        v.before = { end: { x: v.end.x, y: v.end.y } };
      }
      return v;
    });
    setLineState(changedLines);
  };

  const movingLines = (sourceId: number, newSourceState: SourceType[]) => {
    // ラインの位置情報を更新
    const changedLines = lineState.map((v) => {
      if (v.start.sourceId === sourceId || v.end.sourceId === sourceId) {
        const startSource = newSourceState.filter(
          (w) => w.id === v.start.sourceId
        )[0];
        const endSource = newSourceState.filter(
          (w) => w.id === v.end.sourceId
        )[0];
        if (startSource.pointer.lx < endSource.pointer.lx) {
          v.start.position = 'R';
          v.start.x = startSource.pointer.rx;
          v.end.position = 'L';
          v.end.x = endSource.pointer.lx;
        } else {
          v.start.position = 'L';
          v.start.x = startSource.pointer.lx;
          v.end.position = 'R';
          v.end.x = endSource.pointer.rx;
        }
        v.start.y = startSource.pointer.y;
        v.end.y = endSource.pointer.y;
      }
      return v;
    });
    setLineState(changedLines);
  };

  const endMoveLines = () => {
    lineState.pop();
    setDrawingLineFlg(false);
  };

  const resizeLines = (sourceId: number, xDiff: number, yDiff: number) => {
    const newLineState = lineState.map((v) => {
      if (v.start.sourceId === sourceId && v.start.position === 'L') {
        v.start.y += yDiff;
      } else if (v.start.sourceId === sourceId && v.start.position === 'R') {
        v.start.y += yDiff;
        v.start.x += xDiff;
      } else if (v.end.sourceId === sourceId && v.end.position === 'L') {
        v.end.y += yDiff;
      } else if (v.end.sourceId === sourceId && v.end.position === 'R') {
        v.end.y += yDiff;
        v.end.x += xDiff;
      }
      return v;
    });
    setLineState(newLineState);
  };

  return {
    lineState,
    setLineState,
    drawingLineFlg,
    setDrawingLineFlg,
    startDrawLine,
    drawingLine,
    endDrawLine,
    startMoveLines,
    movingLines,
    endMoveLines,
    resizeLines,
  };
}

export function useQueryBuilder() {
  const {
    sourceState,
    nodes,
    callbackRefs,
    checkSetRef,
    moveSource,
    startMoveSource,
    movingSource,
    endMoveSource,
    resizeSource,
  } = useSource();
  const {
    lineState,
    drawingLineFlg,
    startDrawLine,
    drawingLine,
    endDrawLine,
    startMoveLines,
    movingLines,
    endMoveLines,
    resizeLines,
  } = useLine(72, 48);
  const [backupSourceCountState, setBackupSourceCountState] =
    useState<number>(0);
  const [backupLineCountState, setBackupLineCountState] = useState<number>(0);

  const resizeObject = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      const sourceId = Number(entry.target.getAttribute('data-source-id'));
      const listWidth = entry.borderBoxSize[0].inlineSize;
      const listHeight = entry.borderBoxSize[0].blockSize;
      const { beforeListHeight, beforeListWidth } = resizeSource(
        sourceId,
        listWidth,
        listHeight
      );
      resizeLines(
        sourceId,
        listWidth - beforeListWidth,
        (listHeight - beforeListHeight) / 2
      );
    });
  };

  const { resizeObserver, observes, reconnect } =
    useResizeObserver(resizeObject);

  useEffect(() => {
    if (!checkSetRef()) return;
    observes(nodes);
  }, [resizeObserver]);

  useEffect(() => {
    if (!checkSetRef()) return;
    if (
      sourceState.length === backupSourceCountState &&
      lineState.length === backupLineCountState
    ) {
      return;
    }
    setBackupSourceCountState(sourceState.length);
    setBackupLineCountState(lineState.length);
    reconnect();
  }, [sourceState, drawingLineFlg, nodes]);

  const mouseMove = (e: any) => {
    if (drawingLineFlg) {
      drawingLine(e);
    } else if (moveSource) {
      const moveX = e.clientX - moveSource.startX;
      const moveY = e.clientY - moveSource.startY;
      const newSourceState = movingSource(moveSource, moveX, moveY);
      movingLines(moveSource.id, newSourceState);
      e.stopPropagation();
    }
  };

  const mouseUp = (e: any) => {
    if (drawingLineFlg) {
      endMoveLines();
    } else if (moveSource) {
      endMoveSource();
      e.stopPropagation();
    }
  };

  const mouseDownOnSourcePointer = (sourceId: number, e: any) => {
    startDrawLine(sourceId, e);
  };

  const mouseUpOnSourcePointer = (sourceId: number, e: any) => {
    endDrawLine(sourceId, e);
  };

  const mouseDownOnSourceHeader = (source: SourceType, e: any) => {
    startMoveSource(source, e);
    startMoveLines(source.id);
    e.stopPropagation();
  };

  return {
    sourceState,
    callbackRefs,
    lineState,
    drawingLineFlg,
    mouseMove,
    mouseUp,
    mouseDownOnSourceHeader,
    mouseDownOnSourcePointer,
    mouseUpOnSourcePointer,
  };
}

export function useColumnSetting() {
  const [columnSettingState, setColumnSettingState] = useState<
    ColumnSettingType[]
  >([]);

  useEffect(() => {
    fetchQuerySelect();
  }, []);

  const fetchQuerySelect = () => {
    const fetchData = [] as ColumnSettingType[];
    setColumnSettingState(fetchData);
  };

  const handleAppendColumn = (source: SourceType, column: ColumnType) => {
    const newColumnSettingState = columnSettingState.concat([
      {
        sourceId: source.id,
        sourceName: source.name,
        columnId: column.id,
        columnName: column.name,
        displayName: column.name,
        width: 200,
        order: '',
        methodOrGroupBy: '',
        where: [],
        display: true,
      },
    ]);
    setColumnSettingState(newColumnSettingState);
  };

  const handleChangeDisplayName = useCallback(
    (index: number, e: any) => {
      setColumnSettingState(
        columnSettingState.map((v, i) => {
          if (i === index) v.displayName = e.target.value;
          return v;
        })
      );
    },
    [columnSettingState]
  );

  const handleChangeGroupBy = useCallback(
    (index: number, e: any) => {
      if (e.target.value === 'group by') {
        setColumnSettingState(
          columnSettingState.map((v, i) => {
            if (i === index || v.methodOrGroupBy === '') {
              v.methodOrGroupBy = e.target.value;
            }
            return v;
          })
        );
      } else {
        setColumnSettingState(
          columnSettingState.map((v, i) => {
            if (i === index) v.methodOrGroupBy = e.target.value;
            return v;
          })
        );
      }
    },
    [columnSettingState]
  );

  const handleChangeOrder = useCallback(
    (index: number, e: any) => {
      setColumnSettingState(
        columnSettingState.map((v, i) => {
          if (i === index) v.order = e.target.value;
          return v;
        })
      );
    },
    [columnSettingState]
  );

  const handleChangeDisplay = useCallback(
    (index: number, e: any) => {
      setColumnSettingState(
        columnSettingState.map((v, i) => {
          if (i === index) v.display = e.target.checked;
          return v;
        })
      );
    },
    [columnSettingState]
  );

  const handleDeleteSource = useCallback(
    (index: number, _e: any) => {
      setColumnSettingState(columnSettingState.filter((_, i) => i !== index));
    },
    [columnSettingState]
  );

  return {
    columnSettingState,
    handleAppendColumn,
    handleChangeDisplayName,
    handleChangeGroupBy,
    handleChangeOrder,
    handleChangeDisplay,
    handleDeleteSource,
  };
}

export function useWhere() {
  const [whereOpen, setWhereOpen] = useState<string>('');

  const handleClickOpenWhere = () => {
    setWhereOpen('fadeIn');
  };

  const handleClickCloseWhere = useCallback(() => {
    setWhereOpen('fadeOut');
  }, [setWhereOpen]);

  return { whereOpen, handleClickOpenWhere, handleClickCloseWhere };
}
