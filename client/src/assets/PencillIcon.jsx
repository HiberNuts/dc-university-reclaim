export const PencilIcon = ({ color, width, height, styles }) => {
  return (
    <div className={styles}>
      <svg
        height={height}
        width={width}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <g>
          <path
            d="M3.952,23.15L0,31.955l8.767-3.992l0.018,0.019L3.938,23.13L3.952,23.15z M4.602,22.463L24.634,2.432l4.849,4.848
		L9.45,27.312L4.602,22.463z M30.883,0.941c-2.104-1.963-4.488-0.156-4.488-0.156l4.851,4.843
		C31.244,5.627,33.124,3.375,30.883,0.941z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};
