import { Search } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => setSearchTerm(event.target.value);

  return (
    <>
      <Form
        className="flex justify-center items-center gap-2"
        action="/shows"
        method="GET"
      >
        <button type="submit">
          <Search className="text-white hover:scale-125 transition-all duration-200 cursor-pointer" />
        </button>
        <input
          className="bg-white sm:px-24 py-1 text-center sm:text-xl font-bold rounded-4xl"
          type="search"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="search"
        />
      </Form>
    </>
  );
}
