//初期状態
let season = "springSchedules";
document.body.style.zoom = "scale(0.60)";
changeToDisplay();
displaySchedules(season);

// 季節設定の切り替え
document.getElementById("switch-seasons").addEventListener("click", async (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  
  let seasonName;
  let newSeason;

  switch(event.target.textContent.trim()) {
    case "春":
      seasonName = "春";
      newSeason = "springSchedules";
      break;
    case "夏":
      seasonName = "夏";
      newSeason = "summerSchedules";
      break;
    case "秋":
      seasonName = "秋";
      newSeason = "fallSchedules";
      break;
    case "冬":
      seasonName = "冬";
      newSeason = "winterSchedules";
      break;
  }
  
  if (newSeason) {
    season = newSeason;
    document.getElementById("current-season").textContent = `現在の季節: ${seasonName}`;
    await displaySchedules(season);
  }
});

// 保存ボタン
document.getElementById("save-schedule").addEventListener("click", async () => {
    const schedule = {
        timeId: document.getElementById("when").value + document.getElementById("startTime").value,
        when: document.getElementById("when").value,
        startTime: document.getElementById("startTime").value,
        endTime: document.getElementById("endTime").value,
        name: document.getElementById("name").value,
        nameLink: document.getElementById("nameLink").value,
        place: document.getElementById("place").value,
        memo: document.getElementById("memo").value
    };
    
    if (checkInputValue()) {
        await addSchedule(season, schedule);
        await displaySchedules(season);
        document.getElementById("schedule-form").reset();
    }
});

function checkInputValue() {
    const whenValue = document.getElementById("when").value.trim(); 
    const startTimeValue = document.getElementById("startTime").value.trim(); 
    const endTimeValue = document.getElementById("endTime").value.trim(); 
    let errors = [];

    if (!whenValue) errors.push("when");
    if (!startTimeValue) errors.push("startTime");
    if (!endTimeValue) errors.push("endTime");

    if (errors.length > 0) {
        alert(`${errors.join(", ")} を入力してください。`);
        return false;
    }

    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regex.test(startTimeValue) || !regex.test(endTimeValue)) {
        alert("時間はHH:mm形式で24時間表記で入力してください。");
        return false;
    }

    alert("保存されました。");
    return true;
}

// その他の関数は変更なし


// 全消去ボタンのイベントリスナー
document.getElementById("clear-allSchedules").addEventListener("click", async () => {
    if (confirm("本当に全部消しますか?")) {
        await clearAllSchedules(season);
        displaySchedules(season); // スケジュール表示を更新
    }
});

document.getElementById("show-all-db").addEventListener("click", async () => {
  displayDB(season);
})

function changeToDisplay(){
    // 表示ページを表示し、設定ページを非表示にする
    document.getElementById(`settingsPage`).style.display = "none";
    document.getElementById(`displayPage`).style.display = "block";
}
function changeToSettings(){
    // 設定ページを表示し、表示ページを非表示にする
    document.getElementById(`settingsPage`).style.display = "block";
    document.getElementById(`displayPage`).style.display = "none";
}

document.getElementById("downloadPdfButton").addEventListener("click", () => {
    const element = document.body; // 対象要素を指定
    const option = {
        margin: 1, // 余白
        filename: "Myshedule.pdf", // ファイル名
        image: { type: "png", quality: 1 }, // PDFの生成に使用される画像のタイプとクオリティ
        html2canvas: { scale: 2, useCORS: true }, // html2canvasで使用される設定を記述。useCORS: trueを設定すると別ドメインの画像を表示できる（サイトによってはできないこともある）
        jsPDF: { format: "a2", orientation: "portrait" }, // jsPDFで使用される設定を記述
    };
    // PDF生成とダウンロードの処理
    html2pdf()
        .from(element)
        .set(option)
        .save("Myshedule.pdf")
});
