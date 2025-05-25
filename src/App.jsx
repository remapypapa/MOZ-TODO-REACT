//このReactコードは、シンプルな**Todoアプリ（TodoMatic）**のメインコンポーネントAppです。ユーザーはタスクを追加・完了・削除できます。
// useStateでタスク状態（tasks）を管理
// タスクの追加・削除・完了状態切替の関数を提供
// 子コンポーネント（Todo, Form, FilterButton）を使ってUIを構築

import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

//App コンポーネントは親から tasks という props を受け取っています（これは main.jsx 側で渡されていた DATA です）。
function App(props) {
  //useStateでタスク状態を管理
  //初期値はprops.tasksから受け取る（親コンポーネントが提供する）
  //tasksはタスクの配列、各タスクは{ id, name, completed }形式
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  //タスク完了状態を切り替えるtoggleTaskCompleted
  //指定されたIDのタスクのcompletedを反転（true ⇄ false）
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      console.log(tasks[0]);
      // このタスクが編集されたタスクと同じ ID を持っている場合
      if (id === task.id) {
        // オブジェクトを開いて、 `completed` プロップが
        // 反転された新しいオブジェクトを作成します。
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // タスクを削除するdeleteTask;
  //指定されたIDのタスクを除外して更新
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //このコードは、Reactで 配列 tasks に含まれるタスクデータを使って <Todo /> コンポーネントをリストとしてレンダリング するためのもの
  //map() を使って tasks配列を<Todo />コンポーネントに変換
  //tasks?.map(...) は オプショナルチェーン（?.） を使っており、tasks が null や undefined のときに .map() を実行せずスキップします。
  //.map() は、配列 tasks の各要素に対して、task を引数にして以下のJSXを生成します。
  //各タスクは <Todo> として表示される。
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    //各 task オブジェクトの情報を、Todo コンポーネントに渡しています。
    //id, name, completed はすべて props として Todo に渡されます。
    //key={task.id} は Reactが各要素を一意に識別するためのキー。リストレンダリング時に必要。
    //最終的に taskList には、<Todo /> コンポーネントの配列が格納されます。
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //タスクを追加するaddTask関数
  //nameを受け取り、ユニークIDを生成（nanoid使用）
  //新しいタスクを現在の配列に追加;
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //残りタスク数の表示
  //タスクの数に応じて"task"/"tasks"を切り替えて見出し文を作成
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // タスクをコピーし、名前を更新する
        return { ...task, name: newName };
      }
      // 編集されたタスクでない場合は、元のタスクを返します。
      return task;
    });
    setTasks(editedTaskList);
  }

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    //アプリのタイトルを表示。
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* フォームコンポーネント
タスクを新しく追加するためのフォーム（Form.js で定義されているコンポーネント）を表示しています。コメントアウトされている <form> は元々直接書かれていたもので、今は Form に置き換えたということです。 */}
      <Form addTask={addTask} />
      {/* <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form> */}
      {/* フィルター切り替えボタンが3つある状態です（"All", "Active", "Completed"
      を想定してる）。現時点では FilterButton に props
      がないので、今後ラベルや状態を渡す実装になるはずです。 */}

      {/* FilterButtonはフィルタ機能用（未実装か外部で定義） */}
      <div className="filters btn-group stack-exception">
        {filterList}

        {/* <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button> */}
      </div>
      {/* タスク残り数 */}
      {/* 残っているタスクの数を表示。今は固定で「3」となっているけど、普通は状態（state）を使って動的に変えるのが理想です。 */}
      {/* <h2 id="list-heading">3 tasks remaining</h2> */}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      {/* タスクリストの表示 */}
      {/* <ul> 要素でタスクリストを表示。
taskList は先ほど .map() で作ったリスト。
aria-labelledby="list-heading" によってアクセシビリティも意識されている。 */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-0" type="checkbox" defaultChecked />
            <label className="todo-label" htmlFor="todo-0">
              Eat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-1" type="checkbox" />
            <label className="todo-label" htmlFor="todo-1">
              Sleep
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Sleep</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Sleep</span>
            </button>
          </div>
        </li>
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-2" type="checkbox" />
            <label className="todo-label" htmlFor="todo-2">
              Repeat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Repeat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Repeat</span>
            </button>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default App;

//大量のコメントがありますが、これは：
//元々 HTML として書いていた UI
//今はそれぞれ Form, FilterButton, Todo などのコンポーネントとして整理された
//という流れを示しています。開発の過程で、直接 HTML を書いていたものをコンポーネントに分けた、ということです。
