import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/asyncAction";
import { useEffect, useState } from "react";

const DataComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [coinData, setCoinData] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Update coinData when data from redux changes
  useEffect(() => {
    setCoinData(data);
  }, [data]);

  // Search Handler
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setUserSearch(searchValue);
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue) ||
        item.symbol.toLowerCase().includes(searchValue)
    );
    setCoinData(filteredData);
  };

  // Sort by Price Change Percentage
  const sortByPercentage = () => {
    const sortedData = [...coinData].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setCoinData(sortedData);
  };

  // Sort by Market Cap
  const sortByMarketCap = () => {
    const sortedData = [...coinData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setCoinData(sortedData);
  };

  if (loading)
    return (
      <p className="text-white w-full h-full flex justify-center items-center">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-white w-full h-full flex justify-center items-center">
        Error: {error}
      </p>
    );

  return (
    <div className="w-[80vw] h-[80vh] border-black border m-auto overflow-scroll overflow-x-hidden">
      <div className="grid grid-cols-12 gap-4 mb-6">
        <input
          type="text"
          className="outline-white bg-transparent col-span-6 border border-white px-5"
          placeholder="Search By Name or Symbol"
          value={userSearch}
          onChange={handleSearch}
        />
        <button
          className="bg-transparent col-span-3 text-white border border-white py-2 px-4 rounded"
          onClick={sortByPercentage}
        >
          Sort By Percentage
        </button>
        <button
          className="bg-transparent border border-white text-white py-2 col-span-3 px-4 rounded"
          onClick={sortByMarketCap}
        >
          Sort By Mkt Cap
        </button>
      </div>

      {coinData.map((item) => (
        <div
          className="grid grid-cols-12 gap-1 border-b border-white py-5"
          key={item.id}
        >
          <div className="col-span-2 flex items-center justify-around gap-6">
            <div className="w-[49px] h-[50px]">
              <img src={item.image} alt="img" />
            </div>
            <span>{item.name}</span>
          </div>

          <div className="flex items-center col-span-2 justify-center">
            {item.symbol.toUpperCase()}
          </div>
          <div className="flex items-center col-span-1">
            ${item.current_price}
          </div>
          <div className="flex items-center justify-around col-span-2">
            ${item.total_volume}
          </div>
          <div
            className={`flex items-center col-span-2 pl-5 ${
              item.price_change_percentage_24h < 0
                ? "text-red-600"
                : "text-green-400"
            }`}
          >
            {item.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className="flex items-center col-span-3 justify-center">
            Mkt Cap: ${item.market_cap.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
