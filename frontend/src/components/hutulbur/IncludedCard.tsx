import { Info } from "lucide-react";
const IncludedCard = ({ arr }: { arr: string[] }) => {
  return (
    <div className="bg-green-100 dark:bg-gray-700/30 rounded-xl p-6 border border-amber-100 dark:border-green-800/30">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">
          Хөтөлбөртэй аялалд багтсан зүйлс:
        </h3>
      </div>
      <ul className="grid md:grid-cols-2 gap-3">
        {arr.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncludedCard;
