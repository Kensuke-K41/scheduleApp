/*
HTMLでいうとこんな感じになってる。timeIdは固有値
${...}はスケジュールごとの値
jsでのCSS操作は(要素名_タグ名).style.(プロパティ) = "(プロパティ値)"

<div id="schedule-list">
  <!-- 各スケジュールに対して以下の構造が繰り返される -->
  <div id="${schedule.timeId}">
    <a id="${schedule.timeId}_name" href="${schedule.nameLink}" >
      ${schedule.name}
    </a>
    <div id="${schedule.timeId}_place">
      ${schedule.place}
    </div>
    <div id="${schedule.timeId}_memo">
      ${schedule.memo}
    </div>
    <button id="${schedule.timeId}_delete" onclick="deleteOneSchedule('${storeName}', '${schedule.timeId}')">
      消す
    </button>
    <div id="${schedule.timeId}_counter">
      <label for="${schedule.timeId}_attend">出席数</label>
      <input type="number" id="${schedule.timeId}_attend" min="0">
      <label for="${schedule.timeId}_absence">欠席数</label>
      <input type="number" id="${schedule.timeId}_absence" min="0">
      <label for="${schedule.timeId}_percent">出席率</label>
      <span id="${schedule.timeId}_percent"></span>
    </div>
  </div>
</div>
*/

async function displaySchedules(storeName) {
    const schedules = await getAllSchedules(storeName);
    const scheduleComponent = document.getElementById("schedule-container");
    scheduleComponent.innerHTML = `
      <div class="schedule-column" id="time">
        <div class="schedule-row" id="items">時間 曜日</div>
      </div>
      <div class="schedule-column" id="su-schedule">
        <div class="schedule-row" id="sunday">日</div>
      </div>
      <div class="schedule-column" id="mo-schedule">
        <div class="schedule-row" id="monday">月</div>
      </div>
      <div class="schedule-column" id="tu-schedule">
        <div class="schedule-row" id="tueseday">火</div>
      </div>
      <div class="schedule-column" id="we-schedule">
        <div class="schedule-row" id="wedonesday">水</div>
      </div>
      <div class="schedule-column" id="th-schedule">
        <div class="schedule-row" id="thuesday">木</div>
      </div>
      <div class="schedule-column" id="fr-schedule">
        <div class="schedule-row" id="friday">金</div>
      </div>
      <div class="schedule-column" id="sa-schedule">
        <div class="schedule-row" id="sataday">土</div>
      </div>
    `;

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    schedules.forEach(schedule => {
        const Field_div = document.createElement("div");
        Field_div.id = schedule.timeId;

        // 時間と曜日に基づいて位置を設定
        const morningTime = 360;
        const nightTime = 1320;
        const dayWidth = scheduleComponent.offsetWidth / 8;
        const minutesWith = (scheduleComponent.offsetHeight - 20) / (nightTime - morningTime) ;
        console.log(scheduleComponent.offsetHeight, minutesWith)
        const dayIndex = days.indexOf(schedule.when);
        const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
        const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
        const startTimeInMinutes = startHour * 60 + startMinute - morningTime;
        const endTimeInMinutes = endHour * 60 + endMinute - morningTime;
        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
        console.log(startTimeInMinutes, endTimeInMinutes)


        Field_div.style.position = "absolute";
        // Field_div.style.left = `${dayWidth * dayIndex}px`;
        Field_div.style.width = `${dayWidth - 1}px`;
        Field_div.style.top = `${minutesWith * startTimeInMinutes + 20}px`
        Field_div.style.height = `${minutesWith * durationInMinutes - 2}px`
        Field_div.style.borderTop = "1px solid black"
        Field_div.style.borderBottom = "1px solid black"
        Field_div.style.backgroundColor = "#7CD0F2"

        /* 曜日によって表示される場所（横方向）が違うからその設定よう。         *
        indexは上のdays配列のindex番号と同じ。
        Field_div.style.(プロパティ) = "(プロパティ値)" 　＊()はいらない
        Field_div.style.left = `${dayWidth * dayIndex}px` など*/

        /* switch(dayIndex) {
                case 0:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    Field_div.style.top = `${minutesWith * startTimeInMinutes}`
                    Field_div.style.bottom = `${minutesWith * endTimeInMinutes}`
                    break;
                case 1:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
                case 2:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
                case 3:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
                case 4:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
                case 5:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
                case 6:
                    Field_div.style.position = "absolute";
                    Field_div.style.left = `${dayWidth * dayIndex}px`;
                    break;
            } */
      /* この下に始まる時間終わる時間によって表示する高さと枠の長さを決めるCSSを書く。
      使う値は上のstartTimeInMinutes,endTimeInMinutes,durationInMinutesの三使うといいかも。
      それぞれ0:00から何分経ったかの値。
      プロパティ値には式も入れるよ。
      startTimeInMinutesが480の時8:00～
      endTimeInMinutesが570の時9:30～   
      durationInMinutesが90の時1時間30分

        */
      

        // 名前
        const name_a = document.createElement("a");
        name_a.id = `${schedule.timeId}_name`;
        if (schedule.nameLink !== "") {
            name_a.href = schedule.nameLink;
        }
        name_a.textContent = schedule.name;
        Field_div.appendChild(name_a);
        //名前のCSS 
        //name_a.style.(プロパティ) = "(プロパティ値)";  の形で書く。
        name_a.style.color = "green";//例

        // 場所
        const place_div = document.createElement("div");
        place_div.id = `${schedule.timeId}_place`;
        place_div.textContent = schedule.place;
        Field_div.appendChild(place_div);
        //場所のCSS
        //place_div.style.(プロパティ) = "(プロパティ値)";  の形で書く。
        place_div.style.color = "red";//例

        // メモ
        const memo_div = document.createElement("div");
        memo_div.id = `${schedule.timeId}_memo`;
        memo_div.textContent = schedule.memo;
        Field_div.appendChild(memo_div);
        //メモのCSS
        //memo_div.style.(プロパティ) = "(プロパティ値)";  の形で書く。
        memo_div.style.color = "blue"//例

        // カウンター
        const counter_div = document.createElement("div");
        counter_div.id = `${schedule.timeId}_counter`;
        Field_div.appendChild(counter_div);
        //カウンターのCSS
        //counter_div.style.(プロパティ) = "(プロパティ値)";  の形で書く。


        const attend_label = document.createElement("label");
        attend_label.setAttribute("for", `${schedule.timeId}_attend`);
        attend_label.innerText = "出: ";
        counter_div.appendChild(attend_label);
        //出席labelのCSS
        //attend_label.style.(プロパティ) = "(プロパティ値)";  の形で書く。

        const attend_input = document.createElement("input");
        attend_input.type = "number";
        attend_input.id = `${schedule.timeId}_attend`;
        attend_input.value = schedule.attend;
        attend_input.min = 0;
        counter_div.appendChild(attend_input);
        //主席のCSS
        //attend_input.style.(プロパティ) = "(プロパティ値)";  の形で書く。
        attend_input.style.width = "30px";

        const absence_label = document.createElement("label");
        absence_label.setAttribute("for", `${schedule.timeId}_absence`);
        absence_label.innerText = "欠: ";
        counter_div.appendChild(absence_label);
        //欠席labelのCSS
        //absence_label.style.(プロパティ) = "(プロパティ値)";  の形で書く。


        const absence_input = document.createElement("input");
        absence_input.type = "number";
        absence_input.id = `${schedule.timeId}_absence`;
        absence_input.value = schedule.absence;
        absence_input.min = 0;
        counter_div.appendChild(absence_input);
        //欠席のCSS
        //attend_input.style.(プロパティ) = "(プロパティ値)";  の形で書く。
        absence_input.style.width = "30px";

        const percent_div = document.createElement("div");
        percent_div.id = `${schedule.timeId}_percent`;
        Field_div.appendChild(percent_div);
        //パーセントlCSS
        //percent_span.style.(プロパティ) = "(プロパティ値)";  の形で書く。


        function updatePercent() {
            const val1 = parseFloat(attend_input.value) || 0;
            const val2 = parseFloat(absence_input.value) || 0;
            const sum = val1 + val2;
            const percent = sum === 0 ? 0 : (val1 / sum * 100).toFixed(2);
            percent_div.textContent = `出席率 ${percent}%`;
        }
        updatePercent();

        attend_input.addEventListener("input", async () => {
          updatePercent();
          await updateField(storeName, schedule.timeId, "attend", attend_input.value);
        })
        absence_input.addEventListener("input", async () => {
          updatePercent();
          await updateField(storeName, schedule.timeId, "absence", absence_input.value);
        })

        switch(dayIndex) {
          case 0:
            document.getElementById("su-schedule").appendChild(Field_div);
            break;
          case 1:
            document.getElementById("mo-schedule").appendChild(Field_div);
            break;
          case 2:
            document.getElementById("tu-schedule").appendChild(Field_div);
            break;
          case 3:
            document.getElementById("we-schedule").appendChild(Field_div);
            break;
          case 4:
            document.getElementById("th-schedule").appendChild(Field_div);
            break;
          case 5:
            document.getElementById("fr-schedule").appendChild(Field_div);
            break;
          case 6:
            document.getElementById("sa-schedule").appendChild(Field_div);
            break;
        }
      });
}


async function displayDB(storeName) {
    const schedules = await getAllSchedules(storeName);
    const dbWindow = window.open("", "Database View", "width=600,height=400");

    dbWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Database View</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h2 { text-align: center; }
                .schedule { margin: 10px; padding: 10px; border: 1px solid #ccc; }
                .schedule p { margin: 5px 0; }
            </style>
        </head>
        <body>
            <h2>Database Contents</h2>
            <div id="schedule-list"></div>
        </body>
        </html>
    `);

    const scheduleList = dbWindow.document.getElementById("schedule-list");
    schedules.forEach(schedule => {
        const scheduleDiv = dbWindow.document.createElement("div");
        scheduleDiv.className = "schedule";
        scheduleDiv.innerHTML = `
            <p>TimeId: ${schedule.timeId}</p>
            <p>When: ${schedule.when}</p>
            <p>Start Time: ${schedule.startTime}</p>
            <p>End Time: ${schedule.endTime}</p>
            <p>Name: ${schedule.name}</p>
            <p>NameLink: ${schedule.nameLink}</p>
            <p>Place: ${schedule.place}</p>
            <p>Memo: ${schedule.memo}</p>
            <p>attend: ${schedule.attend}</p>
            <p>absence: ${schedule.absence}</p>
        `;
        scheduleList.appendChild(scheduleDiv);
    });
}


