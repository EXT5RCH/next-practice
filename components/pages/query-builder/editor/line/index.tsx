import { LineType } from 'types/query-builder';
import { MdAddCircle } from 'react-icons/md';
import styles from './index.module.scss';

type PropType = {
  value: LineType;
  openLineSettingIcon: boolean;
  func?: () => void;
};

const Line = (props: PropType) => {
  const xDiff = props.value.end.x - props.value.start.x;
  const yDiff = props.value.end.y - props.value.start.y;
  const width = Math.abs(xDiff);
  const height = Math.abs(yDiff);
  const length = Math.sqrt(width * width + height * height);
  const scale = length / 100;
  const svgHeight = 20;
  const svgWidth = 0;
  const rotatePointY = svgHeight / 2;
  const rotatePointX = svgWidth / 2;

  return (
    <div className={styles.line}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={`${length}px`}
        height={svgHeight}
        style={{
          left: `${props.value.start.x - rotatePointX}px`,
          top: `${props.value.start.y - rotatePointY}px`,
          transformOrigin: `${rotatePointX}px ${rotatePointY}px`,
          transform: `rotate(${Math.atan2(yDiff, xDiff)}rad)`,
        }}
      >
        <path
          d={`M 0 ${rotatePointY} L 100 ${rotatePointY}`}
          stroke='black'
          fillOpacity='0'
          transform={`scale(${scale}, 1)`}
        />
      </svg>
      {props.openLineSettingIcon && (
        <button
          style={{
            left: `${props.value.start.x - rotatePointX + xDiff / 2}px`,
            top: `${props.value.start.y - rotatePointY + yDiff / 2}px`,
            transformOrigin: `${rotatePointX}px ${rotatePointY}px`,
            transform: `rotate(${Math.atan2(yDiff, xDiff)}rad)`,
          }}
          onClick={props.func}
        >
          <MdAddCircle className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default Line;
