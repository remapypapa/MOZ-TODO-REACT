// この FilterButton コンポーネントは、ToDoリストのフィルター切り替え用ボタンです。タスク一覧を「すべて」「未完了」「完了済み」などの状態に応じてフィルタリングする場面で使用されます。
// このボタンの目的：
// 表示中のフィルター状態を切り替える。
// アクセシビリティにも対応。
function FilterButton(props) {
  return (
    //type="button"：送信ボタンにしない（フォーム内でも安全）。
    // className="btn toggle-btn"：スタイル用のクラス。
    // aria-pressed={props.isPressed}：アクセシビリティのため。現在選択されているボタンであることをスクリーンリーダーに伝える。
    // onClick={() => props.setFilter(props.name)}：ボタンがクリックされたときに、親のsetFilter関数を実行してフィルターを変更。
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      {/* スクリーンリーダー用のテキストで、「Show {name}tasks」と読ませるための構成。
      画面上には props.nameだけが見える（例："All"）、だが読み上げ時は "Show All tasks"
      のように自然に聞こえる。 */}
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
