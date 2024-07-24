import './input.scss';

const Input = ({
  placeholder,
  setSearch,
  setCurrentPage
}: {
  placeholder: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="search-icon mt-4 flex w-full justify-center">
      <form className="form">
        <button className="pr-4">
          <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          className="w-full min-w-0 flex-grow"
          placeholder={placeholder}
          required
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(0);
          }}
        />
        <button className="reset" type="reset">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Input;
