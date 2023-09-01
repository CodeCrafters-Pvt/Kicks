import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer=useRef(null)
  const results = [
    { name: "shamly", value: "shamly" },
    { name: "malithi", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
    { name: "nishshanka", value: "shamly" },
  ];

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextCountIndex = 0;
    if (key === "ArrowDown")
      nextCountIndex = (focusedIndex + 1) % results.length;
    if (key === "ArrowUp")
      nextCountIndex = (focusedIndex + results.length - 1) % results.length;
    if (key === "Escape") 
    if (key === "Enter") 
    setFocusedIndex(nextCountIndex)
  };

  useEffect(()=>{
    if(!resultContainer.current) return

    resultContainer.current.scrollIntoView({
      block:"center"
    })
  },[focusedIndex])

  return (
    <div className="relative" tabIndex={1} onKeyDown={handleKeyDown}>
      <input
        placeholder="search for shoes"
        className="w-[200px] px-5 py-1 outline outline-1 outline-gray-500 focus:outline-gray-800 rounded-full transition"
      />
      <div className="absolute mt-1 w-full p-2 bg-light shadow-lg rounded-bl rounded-br max-h-36  overflow-y-hidden">
        {results.map((item, index) => (
          <div
            key={index}
            ref={index===focusedIndex?resultContainer:null}
            style={{
              background:
              index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
            }}
            className="cursor-pointer hover:bg-dark hover:bg-opacity-10 p-2"
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
