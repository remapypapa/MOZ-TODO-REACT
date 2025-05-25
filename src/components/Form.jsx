//この Form.jsx は、ToDo アプリで新しいタスクを追加するための「入力フォーム」のコンポーネントです。
//ReactのuseStateフックを使って、入力フォームの状態（文字列）を管理します。
import { useState } from "react";

//name: ユーザーが入力している文字列を保持する状態。
//setName: その状態を更新する関数。
//初期値は空文字列（""）。
function Form(props) {
  const [name, setName] = useState("");

  //入力があるたびにevent.target.value（＝今入力している文字）をnameにセットします。
  //(event) に渡される event オブジェクトは、Reactによって渡される「合成イベント（SyntheticEvent）」
  //これは、Reactがブラウザのネイティブなイベント（クリック、入力など）をラップして統一的に扱えるようにしたもの
  //eventオブジェクト
  //たとえば onChange や onSubmit などのイベントハンドラが呼ばれたときに、Reactはそのイベントに関する情報を含んだ event オブジェクトを自動で渡します。
  function handleChange(event) {
    console.log(event);
    // console.log("Typing!");
    setName(event.target.value);
  }

  //event.preventDefault()：フォームが送信されてページがリロードされるのを防ぎます。
  //props.addTask(name)：親から渡されたaddTask関数を呼び出し、現在のnameを渡す（タスクを追加）。
  //setName;：setName("") として、送信後に入力欄を空にする。
  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(name);
    setName("");
  }
  return (
    //<form>：送信処理を受け持つタグ。
    <form onSubmit={handleSubmit}>
      {/* ユーザーに「何をすべきか入力してください」と促すラベルです。
htmlFor="new-todo-input" は、対応する <input> の id を指定していて、ラベルと入力欄をリンクしています。
これはアクセシビリティの観点でも重要（画面読み上げソフト対応など）。 */}
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      {/* <input>：ユーザーがタスク名を入力する場所。
      id="new-todo-input"：ラベルと紐づけるための識別子。
      className：CSSスタイルを当てるクラス名。
      name="text"：フォーム送信時にサーバー側で使う名前（今回はあまり使われない）。
      autoComplete="off"：ブラウザの入力履歴を表示させない。 
      value={name}：name状態が入力欄に反映される。
      onChange={handleChange}：入力が変更されるたびに状態を更新。*/}
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      {/* 送信ボタン type="submit"：このボタンをクリックするとフォームが送信される。
      className：見た目を整えるスタイル用のクラス。
      Add：ボタンに表示されるテキスト。 */}
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
