const initialState = {
  palette1: {
    color1: { hex: 'ff0000' },
    color2: { hex: '00ff00' },
    color3: { hex: '0000ff' },
    color4: { hex: 'ffff00' },
    color5: { hex: '00ffff' },
  },
  palette2: {
    color1: { hex: 'ffcccc' },
    color2: { hex: '1cffc1' },
    color3: { hex: 'eec5ff' },
    color4: { hex: 'fff550' },
    color5: { hex: '00f555' },
  },
  palette3: {
    color1: { hex: 'dddd00' },
    color2: { hex: '00ffdd' },
    color3: { hex: '00ddff' },
    color4: { hex: 'ffcc00' },
    color5: { hex: '0dffff' },
  },
};

export default {
  state: { ...initialState },
};
