import { useState } from "react";

interface DataItem {
  id: number;
  value: string;
  number: number;
}

// Generates a large array of data items for demonstration purposes, do not need to modify.
const generateDataItems = (count: number): DataItem[] => {
  return Array.from({ length: count }, (v, k) => ({
    id: k,
    value: `Item ${k}`,
    number: Math.floor(Math.random() * 100),
  }));
};

export const DataTable: React.FC = () => {
  const [dataItems, setDataItems] = useState<DataItem[]>(
    generateDataItems(1000)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const processedItems = (() => {
    return dataItems.reduce<DataItem[]>((acc, item) => {
      if (item.value.toLowerCase().includes(searchTerm.toLowerCase())) {
        const newItem = { ...item, number: item.number * 2 };
        return [...acc, newItem];
      }
      return acc;
    }, []);
  })();

  const total = () => {
    let runningTotal = 0;
    const dataItems: any = [];

    runningTotal = dataItems
      .map((item: any) => item.number)
      .reduce((a: number, b: number) => a + b, 0);

    return runningTotal;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {processedItems.map((item) => (
            <tr key={Math.random()}>
              <td>{item.id}</td>
              <td>{item.value}</td>
              <td>{item.number}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Total()</td>
            <td>{total()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
