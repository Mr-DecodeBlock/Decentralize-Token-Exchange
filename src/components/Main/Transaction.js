import React from "react";

const Transaction = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="bg-[#20232C] p-4 lg:col-span-2 rounded-md text-white">
      <p className="text-lg">My Transaction </p>
      <div className="flex flex-row justify-end mb-5  items-center space-x-8 cursor-pointer">
        <div
          onClick={() => {
            setOpenTab(1);
          }}
          className={
            openTab === 1
              ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
              : ""
          }
        >
          Trade
        </div>
        <div
          onClick={() => {
            setOpenTab(2);
          }}
          className={
            openTab === 2
              ? `class="inline-block p-0 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
              : ""
          }
        >
          Order
        </div>
      </div>
      {openTab === 1 ? (
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3">
                    DDAP
                  </th>
                  <th scope="col" class="px-6 py-3">
                    DDAP/ETH
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
      {openTab === 2 ? (
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D26] dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3">
                    DDAP
                  </th>
                  <th scope="col" class="px-6 py-3">
                    DDAP/ETH
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-[#20232C] even:dark:bg-[#1A1D26]">
                  <td class="px-6 py-4">9:00am</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">0.01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transaction;
