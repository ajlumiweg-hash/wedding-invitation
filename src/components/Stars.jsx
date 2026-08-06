function Stars() {
  const stars = Array.from({ length: 80 }, (_, index) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 3 + Math.random() * 5;

    return (
      <span
        key={index}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return <div className="stars">{stars}</div>;
}

export default Stars;