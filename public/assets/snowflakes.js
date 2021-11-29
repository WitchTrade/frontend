setTimeout(() => {
  snowfall.start({
    bg: "#00000000",
    primary: "#8d90b7",
    secondary: "#ffffff",
    density: 200,
    wave: {
      frequency: 0.010,
      amplitude: 0.16
    },
    gravity: {
      angle: 90,
      strength: 0.05
    },
    wind: {
      angle: 0,
      strength: 0
    }
  });
}, 50);
