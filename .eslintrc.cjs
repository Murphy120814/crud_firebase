module.exports = {
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "max-len": [2, 250],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    "object-curly-newline": 0,
    "react/prop-types": 0,

    eqeqeq: 0,

    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
  },
};
