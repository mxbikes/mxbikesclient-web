export default function Example({title, options, select, onChangeHandler}) {
    return (
       <div>
          <div>
          <label className="block text-sm font-medium text-slate-700">{title}</label>
          <select disabled={options.length <= 0 } value={select || ''} onChange={onChangeHandler}  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option value={""}>All</option>
            {(options.length > 0) && options.map((option) => (
              <option key={option.Name} value={option.Name}>{option.Name}</option>
            ))}
          </select>
        </div>
      </div>
    );
}