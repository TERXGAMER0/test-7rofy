// استدعاء زر التحقق من رمز التفعيل وإرساله إلى الخادم للتحقق

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
.catch(err => console.error('Error:', err));

});

// كود لعبة الحروف (HexGame) من ملف index.html

class HexGame {
    constructor() {
        this.hexagons = [];
        // الإحداثيات الأساسية لكل صف
        this.baseCoordinates = [
            [{ x: -48, y: 0 }, { x: 55, y: 0 }, { x: 158, y: 0 }, { x: 261, y: 0 }, { x: 364, y: 0 }],
            [{ x: -21, y: 48 }, { x: 82, y: 48 }, { x: 185, y: 48 }, { x: 288, y: 48 }, { x: 391, y: 48 }],
            [{ x: -48, y: 96 }, { x: 55, y: 96 }, { x: 158, y: 96 }, { x: 261, y: 96 }, { x: 364, y: 96 }],
            [{ x: -21, y: 144 }, { x: 82, y: 144 }, { x: 185, y: 144 }, { x: 288, y: 144 }, { x: 391, y: 144 }],
            [{ x: -48, y: 194 }, { x: 55, y: 194 }, { x: 158, y: 194 }, { x: 261, y: 194 }, { x: 364, y: 194 }]
        ];
        // إزاحات الصفوف
        this.rowOffsets = [
            { x: -98, y: 4 },
            { x: 26, y: 44 },
            { x: 2, y: 84 },
            { x: 26, y: 124 },
            { x: 2, y: 162 }
        ];
        // إزاحة عامة لنقل الشكل كاملًا
        this.globalOffset = { x: 305, y: 300 };
        // إعدادات تغيير حجم الخلايا
        this.cellScales = [
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2]
        ];
        // توليد حروف عربية عشوائية
        this.letters = this.generateBasicArabicLetters(25);
        // إعدادات الخلفية
        this.backgroundImagePath = "IMG_7698.png";
        this.backgroundPosition = { x: 130, y: 280 };
        this.backgroundSize = { width: 815, height: 590 };
        this.backgroundViewSize = { width: 1000, height: 900 };

        // إعدادات زر الفوز
        this.winButtonConfig = {
            position: { x: 435, y: 530 },
            size: { width: 200, height: 60 },
            fontSize: 24,
            text: "فزت! 🎉"
        };

        // إعدادات الاحتفالية
        this.celebrationConfig = {
            duration: 10000, // 10 ثواني
            confettiCount: 200,
            arabicLetters: ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"],
            congratsText: "مبروووك",
            congratsPosition: { x: 350, y: 300 },
            robotPosition: { x: 450, y: 600 },
            robotSize: { width: 150, height: 150 },
            audioPath: "party1.mp3"
        };

        // إنشاء الشكل
        this.initGrid();
        // إضافة الصور والنصوص الإضافية
        this.initAdditionalImage2();
        this.initAdditionalImage3();
        this.initAdditionalImage4();
        this.initAdditionalText1();
        this.initAdditionalText2();
        this.initAdditionalText3();
        
        // إضافة زر الفوز
        this.initWinButton();
        
        // تجهيز عناصر الاحتفالية
        this.prepareConfetti();
        this.prepareArabicLetters();
        this.prepareCongratulationText();
        this.prepareRobot();
        this.prepareAudio();
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
        this.textContent2 = "النص الثاني";
        this.textPosition2 = { x: 300, y: 600 };
        this.textSize2 = { width: 250, height: 50 };
        this.textFontSize2 = 0;
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

    // إضافة زر الفوز
    initWinButton() {
        const container = document.getElementById("grid");
        const winBtn = document.createElement("button");
        winBtn.className = "win-button";
        winBtn.textContent = this.winButtonConfig.text;
        winBtn.style.position = "absolute";
        winBtn.style.left = `${this.winButtonConfig.position.x}px`;
        winBtn.style.top = `${this.winButtonConfig.position.y}px`;
        winBtn.style.width = `${this.winButtonConfig.size.width}px`;
        winBtn.style.height = `${this.winButtonConfig.size.height}px`;
        winBtn.style.fontSize = `${this.winButtonConfig.fontSize}px`;
        winBtn.style.zIndex = "2";
        winBtn.addEventListener("click", () => this.startCelebration());
        container.appendChild(winBtn);
        this.winButton = winBtn;
    }

    // تجهيز عناصر الاحتفال

    // تجهيز الفراقيع والأشرطة الذهبية
    prepareConfetti() {
        const container = document.getElementById("grid");
        
        // إنشاء حاوية للفراقيع
        const confettiContainer = document.createElement("div");
        confettiContainer.className = "confetti-container";
        confettiContainer.style.position = "absolute";
        confettiContainer.style.width = "100%";
        confettiContainer.style.height = "100%";
        confettiContainer.style.overflow = "hidden";
        confettiContainer.style.pointerEvents = "none";
        confettiContainer.style.zIndex = "100";
        confettiContainer.style.display = "none";
        
        container.appendChild(confettiContainer);
        this.confettiContainer = confettiContainer;
        
        // إنشاء الفراقيع المختلفة
        for (let i = 0; i < this.celebrationConfig.confettiCount; i++) {
            const confetti = document.createElement("div");
            const isRibbon = Math.random() > 0.7;
            
            confetti.className = isRibbon ? "golden-ribbon" : "confetti";
            confetti.style.position = "absolute";
            confetti.style.top = "-50px";
            confetti.style.left = `${Math.random() * 100}%`;
            
            if (isRibbon) {
                // شريط ذهبي
                confetti.style.width = `${Math.random() * 5 + 5}px`;
                confetti.style.height = `${Math.random() * 150 + 50}px`;
                confetti.style.backgroundColor = "gold";
                confetti.style.opacity = "0.8";
            } else {
                // فراقيع ملونة
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.opacity = "0.6";
                confetti.style.borderRadius = "50%";
            }
            
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confettiContainer.appendChild(confetti);
        }
    }

    // تجهيز الحروف العربية المتطايرة
    prepareArabicLetters() {
        const container = document.getElementById("grid");
        
        // إنشاء حاوية للحروف
        const lettersContainer = document.createElement("div");
        lettersContainer.className = "letters-container";
        lettersContainer.style.position = "absolute";
        lettersContainer.style.width = "100%";
        lettersContainer.style.height = "100%";
        lettersContainer.style.overflow = "hidden";
        lettersContainer.style.pointerEvents = "none";
        lettersContainer.style.zIndex = "101";
        lettersContainer.style.display = "none";
        
        container.appendChild(lettersContainer);
        this.lettersContainer = lettersContainer;
        
        // إنشاء الحروف العربية
        for (let i = 0; i < 50; i++) {
            const letter = document.createElement("div");
            letter.className = "flying-letter";
            letter.style.position = "absolute";
            
            // تحديد جهة بدء الحروف (يمين أو يسار)
            const fromRight = Math.random() > 0.5;
            letter.style.top = `${Math.random() * 100}%`;
            letter.style.left = fromRight ? "100%" : "-50px";
            
            // اختيار حرف عشوائي
            const randomLetter = this.celebrationConfig.arabicLetters[Math.floor(Math.random() * this.celebrationConfig.arabicLetters.length)];
            letter.textContent = randomLetter;
            
            // تحديد لون عشوائي
            const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
            letter.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            letter.style.fontSize = `${Math.random() * 30 + 20}px`;
            letter.style.fontWeight = "bold";
            letter.style.opacity = "0";
            letter.style.transform = "scale(0)";
            letter.dataset.direction = fromRight ? "right" : "left";
            
            lettersContainer.appendChild(letter);
        }
    }

    // تجهيز نص التهنئة
    prepareCongratulationText() {
        const container = document.getElementById("grid");
        
        // إنشاء نص التهنئة
        const congratsText = document.createElement("div");
        congratsText.className = "congrats-text";
        congratsText.textContent = this.celebrationConfig.congratsText;
        congratsText.style.position = "absolute";
        congratsText.style.left = `${this.celebrationConfig.congratsPosition.x}px`;
        congratsText.style.top = `${this.celebrationConfig.congratsPosition.y}px`;
        congratsText.style.fontSize = "0px"; // سيتم تكبيره خلال الرسوم المتحركة
        congratsText.style.fontWeight = "bold";
        congratsText.style.color = "#FF0000";
        congratsText.style.textShadow = "3px 3px 5px rgba(0,0,0,0.5)";
        congratsText.style.zIndex = "102";
        congratsText.style.display = "none";
        congratsText.style.transition = "all 0.5s ease-in-out";
        congratsText.style.textAlign = "center";
        congratsText.style.width = "300px";
        congratsText.style.transform = "translateX(-150px)";
        
        container.appendChild(congratsText);
        this.congratsText = congratsText;
    }

    // تجهيز الروبوت
    prepareRobot() {
        const container = document.getElementById("grid");
        
        // إنشاء الروبوت
        const robot = document.createElement("div");
        robot.className = "robot";
        robot.style.position = "absolute";
        robot.style.left = `${this.celebrationConfig.robotPosition.x}px`;
        robot.style.top = `${this.celebrationConfig.robotPosition.y}px`;
        robot.style.width = `${this.celebrationConfig.robotSize.width}px`;
        robot.style.height = `${this.celebrationConfig.robotSize.height}px`;
        robot.style.backgroundImage = "url('robot.png')"; // يجب توفير صورة الروبوت
        robot.style.backgroundSize = "contain";
        robot.style.backgroundRepeat = "no-repeat";
        robot.style.zIndex = "103";
        robot.style.display = "none";
        
        container.appendChild(robot);
        this.robot = robot;
    }

    // تجهيز الصوت
    prepareAudio() {
        this.audio = new Audio(this.celebrationConfig.audioPath);
    }

    // بدء الاحتفال
    startCelebration() {
        // تفعيل العناصر
        this.confettiContainer.style.display = "block";
        this.lettersContainer.style.display = "block";
        this.congratsText.style.display = "block";
        this.robot.style.display = "block";
        
        // تشغيل الصوت
        this.audio.play();
        
        // تحريك الفراقيع
        const confettis = this.confettiContainer.querySelectorAll(".confetti, .golden-ribbon");
        confettis.forEach(confetti => {
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 2;
            
            confetti.style.transition = `top ${duration}s linear ${delay}s, left ${duration}s ease-out ${delay}s, transform ${duration}s linear ${delay}s`;
            confetti.style.top = "120%";
            confetti.style.left = `${parseFloat(confetti.style.left) + (Math.random() * 40 - 20)}%`;
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
        });
        
        // تحريك الحروف
        const letters = this.lettersContainer.querySelectorAll(".flying-letter");
        letters.forEach(letter => {
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            letter.style.transition = `left ${duration}s ease-out ${delay}s, top ${duration}s ease-in-out ${delay}s, opacity ${duration * 0.3}s ease-in ${delay}s, transform ${duration * 0.3}s ease-out ${delay}s`;
            letter.style.opacity = "1";
            letter.style.transform = "scale(1) rotate(0deg)";
            
            if (letter.dataset.direction === "right") {
                letter.style.left = "-50px";
            } else {
                letter.style.left = "100%";
            }
            
            letter.style.top = `${parseFloat(letter.style.top) + (Math.random() * 30 - 15)}%`;
            
            // تغيير اللون بشكل متقطع
            let colorIndex = 0;
            const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
            const colorInterval = setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length;
                letter.style.color = colors[colorIndex];
            }, 200);
            
            // إيقاف تغيير اللون بعد الانتهاء
            setTimeout(() => {
                clearInterval(colorInterval);
            }, (duration + delay) * 1000);
        });
        
        // تحريك نص التهنئة
        setTimeout(() => {
            this.congratsText.style.fontSize = "70px";
            
            // تأثير النبضات
            let scale = 1;
            let growing = false;
            const pulseInterval = setInterval(() => {
                if (growing) {
                    scale += 0.05;
                    if (scale >= 1.2) growing = false;
                } else {
                    scale -= 0.05;
                    if (scale <= 0.9) growing = true;
                }
                this.congratsText.style.transform = `translateX(-150px) scale(${scale})`;
            }, 100);
            
            // تغيير لون النص بشكل دوري
            let colorIndex = 0;
            const colors = ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0000ff", "#9900ff"];
            const colorInterval = setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length;
                this.congratsText.style.color = colors[colorIndex];
            }, 150);
            
            // إيقاف التأثيرات بعد الانتهاء
            setTimeout(() => {
                clearInterval(pulseInterval);
                clearInterval(colorInterval);
            }, 9000);
        }, 500);
        
        // تحريك الروبوت (شقلبة خلفية)
        setTimeout(() => {
            this.robot.style.transition = "transform 1.5s ease-in-out";
            this.robot.style.transformOrigin = "center bottom";
            this.robot.style.transform = "rotateX(360deg)";
            
            // إعادة الروبوت للوضع الطبيعي بعد الشقلبة
            setTimeout(() => {
                this.robot.style.transition = "transform 0.3s ease-in-out";
                this.robot.style.transform = "rotateX(0deg)";
            }, 1500);
        }, 2000);
        
        // إنهاء الاحتفال بعد المدة المحددة
        setTimeout(() => {
            this.endCelebration();
        }, this.celebrationConfig.duration);
    }

    // إنهاء الاحتفال
    endCelebration() {
        this.confettiContainer.style.display = "none";
        this.lettersContainer.style.display = "none";
        this.congratsText.style.display = "none";
        this.robot.style.display = "none";
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    // إضافة دالة لتحريك صف كامل (مستخدمة في المثال)
    moveEntireRowX(rowIndex, x) {
        this.rowOffsets[rowIndex].x += x;
        this.updateRowPositions(rowIndex);
    }
}

// بدء تشغيل اللعبة عند تحميل الصفحة
window.onload = () => {
    const game = new HexGame();
    // مثال: تحريك الصف الأول 100 بكسل لليمين
    game.moveEntireRowX(0, 100);
    // مثال: تحريك الشكل كاملًا 50 بكسل لأسفل
    game.moveEntireGrid(0, 50);
};
