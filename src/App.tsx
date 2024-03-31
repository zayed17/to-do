import React, { useEffect, useState } from "react";
import "./App.css";

type items = {
  title: string;
  id: string;
  completed: boolean;
};

function App() {
  const storedItems: items[] = JSON.parse(
    localStorage.getItem("items") ?? "[]"
  );

  const [item, setitem] = useState<items[]>(storedItems);

  const [inputvalue, setinputvalue] = useState<string>("");

  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setitem((prev) => [
      ...prev,
      { title: inputvalue, id: Date.now().toString(), completed: false },
    ]);
    setinputvalue("");
  };

  const handledelete = (id: string) => {
    setitem((prev) => prev.filter((data) => data.id !== id));
  };

  const checkbox = (id: string) => {
    setitem((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, completed: !item.completed };
          // localStorage.setItem(item.id, JSON.stringify(updatedItem));
          return updatedItem;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <h1 className="heading">To-Do List</h1>
      <div className="w-[350px]">
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            className="mx-2"
            value={inputvalue}
            onChange={(event) => setinputvalue(event.target.value)}
          />
          <button className="text-white rounded shadow-md p-2">
            <i className="material-icons text-sm">add</i>
          </button>
        </form>
        <div className="h-60 overflow-y-auto">
          {item.map((data) => (
            <div
              key={data.id}
              className="flex justify-between items-center border border-slate-600 pl-2 mb-2 mr-1"
            >
              <label className="flex items-center text-white">
                <input
                  checked={data.completed}
                  onChange={() => checkbox(data.id)}
                  type="checkbox"
                />
                <span
                  className="ml-2"
                  style={{
                    textDecoration: data.completed ? "line-through" : "none",
                  }}
                >
                  {data.title}
                </span>
              </label>
              <button onClick={() => handledelete(data.id)}>
                <i className="material-icons text-sm  text-white">delete</i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
