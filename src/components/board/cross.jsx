function Cross(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        stroke=" #ee991a"
        fill="none"
        strokeLinecap="round"
        {...props}
      >
        <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" strokeWidth="4" />
        <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" strokeWidth="4" />
      </svg>
    );
  }
  
  export default Cross;