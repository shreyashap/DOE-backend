import { useNavigate } from 'react-router-dom';
import {
  WrenchScrewdriverIcon,
  HashtagIcon,
  CubeIcon,
  ClockIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  Bars3BottomLeftIcon,
  CurrencyRupeeIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';



import React from "react";

export default function DoeCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/doe/${data.DOE_Serial_Number}`)}
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl p-5 transition duration-200 cursor-pointer space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-blue-700">
          {data.Tool || 'Tool'} — {data["Tool_Diameter"]}
        </h2>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <HashtagIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">DOE Serial:</span> {data.DOE_Serial_Number}
        </div>
        <div className="flex items-center gap-2">
          <CubeIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Material:</span> {data["Work Material"]}
        </div>
        <div className="flex items-center gap-2">
          <ArrowTrendingUpIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Speed:</span> {data["Cutting Speed"]}
        </div>
        <div className="flex items-center gap-2">
          <Bars3BottomLeftIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Feed:</span> {data["Feed"]}
        </div>
      </div>

      {/* Response Metrics */}
      <div className="pt-2 border-t">
        <h3 className="text-md font-semibold text-gray-800 mb-2">📊 Response Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-green-600" />
            <span><strong>Cycle time:</strong> {data["Cycle time in Seconds"]}</span>
          </div>
          <div className="flex items-center gap-2">
          <BoltIcon className="h-4 w-4 text-yellow-600" />
            <span><strong>Spindle Load:</strong> {data["Spindle Load"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-4 w-4 text-indigo-600" />
            <span><strong>Tool Life (Nos):</strong> {data["Tool Life in Nos"]}</span>
          </div>
          <div className="flex items-center gap-2">
          <Bars3BottomLeftIcon className="h-4 w-4 text-purple-600" />
            <span><strong>Tool Life (Mtr):</strong> {data["Tool Life in Mtr"]}</span>
          </div>  
          <div className="flex items-center gap-2">
            <CurrencyRupeeIcon className="h-4 w-4 text-rose-600" />
            <span><strong>CPC (Rs):</strong> {data["CPC in Rs"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4 text-pink-600" />
            <span><strong>Diameter CPK:</strong> {data["Diameter CPK"]}</span>
          </div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-4 w-4 text-cyan-600" />
            <span><strong>Surface Finish Cpk:</strong> {data["Surface Finish Cpk"]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
