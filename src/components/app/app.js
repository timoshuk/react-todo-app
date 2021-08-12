import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    term: "",
    filter: "all"
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => {
        return el.id === id;
      });

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];
      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      let arr = [...todoData, newItem];

      return {
        todoData: arr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => {
      return el.id === id;
    });

    const oldData = arr[idx];
    const newItem = { ...oldData, [propName]: !oldData[propName] };
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);

    return [...before, newItem, ...after];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  onSearchChnge = term => {
    this.setState({ term });
  };

  search(items, term) {
    return items.filter(item => {
      if (term.length === 0) {
        return items;
      }

      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);

      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    let doneCount = todoData.filter(el => el.done).length;
    let todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={doneCount} done={todoCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChnge={this.onSearchChnge} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem addItem={this.addItem} />
      </div>
    );
  }
}
