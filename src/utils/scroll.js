import jump from "jump.js";

const pageIDs = [
  "#home-page",
  "#question-page-1",
  "#vis-page-1",
  "#question-page-2",
  "#vis-page-2",
  "#question-page-3",
  "#vis-page-3",
  "#question-page-4",
  "#vis-page-4",
  "#question-page-5",
  "#vis-page-5",
  "#conclusion-page"
];

let i = 0;

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode === 38) {
    // up arrow
    i--;
    i %= pageIDs.length;
    jump(pageIDs[i]);
  } else if (e.keyCode === 40) {
    // down arrow
    console.log(e.keyCode);
    i++;
    i %= pageIDs.length;
    jump(pageIDs[i]);
  } else if (e.keyCode === 37) {
    // left arrow
    i--;
    i %= pageIDs.length;
    jump(pageIDs[i]);
  } else if (e.keyCode === 39) {
    // right arrow
    i++;
    i %= pageIDs.length;
    jump(pageIDs[i]);
  }
}
