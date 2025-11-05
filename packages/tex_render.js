function initTeXViewWeb() {
  if (typeof renderMathInElement !== "undefined") {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false}
      ]
    });
  } else if (typeof MathJax !== "undefined") {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.body]);
  }
}

function OnTeXViewRenderedCallback() {
  console.log("TeX rendered");
}
