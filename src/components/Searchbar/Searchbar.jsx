import { MdOutlineImageSearch } from 'react-icons/md';

export function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.search.value);
    // e.currentTarget.reset();
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <MdOutlineImageSearch size={'24'}/>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
