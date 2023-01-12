import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  console.log({ searchField });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // callback/effect, state vals or prop vals
  // empty, don't trigger callback, just call fetch onMount
  // this function should never be called again except for
  // when the function mounts

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
  };

  // Only want to filterMonsters when things relevant to it change
  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  });

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      {/* {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })} */}
      <SearchBox
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

//// class App extends Component {
//  constructor() {
//    super();
//
//    this.state = {
//      monsters: [],
//      searchField: "",
//    };
//  }
//
//  componentDidMount() {
//    fetch("https://jsonplaceholder.typicode.com/users")
//      .then((response) => response.json())
//      .then((users) =>
//        this.setState(
//          () => {
//            return { monsters: users };
//          },
//          () => {
//            console.log(this.state);
//          }
//        )
//      );
//  }
//
//  // Learn how to increase performance,
//  // even if only for one function
//  onSearchChange = (event) => {
//    const searchField = event.target.value.toLocaleLowerCase();
//    // Best practice is to use non-modifying methods
//
//    this.setState(() => {
//      return { searchField };
//    });
//  };
//
//  render() {
//    const { monsters, searchField } = this.state;
//    const { onSearchChange } = this;
//
//    const filteredMonsters = monsters.filter((monster) => {
//      return monster.name.toLocaleLowerCase().includes(searchField);
//    });
//
//    return (
//         );
//  }
//}

export default App;
