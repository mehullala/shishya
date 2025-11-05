function OnTeXViewRenderedCallback() {
  // Ensure TeX content exists before marking complete
  const texNodes = document.querySelectorAll(".tex-view, .katex, .MathJax");
  if (texNodes.length > 0) {
    console.log("TeX rendering completed ✅");
    window.flutter_inappwebview?.callHandler?.("OnTeXRendered", true);
    return true;
  }

  console.warn("TeX not ready yet, retrying...");
  return false;
}

function initTeXViewWeb() {
  try {
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
      MathJax.Hub.Queue(() => {
        MathJax.Hub.Typeset();
      });
    }

    // Delay callback so DOM has time to settle
    setTimeout(() => {
      OnTeXViewRenderedCallback();
    }, 100);
    
  } catch (e) {
    console.error("TeX render error:", e);
  }
}
