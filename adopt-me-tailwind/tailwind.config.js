module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // eslint-disable-next-line
      backgroundColor: {
        darkblue: '#00008B',
        peru: '#CD853F',
        chartreuse: '#7FFF00',
        mediumorchid: '#BA55D3',
      },
      backgroundImage: {
        colored: 'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)',
        bw: 'url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg)',
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
