//Reactでよく使われる「ToDoリスト」アプリの一部で、1つのタスクを表示・編集するためのテンプレート（JSX）です。editingTemplate は「編集モード」のUI、viewTemplate は「表示モード」のUIを表しています。

import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props) {
  //isEditing：今編集中かどうかを管理するフラグ（初期値はfalse）。
  //newName：編集中のテキスト入力の状態（inputのvalue）。
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const wasEditing = usePrevious(isEditing);
  console.log(wasEditing);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  // console.log(editButtonRef.current);

  //入力フォームで文字が入力された時に呼ばれ、newNameを更新します。
  function handleChange(e) {
    setNewName(e.target.value);
  }

  //フォームの送信時に呼ばれ、親のeditTask関数を呼び出して内容を保存。
  //入力をリセットして編集モードを終了。
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  //編集モード
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        {/* label と input が連動（htmlFor と id） */}
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        {/* //input には value={newName} と onChange を指定。 */}
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>

      {/* ボタン（キャンセル・保存） */}
      <div className="btn-group">
        {/* Cancel：編集モード終了。 */}
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        {/* Save：handleSubmitで変更を保存。 */}
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  //表示モード
  const viewTemplate = (
    <div className="stack-small">
      {/* チェックボックスとタスク名表示 */}
      {/* props.id：タスクのID（Reactでkeyとしてもよく使われる）
      props.name：タスクの名前 
      props.completed：チェック状態（trueならチェック済み）
      props.toggleTaskCompleted()：チェック状態の切り替え関数（親から渡される）
      変更されたら props.toggleTaskCompleted(props.id) を呼ぶ。 */}
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      {/* ボタン（編集・削除） */}
      <div className="btn-group">
        {/* Edit：isEditing を true に。 */}
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        {/* Delete：props.deleteTask(props.id) で削除を親に依頼。 */}
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  // return (
  //   <li className="todo stack-small">
  //     {/* id={props.id}：各タスクの識別子。チェックボックスとラベルを結びつけるために使います。
  //     type="checkbox"：チェック式の入力。タスクの完了状態を表します。
  //     defaultChecked={props.completed}： trueなら最初からチェック済み。
  //     falseなら未チェック。
  //     labelはクリックしやすくするためのもの。htmlForによりチェックボックスとリンクしています。
  //     {props.name}：タスク名（例：「Eat」など）を表示。 */}
  //     <div className="c-cb">
  //       {/* <input id={props.id} type="checkbox" defaultChecked={props.completed} /> */}
  //       <input
  //         id={props.id}
  //         type="checkbox"
  //         defaultChecked={props.completed}
  //         onChange={() => props.toggleTaskCompleted(props.id)}
  //       />
  //       <label className="todo-label" htmlFor={props.id}>
  //         {props.name}
  //       </label>
  //     </div>
  //     {/* ボタン群(編集・削除)
  //     Editボタン：タスクの名前を変更するためのボタン（機能はまだ未実装）。
  //     Deleteボタン：タスクを削除するためのボタン（これも未実装）。
  //     <span className="visually-hidden">{props.name}</span>
  //     ：スクリーンリーダー用のテキストで、視覚的には見えませんが、音声読み上げの際に「Edit
  //     Eat」などのように読みやすくするための工夫です。 */}
  //     <div className="btn-group">
  //       <button type="button" className="btn">
  //         Edit <span className="visually-hidden">{props.name}</span>
  //       </button>
  //       <button
  //         type="button"
  //         className="btn btn__danger"
  //         onClick={() => props.deleteTask(props.id)}
  //       >
  //         Delete <span className="visually-hidden">{props.name}</span>
  //       </button>
  //     </div>
  //   </li>

  // );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // console.log("main render");

  //isEditing（state）は「編集モードかどうか」を管理。
  //条件分岐で editingTemplate（編集モード）か viewTemplate（表示モード）を切り替えています。
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
