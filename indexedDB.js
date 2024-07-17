// IndexedDBの初期化
const dbPromise = idb.openDB("schedule-db", 1, {
    upgrade(db) {
        const seasons = ["springSchedules", "summerSchedules", "fallSchedules", "winterSchedules"];
        seasons.forEach(season => {
            if (!db.objectStoreNames.contains(season)) {
                const store = db.createObjectStore(season, { keyPath: "timeId" });
                store.createIndex("startWhen", "when");
                store.createIndex("startTimeIndex", "startTime");
                store.createIndex("endTimeIndex", "endTime");
                store.createIndex("nameIndex", "name");
                store.createIndex("nameLinkIndex", "nameLink");
                store.createIndex("placeIndex", "place");
                store.createIndex("memoIndex", "memo");
                store.createIndex("attendIndex", "attend")
                store.createIndex("absenceIndex", "absence")
            }
        });
    }
});

// スケジュールの追加
async function addSchedule(storeName, schedule) {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.put(schedule);
    return tx.done;
}

/* //あるフィールドの値だけを更新する
async function updateField(storeName, timeId, field, newValue) {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const schedule = await store.get(timeId);
    schedule[field] = newValue;
    await store.put(schedule);
    await tx.done;
}
*/

async function updateField(storeName, timeId, field, newValue) {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    try {
        const schedule = await store.get(timeId); // get() が完了するまで待つ
        
        if (schedule) { // schedule が undefined でないことを確認
            schedule[field] = newValue;
            await store.put(schedule); 
        } else {
            console.error("Schedule not found for timeId:", timeId); 
        }
        
        await tx.done; 
    } catch (error) {
        console.error(`updateField エラー:`, error);
        // エラー処理
    }
}
// 全スケジュールの取得
async function getAllSchedules(storeName) {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAll();
}

// ストアの中身を全て消去する関数
async function clearAllSchedules(storeName) {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.clear();
    return tx.done;
}

// ストアの中の特定のデータを削除する関数
async function deleteOneSchedule(storeName, timeId) {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(timeId);
  return tx.done;
}

// testFunction
async function getAllSchedules(storeName) {
    try {
        const db = await dbPromise;
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.getAll();
    } catch (error) {
        console.error(`getAllSchedules エラー (${storeName}):`, error);
        throw error;
    }
}

async function allCash(){
    const dbName = "schedule-db"; 
    indexedDB.deleteDatabase(dbName);
}
