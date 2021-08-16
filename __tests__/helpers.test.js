// Define variables to use as helpers
const { format_date, format_plural } = require("../utils/helpers");


test("format_plural() returns a pluralized word", () => {
  const word1 = format_plural("cat", 1);
  const word2 = format_plural("dog", 2);

  expect(word1).toBe("cat");
  expect(word2).toBe("dogs");
});
test("format_date() returns a date string", () => {
  const date = new Date("2021-08-3 16:12:03");

  expect(format_date(date)).toBe("8/3/2021");
});
