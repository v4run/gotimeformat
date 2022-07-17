import * as assert from "assert";
import * as extension from "../src/extension";

// Defines a Mocha test suite to group tests of similar kind together
suite("generateLayout Test", () => {
  const testCases = [
    { in: "YYYY", want: "2006" },
    { in: "YY", want: "06" },
    { in: "MMMM", want: "January" },
    { in: "MMM", want: "Jan" },
    { in: "MM", want: "01" },
    { in: "M", want: "1" },
    { in: "DD", want: "02" },
    { in: "D", want: "2" },
    { in: "hh", want: "03" },
    { in: "HH", want: "15" },
    { in: "h", want: "3" },
    { in: "wwww", want: "Monday" },
    { in: "www", want: "Mon" },
    { in: "mm", want: "04" },
    { in: "m", want: "4" },
    { in: "ss", want: "05" },
    { in: "s", want: "5" },
    { in: "f", want: "0" },
    { in: "F", want: "9" },
    { in: "a", want: "pm" },
    { in: "A", want: "PM" },
    { in: "z", want: "MST" },
    { in: "-Z:Z:Z", want: "-07:00:00" },
    { in: "Z:Z:Z", want: "Z07:00:00" },
    { in: "-Z:Z", want: "-07:00" },
    { in: "Z:Z", want: "Z07:00" },
    { in: "-ZZZ", want: "-070000" },
    { in: "ZZZ", want: "Z070000" },
    { in: "-ZZ", want: "-0700" },
    { in: "ZZ", want: "Z0700" },
    { in: "-Z", want: "-07" },
    { in: "Z", want: "Z07" },
    { in: "zZZ", want: "MSTZ0700" },
    { in: "DD-MM-YYYY hh:mm:ss aZZ", want: "02-01-2006 03:04:05 pmZ0700" },
    { in: "DD-MM-YYYY hh:mm:ss az", want: "02-01-2006 03:04:05 pmMST" },
    { in: "wwww, MMMM DD YYYY", want: "Monday, January 02 2006" },
    { in: "ww ww, MMMM DD YYYY", want: "ww ww, January 02 2006" },
    { in: "YY YYYY YY-YY-YYY-YYYY-YY", want: "06 2006 06-06-06Y-2006-06" },
    { in: "hh:mm:ss.ffff", want: "03:04:05.0000" },
    { in: "hh:mm:ss.FFFF", want: "03:04:05.9999" },
    { in: "-Z:ZZZ", want: "-07:00Z0700" },
    { in: "hh:mm a", want: "03:04 pm" },
    {
      in: "www MMM D HH:mm:ss -ZZ z YYYY",
      want: "Mon Jan 2 15:04:05 -0700 MST 2006",
    },
  ];

  // Defines a Mocha unit test
  test("Equality Test", () => {
    testCases.forEach((c) => {
      assert.equal(c.want, extension.generateLayout(c.in));
    });
  });
});
