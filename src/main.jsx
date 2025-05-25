//StrictMode: React の開発モードで使われるコンポーネントで、非推奨な書き方や潜在的な問題を警告してくれるモード。
//createRoot: React 18 から導入された新しい root API。React アプリをページにレンダリングするために使う。
//./index.css: このプロジェクトの CSS ファイル。全体のスタイル設定。
//App: アプリのメインコンポーネント。App.jsx ファイルからインポートされている。
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//これはアプリで使用するToDoリストの初期データです。
//各オブジェクトは1つのタスクを表し、id, name, completed の3つのプロパティがあります。
//例えば、{ id: "todo-0", name: "Eat", completed: true } は「Eat」というタスクが完了済みであることを表しています。
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

//document.getElementById("root"): HTML 側（index.html）にある <div id="root"></div> を探して、そこにReactアプリを挿入する。
//createRoot(...).render(...): React 18 の新しい描画方法。アプリをそのDOMに描画する。
//<StrictMode>: 安全なコードを書けるようにチェックしてくれる開発用ラッパー。
//<App tasks={DATA} />: App コンポーネントを呼び出し、props として tasks に DATA を渡している。つまり、App 内で props.tasks にアクセスするとこの ToDo データが使える。
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>
);
