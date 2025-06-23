import React from "react";
import { Download, Upload, Settings } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 h-16">
      <div className="flex items-center justify-between h-full relative">
        <div className="flex items-center h-full">
          <img
            src="/logo.png"
            alt="Case Crafter"
            className="h-24 w-auto absolute top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            インポート
          </button>

          <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Excel出力
          </button>

          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            設定
          </button>
        </div>
      </div>
    </header>
  );
};
