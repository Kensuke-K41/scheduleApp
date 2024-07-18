function generateTestData(count) {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const subjects = ['数学', '物理', '化学', '生物', '歴史', '文学', '英語', 'プログラミング', '経済学', '心理学'];
    const places = ['101教室', '202教室', '303教室', '404教室', '505教室', '図書館', '体育館', 'オンライン'];
    return Array.from({ length: count }, (_, i) => {
        const when = days[Math.floor(Math.random() * days.length)];
        const startHour = Math.floor(Math.random() * 12) + 8; // 8:00 to 19:00
        const startMinute = Math.floor(Math.random() * 4) * 15; // 00, 15, 30, 45
        const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
        
        // endHourを少なくともstartHourの1時間後に設定
        const endHour = Math.min(startHour + 1 + Math.floor(Math.random() * 3), 20);
        const endMinute = Math.floor(Math.random() * 4) * 15;
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        
        return {
            timeId: `${when}${startTime}`,
            when: when,
            startTime: startTime,
            endTime: endTime,
            name: subjects[Math.floor(Math.random() * subjects.length)],
            nameLink: `https://example.com/${i}`,
            place: places[Math.floor(Math.random() * places.length)],
            memo: `テストメモ ${i + 1}`,
            attend: 0,
            absence: 0
        };
    });
}

// テストデータを各季節のストアに挿入する関数
async function insertTestData(count = 20) {
    const seasons = ["springSchedules", "summerSchedules", "fallSchedules", "winterSchedules"];
    const dbPromise = idb.openDB("schedule-db", 1);

    for (const season of seasons) {
        const testData = generateTestData(count);
        const db = await dbPromise;
        const tx = db.transaction(season, "readwrite");
        const store = tx.objectStore(season);

        for (const item of testData) {
            await store.put(item);
        }

        await tx.done;
        console.log(`${count} テストデータを ${season} に挿入しました。`);
    }

    console.log("全てのテストデータの挿入が完了しました。");
}

// コンソールで実行するための関数
function runTestDataInsertion(count = 20) {
    insertTestData(count).then(() => {
        console.log("テストデータの挿入が完了しました。各季節のスケジュールを確認してください。");
    }).catch(error => {
        console.error("テストデータの挿入中にエラーが発生しました:", error);
    });
}


async function allCash(){
    const dbName = "schedule-db"; 
    indexedDB.deleteDatabase(dbName);
}
// コンソールで以下を実行してテストデータを挿入
// runTestDataInsertion();
// または特定の数のテストデータを挿入する場合
// runTestDataInsertion(50);
