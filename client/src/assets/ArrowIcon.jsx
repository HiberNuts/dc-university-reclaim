export const ArrowIcon = ({ color, width, height, styles }) => {
  return (
    <div className={styles}>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 32 32"
        id="Downarrow"
        className="-rotate-90"
      >
        <path
          d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z"
          fill={color}
          class="colorffffff svgShape"
        ></path>
      </svg>
    </div>
  );
};
