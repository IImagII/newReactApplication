import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import { useSearchUsersQuery } from '../store/github/github.api';

export function HomePage() {
   const [search, setSearch] = useState('');
   const [dropdown, setDropdown] = useState(false);

   const debounce = useDebounce(search);

   const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
      skip: debounce.length < 3,
      refetchOnFocus: true,
   });

   useEffect(() => {
      setDropdown(debounce.length > 3 && data?.length! > 0);
   }, [debounce, data]);

   return (
      <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
         {isError && (
            <p className='text-center text-red-600 '>Something went wrong...</p>
         )}
         <div className='relative w-[560px]'>
            <input
               type='text'
               className='border py-2 px-4 w-full h-[42px] mb-2'
               placeholder='Search for Gitub username...'
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            {debounce && (
               <ul className='list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white p-[10px]'>
                  {isLoading && <p className='text-center'>Loading...</p>}
                  {data?.map((user) => (
                     <li
                        key={user.id}
                        className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                     >
                        {user.login}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
}
