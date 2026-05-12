/** Category accent colors (legacy card gradients); used for badges on white tiles. */
export const categoryAccentHex: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "#4338ca",
  2: "#6ED56C",
  3: "#FB8DDB",
  4: "#F1BD60",
  5: "#FF623E",
};
export const categoryCardStyle = {
  light: {
    1: {
      background: "linear-gradient(#4338ca, #FFFFFF)",
      border: "1px solid #4338ca",
    },
    2: {
      background: "linear-gradient(#6ED56C, #FFFFFF)",
      border: "1px solid #6ED56C",
    },
    3: {
      background: "linear-gradient(#FB8DDB, #FFFFFF)",
      border: "1px solid #FB8DDB",
    },
    4: {
      background: "linear-gradient(#F1BD60, #FFFFFF)",
      border: "1px solid #F1BD60",
    },
    5: {
      background: "linear-gradient(#FF623E, #FFFFFF)",
      border: "1px solid #FF623E",
    },
  },
  dark: {
    1: {
      background: "linear-gradient(#4338ca, #312e81)",
      border: "1px solid #4338ca",
    },
    2: {
      background: "linear-gradient(#6ED56C, #286526)",
      border: "1px solid #6ED56C",
    },
    3: {
      background: "linear-gradient(#FB8DDB, #8F3676)",
      border: "1px solid #FB8DDB",
    },
    4: {
      background: "linear-gradient(#F1BD60, #5F4E32)",
      border: "1px solid #F1BD60",
    },
    5: {
      background: "linear-gradient(#FF623E, #90311D)",
      border: "1px solid #FF623E",
    },
  },
} as const;
