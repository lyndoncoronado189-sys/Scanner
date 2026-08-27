/*
 * template.js  -  Shared answer-sheet geometry.
 *
 * BOTH answer-sheet.html (the printable sheet) and index.html (the reader)
 * load this file. Every bubble position is defined ONCE here, as a fraction
 * of the rectangle whose corners are the 4 black corner markers.
 *
 * That is why the printed sheet and the scanner agree: they read the same
 * coordinates. If you ever change the layout, change it here only.
 *
 * Coordinate system:
 *   (0,0) = centre of the TOP-LEFT marker
 *   (1,0) = centre of the TOP-RIGHT marker
 *   (1,1) = centre of the BOTTOM-RIGHT marker
 *   (0,1) = centre of the BOTTOM-LEFT marker
 *   x grows right, y grows down. All values are fractions in [0,1].
 */
(function (global) {
  var CHOICES = ["A", "B", "C", "D"];
  var COLUMNS = 4;          // 4 columns of questions across the page
  var ROWS = 25;            // 25 questions per column  ->  100 total
  var QUESTIONS = COLUMNS * ROWS;

  // Vertical placement of the question rows (below the name/header band).
  var Y_TOP = 0.150;        // centre-y of the first row
  var ROW_H = 0.0334;       // centre-to-centre spacing between rows

  // Horizontal placement inside each column.
  var COL_W = 0.25;                       // each column is 1/4 of the width
  var NUM_X = 0.028;                       // x of the question number label
  var BUBBLE_X = [0.085, 0.125, 0.165, 0.205]; // x of bubbles A,B,C,D in a column

  // Bubble size, as a fraction of the marker-rectangle WIDTH.
  var BUBBLE_DIAM = 0.022;

  // Returns [{q, choice, x, y}] for all 400 bubbles.
  // Question order: column 0 = Q1..25, column 1 = Q26..50, etc.
  function bubbles() {
    var out = [];
    for (var q = 0; q < QUESTIONS; q++) {
      var c = Math.floor(q / ROWS);
      var r = q % ROWS;
      var y = Y_TOP + (r + 0.5) * ROW_H;
      for (var ch = 0; ch < CHOICES.length; ch++) {
        out.push({
          q: q,                       // 0-based question index
          choice: ch,                 // 0..3  ->  A..D
          x: c * COL_W + BUBBLE_X[ch],
          y: y
        });
      }
    }
    return out;
  }

  // Position of the question-number label for question index q (0-based).
  function numberPos(q) {
    var c = Math.floor(q / ROWS);
    var r = q % ROWS;
    return { x: c * COL_W + NUM_X, y: Y_TOP + (r + 0.5) * ROW_H };
  }

  global.TEMPLATE = {
    CHOICES: CHOICES,
    COLUMNS: COLUMNS,
    ROWS: ROWS,
    QUESTIONS: QUESTIONS,
    Y_TOP: Y_TOP,
    ROW_H: ROW_H,
    COL_W: COL_W,
    NUM_X: NUM_X,
    BUBBLE_X: BUBBLE_X,
    BUBBLE_DIAM: BUBBLE_DIAM,
    bubbles: bubbles,
    numberPos: numberPos
  };
})(typeof window !== "undefined" ? window : this);
