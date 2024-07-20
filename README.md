# スケジュール管理アプリケーション

季節ごとのスケジュール管理を行うシンプルなウェブアプリケーションでありIndexedDBを使用してデータを保存している。

## 主な機能

1. 季節ごとのスケジュール管理（春、夏、秋、冬）
2. スケジュールの追加、表示、削除
3. 出席率の計算
4. PDFでのスケジュールダウンロード
5. データベース内容の表示

## セットアップ

1. このリポジトリをクローンまたはダウンロードする。
2. `index.html`をウェブブラウザで開く。

## 使用方法

1. 画面上部の季節ボタンを使って、表示する季節を切り替える。
2. 「時間割設定」ボタンをクリックして、新しいスケジュールを追加する。
3. スケジュールの詳細（曜日、時間、科目名など）を入力し、「スケジュールに追加する」をクリックする。
4. メイン画面でスケジュールを確認し、必要に応じて出席・欠席数を更新できる。
5. 「PDFでダウンロード」ボタンを使用して、現在の表示をPDFとして保存できる。

## 使用技術

- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5): アプリケーションの構造
- [JavaScript (ES6+)](https://developer.mozilla.org/ja/docs/Web/JavaScript): アプリケーションのロジックとインタラクション
- [IndexedDB](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API): クライアントサイドでのデータ永続化
- [HTML2PDF.js](https://ekoopmans.github.io/html2pdf.js/): PDFの生成とダウンロード
- [CSS](https://developer.mozilla.org/ja/docs/Web/CSS): スタイリング

## ファイル構成

```
    |-index.html # 静的描画と設定画面
    |-display.js # スケジュール表示とDB確認機能
    |-indexedDB.js # IndexedDB操作
    |-ui.js # UI操作と基本機能
    |-testData.js # テストデータ生成（開発用）
```

### ファイルの詳細

- **index.html**: 静的描画と設定画面。基本的なUIの構造を定義。
- **display.js**: スケジュール表の表示やデータベース確認機能を含む。
- **indexedDB.js**: IndexedDBの操作に関する関数を集約。データストア追加時はこのファイルを編集。
- **ui.js**: 基本的なUI操作と機能を実装。追加機能の実装先として推奨。
- **testData.js**: テストデータ自動生成用（開発専用、リリース時には除外）。

## データベース構造

```
schedule-db--|
             |-springSchedules
             |-summerSchedules
             |-fallSchedules
             |-winterSchedules
```

各季節のスケジュールストアは同じ構造のオブジェクトを保存：

```javascript
{
  timeId: "Mo8:40",
  when: "Mo",
  startTime: "8:40",
  endTime: "10:10",
  name: "心理学",
  nameLink: "https://example.com/",
  place: "203",
  memo: "出席するだけで単位もらえる",
  attend: 0,
  absence: 0
}
```

timeIdは、whenとstartTimeを組み合わせることで一意に決定される主キーである。

## 開発者向け情報

### 基本機能

- **ファイル構成**
  - `ui.js`: ユーザーインタラクションとUIの更新を管理
  - `display.js`: スケジュールの表示ロジックを含む
  - `indexedDB.js`: データベース操作のための関数を提供

- **データ永続化**
  - IndexedDBを使用したデータ永続化により、アプリケーションはオフラインでも機能し、ページのリロード後もデータが保持される。

- **PDF生成**
  - `HTML2PDF.js`ライブラリを使用してPDF生成機能を実装しており、ユーザーは簡単にスケジュールをPDF形式で保存できる。


### テストデータの挿入

  開発やテスト目的で、`testData.js`ファイル内の`runTestDataInsertion()`関数をブラウザのコンソールで実行することで、サンプルデータを生成できる。

  例：
  ```javascript
  runTestDataInsertion(); // デフォルトで20個のスケジュールを各季節に追加
  runTestDataInsertion(50); // 50個のスケジュールを各季節に追加
  ```
### データベースの完全削除

  `indexedDB.js`ファイルには、データベース全体を削除するための`allCash`関数が含まれている。この関数を使用すると、アプリケーションのデータベースを完全に削除し、クリーンな状態に戻すことができる。
  ```javascript
  allCash();//schdule-dbの完全消去
  ```

### 注意事項

  - **クライアントサイド動作**: このアプリケーションはクライアントサイドで動作し、データはブラウザのIndexedDBに保存される。
  - ブラウザのデータをクリアすると、保存されたスケジュールも削除される。
  - テストデータの挿入や`allCash`関数の使用は、開発やテスト目的でのみ行ってください。
  - 実際のユーザーデータがある場合、`allCash`関数の使用前に必ずバックアップを取ってください。
  - **実行環境**: これらの機能はブラウザのコンソールから実行することを想定しています。セキュリティ上の理由から、本番環境ではこれらの機能へのアクセスを制限することを推奨します。

## そのうちしたいこと
- 設定画面の見た目をよくする。
- 設定にある一つの予定を削除する機能を付ける。
- PDFダウンロードが正しく動くようにする。それか、PDF機能を消す。
- データベースを増やしより多くのデータを保持、管理で来るようにする。
- 授業か、そうでないかを判定してチェックボックスの有無を変える。
- 何字から何時までの予定を表示するか決めれるようにする。
- リファクタリングする。
- 枠からはみ出さないようにする。












