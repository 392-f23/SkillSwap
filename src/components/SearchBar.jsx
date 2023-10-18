import React, { useState } from "react";


// function Search({ details }) {

//   const [searchField, setSearchField] = useState("");

//   const filteredPersons = details.filter(
//     person => {
//       return (
//         person
//         .name
//         .toLowerCase()
//         .includes(searchField.toLowerCase()) ||
//         person
//         .skills-have
//         .toLowerCase()
//         .includes(searchField.toLowerCase())
//       );
//     }
//   );
//   function searchList() {
//     return (
//         <SearchList filteredPersons={filteredPersons} />
//     );
//   }

// const handleChange = e => {
//   setSearchField(e.target.value);
// };
// return (
//     <section className="garamond">
//       <div className="navy georgia ma0 grow">
//         <h2 className="f2">Search your term</h2>
//       </div>
//       <div className="pa2">
//         <input 
//           className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
//           type = "search" 
//           placeholder = "Search People" 
//           onChange = {handleChange}
//         />
//       </div>
//       {searchList()}
//     </section>
//   );
// }

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (e) => {
        console.log("e", e)
        console.log("e.target.value", e.target.value)
        onSearch(e.target.value);
        setSearchTerm(e.target.value);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    );
  };
  
export default SearchBar;