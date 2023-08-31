const flexDirectionc = document.querySelectorAll(".flex-direction");
const flexWrap = document.querySelectorAll(".flex-wrap");
const justifyContent = document.querySelectorAll(".justify-content");
const alignItems = document.querySelectorAll(".align-items");
const preview = document.querySelector(".preview");

const spanDel = document.querySelectorAll(".delete");

const textInput = document.querySelector("#text-input");
const textInputAddButtom = document.querySelector("#add");

const textInputRestButtom = document.querySelector("#rest");
const boxes2 = document.querySelectorAll(".box");
const blur = document.querySelector(".blur");
const yesOrNoBtnComfirm = document.querySelector("comfirm-delete-y-n");

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;



asideBar();
toggleTheColors();
deletBox();
insertNewBox();
editing();

function toggleTheColors() {
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark-theme');
});
}


function asideBar() {
  flexDirectionc.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const valueBtn = e.target.value;
      preview.style.flexDirection = valueBtn;

      flexDirectionc.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });

  flexWrap.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const valueBtn = e.target.value;
      preview.style.flexWrap = valueBtn;

      flexWrap.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });

  justifyContent.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const valueBtn = e.target.value;
      preview.style.justifyContent = valueBtn;

      justifyContent.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });

  alignItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const valueBtn = e.target.value;
      preview.style.alignItems = valueBtn;

      alignItems.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });
}

let boxes = [];

function insertNewBox() {
  textInputAddButtom.addEventListener("click", () => {
    if (boxes.length > 20) {
      alert("até onde você vai com isso ? :)");
      return;
    }
    const creatBox = document.createElement("div");
    const creatSpanDel = document.createElement("span");

    creatSpanDel.classList.add("delete");
    creatBox.classList.add("box");
    creatBox.textContent = textInput.value.trim();
    creatSpanDel.textContent = "x";

    creatBox.appendChild(creatSpanDel);
    preview.appendChild(creatBox);

    boxes.push(creatBox);

    textInput.value = "";
    textInput.focus();
  });
}

function deletBox() {
  preview.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const boxParent = e.target.closest(".box");
      if (boxParent) {
        boxParent.remove();
        boxes.pop();
      }
    }
  });

  textInputRestButtom.addEventListener("click", () => {
    blur.style.display = "flex";
  });

  blur.addEventListener("click", (e) => {
    const el = e.target;

    if (el.value == "true") {
      boxes.forEach((box) => {
        box.remove();
      });
      boxes2.forEach((box) => {
        box.remove();
      });
      blur.style.display = "none";
      boxes = [];
    }

    if (el.value == "false") {
      blur.style.display = "none";
    }
  });
}

function editing() {
  preview.addEventListener("click", (event) => {
    if (event.target.classList.contains("box")) {
      if (event.target.classList.contains("editing")) {
        event.target.classList.remove("editing");
      } else {
        event.target.classList.add("editing");
      }
    }
  });
}

//====================  Width / Min-Height / Gap ==============================

class previewControllerInputs {
  constructor(
    previewWidth,
    showWidthPx,
    previewHeight,
    showHeightPx,
    previewGap,
    showGapPx
  ) {
    this.previewWidth = previewWidth;
    this.showWidthPx = showWidthPx;
    this.previewHeight = previewHeight;
    this.showHeightPx = showHeightPx;
    this.previewGap = previewGap;
    this.showGapPx = showGapPx;
  }

  initialize() {
    this.showWidthPx.textContent = this.previewWidth.value;
    this.showHeightPx.textContent = this.previewHeight.value;
    this.showGapPx.textContent = this.previewGap.value;

    this.applyRule();
    this.showRule();
  }

  applyRule() {
    preview.style.width = `${this.previewWidth.value}%`;
    preview.style.minHeight = `${this.previewHeight.value}px`;
    preview.style.gap = `${this.previewGap.value}px`;
  }

  showRule() {
    this.showWidthPx.textContent = this.previewWidth.value;
    this.showHeightPx.textContent = this.previewHeight.value;
    this.showGapPx.textContent = this.previewGap.value;
  }

  updateValue(type, value) {
    switch (type) {
      case "previewWidth":
        this.showWidthPx.textContent = value;
        break;
      case "previewHeight":
        this.showHeightPx.textContent = value;
        break;
      case "previewGap":
        this.showGapPx.textContent = value;
        break;
    }
    this.applyRule();
  }
}

const previewWidth = document.querySelector("#width");
const previewHeight = document.querySelector("#height");
const previewGap = document.querySelector("#gap");

const showWidthPx = document.querySelector("#show-px-number-width > span");
const showHeightPx = document.querySelector("#show-px-number-height > span");
const showGapPx = document.querySelector("#show-px-number-gap > span");

const previewControllerInputsValuesChange = new previewControllerInputs(
  previewWidth,
  showWidthPx,
  previewHeight,
  showHeightPx,
  previewGap,
  showGapPx
);

previewWidth.addEventListener("input", (e) => {
  const value = e.target.value;
  previewControllerInputsValuesChange.updateValue("previewWidth", value);
});

previewHeight.addEventListener("input", (e) => {
  const value = e.target.value;
  previewControllerInputsValuesChange.updateValue("previewHeight", value);
});

previewGap.addEventListener("input", (e) => {
  const value = e.target.value;
  previewControllerInputsValuesChange.updateValue("previewGap", value);
});

previewControllerInputsValuesChange.initialize();

//==================================== Padding ===================================================

class BoxPaddingUpdater {
  constructor(
    showBoxPaddingTop,
    previewBoxPaddingTop,
    showBoxPaddingBottom,
    previewBoxPaddingBottom,
    showBoxPaddingLeft,
    previewBoxPaddingLeft,
    showBoxPaddingRight,
    previewBoxPaddingRight
  ) {
    this.showBoxPaddingTop = showBoxPaddingTop;
    this.previewBoxPaddingTop = previewBoxPaddingTop;
    this.showBoxPaddingBottom = showBoxPaddingBottom;
    this.previewBoxPaddingBottom = previewBoxPaddingBottom;
    this.showBoxPaddingLeft = showBoxPaddingLeft;
    this.previewBoxPaddingLeft = previewBoxPaddingLeft;
    this.showBoxPaddingRight = showBoxPaddingRight;
    this.previewBoxPaddingRight = previewBoxPaddingRight;
  }

  initialize2() {
    this.showBoxPaddingTop.textContent = this.previewBoxPaddingTop.value;
    this.showBoxPaddingBottom.textContent = this.previewBoxPaddingBottom.value;
    this.showBoxPaddingLeft.textContent = this.previewBoxPaddingLeft.value;
    this.showBoxPaddingRight.textContent = this.previewBoxPaddingRight.value;

    this.applyRule2();
    this.showRule2();
  }

  applyRule2() {
    const editingBoxes = document.querySelectorAll(".editing");
    editingBoxes.forEach((box) => {
      box.style.paddingTop = `${this.previewBoxPaddingTop.value}px`;
      box.style.paddingBottom = `${this.previewBoxPaddingBottom.value}px`;
      box.style.paddingLeft = `${this.previewBoxPaddingLeft.value}px`;
      box.style.paddingRight = `${this.previewBoxPaddingRight.value}px`;
    });
  }

  showRule2() {
    this.showBoxPaddingTop.textContent = this.previewBoxPaddingTop.value;
    this.showBoxPaddingBottom.textContent = this.previewBoxPaddingBottom.value;
    this.showBoxPaddingLeft.textContent = this.previewBoxPaddingLeft.value;
    this.showBoxPaddingRight.textContent = this.previewBoxPaddingRight.value;
  }
  paddingUpdateValue(type, value) {
    switch (type) {
      case "showBoxPaddingTop":
        this.previewBoxPaddingTop.value = value;
        break;
      case "showBoxPaddingBottom":
        this.previewBoxPaddingBottom.value = value;
        break;
      case "showBoxPaddingLeft":
        this.previewBoxPaddingLeft.value = value;
        break;
      case "showBoxPaddingRight":
        this.previewBoxPaddingRight.value = value;
        break;
    }
    this.applyRule2();
    this.showRule2();
  }
}

const boxtest = document.querySelector(".editing");

const showBoxPaddingTop = document.querySelector(
  "#show-px-number-padding-top > span"
);
const showBoxPaddingBottom = document.querySelector(
  "#show-px-number-padding-bottom > span"
);
const showBoxPaddingLeft = document.querySelector(
  "#show-px-number-padding-left > span"
);
const showBoxPaddingRight = document.querySelector(
  "#show-px-number-padding-right > span"
);

const previewBoxPaddingTop = document.querySelector("#padding-top");
const previewBoxPaddingBottom = document.querySelector("#padding-bottom");
const previewBoxPaddingLeft = document.querySelector("#padding-left");
const previewBoxPaddingRight = document.querySelector("#padding-right");

const boxPaddingUpdater = new BoxPaddingUpdater(
  showBoxPaddingTop,
  previewBoxPaddingTop,
  showBoxPaddingBottom,
  previewBoxPaddingBottom,
  showBoxPaddingLeft,
  previewBoxPaddingLeft,
  showBoxPaddingRight,
  previewBoxPaddingRight
);

previewBoxPaddingTop.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxPaddingUpdater.paddingUpdateValue("previewBoxPaddingTop", value);
});

previewBoxPaddingBottom.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxPaddingUpdater.paddingUpdateValue("previewBoxPaddingBottom", value);
});
previewBoxPaddingLeft.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxPaddingUpdater.paddingUpdateValue("previewBoxPaddingLeft", value);
});
previewBoxPaddingRight.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxPaddingUpdater.paddingUpdateValue("previewBoxPaddingRight", value);
});

boxPaddingUpdater.initialize2();

//=========================== Margin ============================================

class BoxMarginUpdater {
  constructor(
    showBoxMarginTop,
    previewBoxMarginTop,
    showBoxMarginBottom,
    previewBoxMarginBottom,
    showBoxMarginLeft,
    previewBoxMarginLeft,
    showBoxMarginRight,
    previewBoxMarginRight
  ) {
    this.showBoxMarginTop = showBoxMarginTop;
    this.previewBoxMarginTop = previewBoxMarginTop;
    this.showBoxMarginBottom = showBoxMarginBottom;
    this.previewBoxMarginBottom = previewBoxMarginBottom;
    this.showBoxMarginLeft = showBoxMarginLeft;
    this.previewBoxMarginLeft = previewBoxMarginLeft;
    this.showBoxMarginRight = showBoxMarginRight;
    this.previewBoxMarginRight = previewBoxMarginRight;
  }

  initialize3() {
    this.showBoxMarginTop.textContent = this.previewBoxMarginTop.value;
    this.showBoxMarginBottom.textContent = this.previewBoxMarginBottom.value;
    this.showBoxMarginLeft.textContent = this.previewBoxMarginLeft.value;
    this.showBoxMarginRight.textContent = this.previewBoxMarginRight.value;

    this.applyRule3();
    this.showRule3();
  }

  applyRule3() {
    const editingBoxes = document.querySelectorAll(".editing");

    editingBoxes.forEach((box) => {
      box.style.marginTop = `${this.previewBoxMarginTop.value}px`;
      box.style.marginBottom = `${this.previewBoxMarginBottom.value}px`;
      box.style.marginLeft = `${this.previewBoxMarginLeft.value}px`;
      box.style.marginRight = `${this.previewBoxMarginRight.value}px`;
    });
  }

  showRule3() {
    this.showBoxMarginTop.textContent = this.previewBoxMarginTop.value;
    this.showBoxMarginBottom.textContent = this.previewBoxMarginBottom.value;
    this.showBoxMarginLeft.textContent = this.previewBoxMarginLeft.value;
    this.showBoxMarginRight.textContent = this.previewBoxMarginRight.value;
  }
  marginUpdateValue(type, value) {
    switch (type) {
      case "showBoxMarginTop":
        this.previewBoxMarginTop.value = value;
        break;
      case "showBoxMarginBottom":
        this.previewBoxMarginBottom.value = value;
        break;
      case "showBoxMarginLeft":
        this.previewBoxMarginLeft.value = value;
        break;
      case "showBoxMarginRight":
        this.previewBoxMarginRight.value = value;
        break;
    }
    this.applyRule3();
    this.showRule3();
  }
}

const showBoxMarginTop = document.querySelector(
  "#show-px-number-margin-top > span"
);
const showBoxMarginBottom = document.querySelector(
  "#show-px-number-margin-bottom > span"
);
const showBoxMarginLeft = document.querySelector(
  "#show-px-number-margin-left > span"
);
const showBoxMarginRight = document.querySelector(
  "#show-px-number-margin-right > span"
);

const previewBoxMarginTop = document.querySelector("#margin-top");
const previewBoxMarginBottom = document.querySelector("#margin-bottom");
const previewBoxMarginLeft = document.querySelector("#margin-left");
const previewBoxMarginRight = document.querySelector("#margin-right");

const boxMarginUpdater = new BoxMarginUpdater(
  showBoxMarginTop,
  previewBoxMarginTop,
  showBoxMarginBottom,
  previewBoxMarginBottom,
  showBoxMarginLeft,
  previewBoxMarginLeft,
  showBoxMarginRight,
  previewBoxMarginRight
);

previewBoxMarginTop.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxMarginUpdater.marginUpdateValue("previewBoxMarginTop", value);
});

previewBoxMarginBottom.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxMarginUpdater.marginUpdateValue("previewBoxMarginBottom", value);
});
previewBoxMarginLeft.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxMarginUpdater.marginUpdateValue("previewBoxMarginLeft", value);
});
previewBoxMarginRight.addEventListener("input", (e) => {
  const value = e.target.textContent;
  boxMarginUpdater.marginUpdateValue("previewBoxMarginRight", value);
});

boxMarginUpdater.initialize3();

// =============================== Flex Wrap ==================================

class FlexWrapUpdater {
  constructor(
    showBoxFlexGrow,
    previewBoxFlexGrow,
    showBoxFlexShrink,
    previewBoxFlexShrink,
    showBoxFlexBasis,
    previewBoxFlexBasis
  ) {
    this.showBoxFlexGrow = showBoxFlexGrow;
    this.previewBoxFlexGrow = previewBoxFlexGrow;
    this.showBoxFlexShrink = showBoxFlexShrink;
    this.previewBoxFlexShrink = previewBoxFlexShrink;
    this.showBoxFlexBasis = showBoxFlexBasis;
    this.previewBoxFlexBasis = previewBoxFlexBasis;
  }

  initialize4() {
    this.showBoxFlexGrow.textContent = this.previewBoxFlexGrow.value;
    this.showBoxFlexShrink.textContent = this.previewBoxFlexShrink.value;
    this.showBoxFlexBasis.textContent = this.previewBoxFlexBasis.value;

    this.applyRule4();
    this.showRule4();
  }

  applyRule4() {
    const editingBoxes = document.querySelectorAll(".editing");

    editingBoxes.forEach((box) => {
      box.style.flexGrow = `${this.previewBoxFlexGrow.value}`;
      box.style.flexShrink = `${this.previewBoxFlexShrink.value}`;
      box.style.flexBasis = `${this.previewBoxFlexBasis.value}px`;
    });
  }

  showRule4() {
    this.showBoxFlexGrow.textContent = this.previewBoxFlexGrow.value;
    this.showBoxFlexShrink.textContent = this.previewBoxFlexShrink.value;
    this.showBoxFlexBasis.textContent = this.previewBoxFlexBasis.value;
  }
  flexWrapUpdateValue(type, value) {
    switch (type) {
      case "showBoxFlexGrow":
        this.previewBoxFlexGrow.value = value;
        break;
      case "showBoxFlexShrink":
        this.previewBoxFlexShrink.value = value;
        break;
      case "showBoxFlexBasis":
        this.previewBoxFlexBasis.value = value;
        break;
    }
    this.applyRule4();
    this.showRule4();
  }
}

const showBoxFlexGrow = document.querySelector(
  "#show-px-number-flex-grow > span"
);
const showBoxFlexShrink = document.querySelector(
  "#show-px-number-flex-shrink > span"
);
const showBoxFlexBasis = document.querySelector(
  "#show-px-number-flex-basis > span"
);

const previewBoxFlexGrow = document.querySelector("#flex-grow");
const previewBoxFlexShrink = document.querySelector("#flex-shrink");
const previewBoxFlexBasis = document.querySelector("#flex-basis");

const flexWrapUpdater = new FlexWrapUpdater(
  showBoxFlexGrow,
  previewBoxFlexGrow,
  showBoxFlexShrink,
  previewBoxFlexShrink,
  showBoxFlexBasis,
  previewBoxFlexBasis
);

previewBoxFlexGrow.addEventListener("input", (e) => {
  const value = e.target.textContent;
  flexWrapUpdater.flexWrapUpdateValue("previewBoxFlexGrow", value);
});
previewBoxFlexShrink.addEventListener("input", (e) => {
  const value = e.target.textContent;
  flexWrapUpdater.flexWrapUpdateValue("previewBoxFlexShrink", value);
});
previewBoxFlexBasis.addEventListener("input", (e) => {
  const value = e.target.textContent;
  flexWrapUpdater.flexWrapUpdateValue("previewBoxFlexBasis", value);
});

flexWrapUpdater.initialize4();
