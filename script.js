document.addEventListener("DOMContentLoaded", function () {
  // --- منطق التحقق من رمز التفعيل ---
  document.getElementById("secret-submit").addEventListener("click", function () {
    var code = document.getElementById("secret-code").value.trim();
    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          document.getElementById("secret-overlay").style.display = "none";
        } else {
          document.getElementById("error-message").style.display = "block";
        }
      })
      .catch(err => console.error("Error during verification:", err));
  });
  
  // --- كود اللعبة الأصلي (HexGame) ---
  class HexGame {
    constructor() {
      this.hexagons = [];
      this.baseCoordinates = [
        [{ x: -48, y: 0 }, { x: 55, y: 0 }, { x: 158, y: 0 }, { x: 261, y: 0 }, { x: 364, y: 0 }],
        [{ x: -21, y: 48 }, { x: 82, y: 48 }, { x: 185, y: 48 }, { x: 288, y: 48 }, { x: 391, y: 48 }],
        [{ x: -48, y: 96 }, { x: 55, y: 96 }, { x: 158, y: 96 }, { x: 261, y: 96 }, { x: 364, y: 96 }],
        [{ x: -21, y: 144 }, { x: 82, y: 144 }, { x: 185, y: 144 }, { x: 288, y: 144 }, { x: 391, y: 144 }],
        [{ x: -48, y: 194 }, { x: 55, y: 194 }, { x: 158, y: 194 }, { x: 261, y: 194 }, { x: 364, y: 194 }]
      ];
      this.rowOffsets = [
        { x: -98, y: 4 },
        { x: 26, y: 44 },
        { x: 2, y: 84 },
        { x: 26, y: 124 },
        { x: 2, y: 162 }
      ];
      this.globalOffset = { x: 305, y: 300 };
      this.cellScales = [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2]
      ];
      this.letters = this.generateBasicArabicLetters(25);
      this.backgroundImagePath = "IMG_7698.png";
      this.backgroundPosition = { x: 130, y: 280 };
      this.backgroundSize = { width: 815, height: 590 };
      this.backgroundViewSize = { width: 1000, height: 900 };
      this.initGrid();
      this.initAdditionalImage2();
      this.initAdditionalImage3();
      this.initAdditionalImage4();
      this.initAdditionalText1();
      this.initAdditionalText2();
      this.initAdditionalText3();
    }
  
    moveEntireGrid(x, y) {
      this.globalOffset.x += x;
      this.globalOffset.y += y;
      this.updateAllPositions();
    }
  
    updateAllPositions() {
      this.hexagons.forEach((row, rowIndex) => {
        this.updateRowPositions(rowIndex);
      });
    }
  
    updateRowPositions(rowIndex) {
      this.hexagons[rowIndex].forEach((hex, cellIndex) => {
        const base = this.baseCoordinates[rowIndex][cellIndex];
        const rowOffset = this.rowOffsets[rowIndex];
        hex.style.left = `${base.x + rowOffset.x + this.globalOffset.x}px`;
        hex.style.top = `${base.y + rowOffset.y + this.globalOffset.y}px`;
      });
    }
  
    generateBasicArabicLetters(count) {
      const basicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
      return [...basicLetters].sort(() => Math.random() - 0.5).slice(0, count);
    }
  
    initGrid() {
      const container = document.getElementById("grid");
      container.style.backgroundImage = `url('${this.backgroundImagePath}')`;
      container.style.backgroundSize = `${this.backgroundSize.width}px ${this.backgroundSize.height}px`;
      container.style.backgroundRepeat = "no-repeat";
      container.style.backgroundPosition = `${this.backgroundPosition.x}px ${this.backgroundPosition.y}px`;
      container.style.width = `${this.backgroundViewSize.width}px`;
      container.style.height = `${this.backgroundViewSize.height}px`;
  
      this.hexagons = this.baseCoordinates.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          const hex = document.createElement("div");
          hex.className = "hexagon";
          hex.textContent = this.letters[rowIndex * 5 + cellIndex];
          const rowOffset = this.rowOffsets[rowIndex];
          hex.style.left = `${cell.x + rowOffset.x + this.globalOffset.x}px`;
          hex.style.top = `${cell.y + rowOffset.y + this.globalOffset.y}px`;
          const cellScale = this.cellScales[rowIndex][cellIndex];
          hex.style.width = `${50 * cellScale}px`;
          hex.style.height = `${55 * cellScale}px`;
          hex.style.fontSize = `${24 * cellScale}px`;
          hex.dataset.state = "0";
          hex.dataset.char = this.letters[rowIndex * 5 + cellIndex];
          hex.addEventListener("click", (e) => this.handleClick(e.target));
          container.appendChild(hex);
          return hex;
        });
      });
    }
  
    handleClick(hex) {
      const currentState = parseInt(hex.dataset.state);
      const newState = (currentState + 1) % 4;
      hex.dataset.state = newState.toString();
      switch (newState) {
        case 0:
          hex.style.backgroundColor = "#FFFFFF";
          hex.textContent = hex.dataset.char;
          this.resetRelatedHexes(hex.dataset.char);
          break;
        case 1:
          hex.style.backgroundColor = "#FADB0C";
          break;
        case 2:
          hex.style.backgroundColor = "#FF7835";
          hex.textContent = "";
          this.hideRelatedChars(hex.dataset.char);
          break;
        case 3:
          hex.style.backgroundColor = "#3BB419";
          break;
      }
    }
  
    hideRelatedChars(char) {
      document.querySelectorAll(".hexagon").forEach((h) => {
        if (h.dataset.char === char && h.dataset.state !== "2") {
          h.textContent = "";
          h.style.backgroundColor = "#FF7835";
          h.dataset.state = "2";
        }
      });
    }
  
    resetRelatedHexes(char) {
      document.querySelectorAll(".hexagon").forEach((h) => {
        if (h.dataset.char === char) {
          h.textContent = h.dataset.char;
          h.style.backgroundColor = "#FFFFFF";
          h.dataset.state = "0";
        }
      });
    }
  
    initAdditionalImage2() {
      this.backgroundImagePath2 = "IMG_7904.png";
      this.backgroundPosition2 = { x: -900, y: -250 };
      this.backgroundSize2 = { width: 2700, height: 2000 };
      const container = document.getElementById("grid");
      const imgDiv2 = document.createElement("div");
      imgDiv2.className = "bgImage2";
      imgDiv2.style.position = "absolute";
      imgDiv2.style.left = `${this.backgroundPosition2.x}px`;
      imgDiv2.style.top = `${this.backgroundPosition2.y}px`;
      imgDiv2.style.width = `${this.backgroundSize2.width}px`;
      imgDiv2.style.height = `${this.backgroundSize2.height}px`;
      imgDiv2.style.backgroundImage = `url('${this.backgroundImagePath2}')`;
      imgDiv2.style.backgroundSize = "cover";
      imgDiv2.style.backgroundRepeat = "no-repeat";
      imgDiv2.style.zIndex = "-1";
      container.appendChild(imgDiv2);
    }
  
    initAdditionalImage3() {
      this.backgroundImagePath3 = "IMG_7750.PNG";
      this.backgroundPosition3 = { x: 380, y: 200 };
      this.backgroundSize3 = { width: 300, height: 120 };
      const container = document.getElementById("grid");
      const imgDiv3 = document.createElement("div");
      imgDiv3.className = "bgImage3";
      imgDiv3.style.position = "absolute";
      imgDiv3.style.left = `${this.backgroundPosition3.x}px`;
      imgDiv3.style.top = `${this.backgroundPosition3.y}px`;
      imgDiv3.style.width = `${this.backgroundSize3.width}px`;
      imgDiv3.style.height = `${this.backgroundSize3.height}px`;
      imgDiv3.style.backgroundImage = `url('${this.backgroundImagePath3}')`;
      imgDiv3.style.backgroundSize = "cover";
      imgDiv3.style.backgroundRepeat = "no-repeat";
      imgDiv3.style.zIndex = "-1";
      container.appendChild(imgDiv3);
    }
  
    initAdditionalImage4() {
      this.backgroundImagePath4 = "IMAGE4.png";
      this.backgroundPosition4 = { x: 750, y: 150 };
      this.backgroundSize4 = { width: 320, height: 240 };
      const container = document.getElementById("grid");
      const imgDiv4 = document.createElement("div");
      imgDiv4.className = "bgImage4";
      imgDiv4.style.position = "absolute";
      imgDiv4.style.left = `${this.backgroundPosition4.x}px`;
      imgDiv4.style.top = `${this.backgroundPosition4.y}px`;
      imgDiv4.style.width = `${this.backgroundSize4.width}px`;
      imgDiv4.style.height = `${this.backgroundSize4.height}px`;
      imgDiv4.style.backgroundImage = `url('${this.backgroundImagePath4}')`;
      imgDiv4.style.backgroundSize = "cover";
      imgDiv4.style.backgroundRepeat = "no-repeat";
      imgDiv4.style.zIndex = "-1";
      container.appendChild(imgDiv4);
    }
  
    initAdditionalText1() {
      this.textContent1 = "سباق الحروف";
      this.textPosition1 = { x: 435, y: 250 };
      this.textSize1 = { width: 200, height: 50 };
      this.textFontSize1 = 40;
      const container = document.getElementById("grid");
      const textDiv1 = document.createElement("div");
      textDiv1.className = "additionalText1";
      textDiv1.style.position = "absolute";
      textDiv1.style.left = `${this.textPosition1.x}px`;
      textDiv1.style.top = `${this.textPosition1.y}px`;
      textDiv1.style.width = `${this.textSize1.width}px`;
      textDiv1.style.height = `${this.textSize1.height}px`;
      textDiv1.style.fontSize = `${this.textFontSize1}px`;
      textDiv1.style.color = "#000000";
      textDiv1.style.background = "transparent";
      textDiv1.style.zIndex = "1";
      textDiv1.textContent = this.textContent1;
      container.appendChild(textDiv1);
    }
  
    initAdditionalText2() {
      this.textContent2 = "jifn للأستفسار اسم حسابي في التيك توك هو ";
      this.textPosition2 = { x: 250, y: 1100 };
      this.textSize2 = { width: 700, height: 50 };
      this.textFontSize2 = 40;
      const container = document.getElementById("grid");
      const textDiv2 = document.createElement("div");
      textDiv2.className = "additionalText2";
      textDiv2.style.position = "absolute";
      textDiv2.style.left = `${this.textPosition2.x}px`;
      textDiv2.style.top = `${this.textPosition2.y}px`;
      textDiv2.style.width = `${this.textSize2.width}px`;
      textDiv2.style.height = `${this.textSize2.height}px`;
      textDiv2.style.fontSize = `${this.textFontSize2}px`;
      textDiv2.style.color = "#000000";
      textDiv2.style.background = "transparent";
      textDiv2.style.zIndex = "1";
      textDiv2.textContent = this.textContent2;
      container.appendChild(textDiv2);
    }
  
    initAdditionalText3() {
      this.textContent3 = "النص الثالث";
      this.textPosition3 = { x: 600, y: 600 };
      this.textSize3 = { width: 300, height: 60 };
      this.textFontSize3 = 0;
      const container = document.getElementById("grid");
      const textDiv3 = document.createElement("div");
      textDiv3.className = "additionalText3";
      textDiv3.style.position = "absolute";
      textDiv3.style.left = `${this.textPosition3.x}px`;
      textDiv3.style.top = `${this.textPosition3.y}px`;
      textDiv3.style.width = `${this.textSize3.width}px`;
      textDiv3.style.height = `${this.textSize3.height}px`;
      textDiv3.style.fontSize = `${this.textFontSize3}px`;
      textDiv3.style.color = "#000000";
      textDiv3.style.background = "transparent";
      textDiv3.style.zIndex = "1";
      textDiv3.textContent = this.textContent3;
      container.appendChild(textDiv3);
    }
  }
  
  // بدء تشغيل اللعبة
  window.onload = () => {
    const game = new HexGame();
    game.moveEntireRowX(0, 100);
    game.moveEntireGrid(0, 50);
  };
  
  // --- إضافة ميزة زر الفوز والاحتفالية ---
  const winButton = document.getElementById("winButton");
  const winSound = document.getElementById("winSound");
  const celebrationOverlay = document.getElementById("celebration-overlay");
  const goldenBarsContainer = document.getElementById("golden-bars-container");
  const dwarfsContainer = document.getElementById("dwarfs-container");
  
  winButton.addEventListener("click", () => {
    // عرض شاشة الاحتفالية
    celebrationOverlay.style.display = "flex";
    // تشغيل صوت الفوز
    winSound.currentTime = 0;
    winSound.play().catch(err => console.error("Win sound error:", err));
    // إنشاء تأثير "ألواح ذهبية" عشوائية
    for (let i = 0; i < 20; i++) {
      const bar = document.createElement("div");
      bar.className = "golden-bar";
      bar.style.left = Math.random() * 100 + "%";
      bar.style.animationDelay = Math.random() * 1 + "s";
      goldenBarsContainer.appendChild(bar);
    }
    // إنشاء تأثير "أقزام راقصة" (يمكن استبدالها بصور إذا توفرت)
    for (let j = 0; j < 5; j++) {
      const dwarf = document.createElement("div");
      dwarf.className = "dancing-dwarf";
      dwarf.textContent = "⚡";
      dwarf.style.left = Math.random() * 100 + "%";
      dwarf.style.animationDelay = Math.random() * 0.5 + "s";
      dwarfsContainer.appendChild(dwarf);
    }
    // إزالة الاحتفالية بعد 5 ثوانٍ
    setTimeout(() => {
      celebrationOverlay.style.display = "none";
      goldenBarsContainer.innerHTML = "";
      dwarfsContainer.innerHTML = "";
    }, 5000);
  });
});
  
/* الكود الخاص بتهيئة إطار تحدي Cloudflare - تركه كما هو */
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'924a89600f9644de',t:'MTc0MjY5NzMzOC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
