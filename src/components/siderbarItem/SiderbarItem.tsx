import React, { useState } from 'react';
import { SiderItemProps } from './siderbarItem.types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  IconSiderbarLine,
} from '@/assets/icons'

const SiderbarItem = ({ item }: SiderItemProps) => {
  const { children, label, icon: Icon } = item;
  const pathname = usePathname();
  const [activeChild, setActiveChild] = useState<string | null>(null);

  React.useEffect(() => {
    const active = children.find((child) => pathname === child.href);
    if (active) {
      setActiveChild(active.label);
    } else {
      setActiveChild(null);
    }
  }, [children, pathname]);

  return (
    <div className={cn(`flex mt-2 cursor-pointer flex-col items-start mb-4`)}>
      <div className={cn(`flex items-center hover:bg-ui-yellow rounded-lg mb-2 w-full px-5 py-2 text-black text-[15px] font-semibold`, activeChild && 'bg-ui-yellow')}>
        <Icon />
        <p className='ml-2 uppercase'>{label}</p>
      </div>
      <div>
        {children.map((item) => {
          const isActive = pathname === item.href;
          return (
          <div key={item.label} className='flex ml-7 relative'>
            <IconSiderbarLine className='scale-110 absolute'/>
            <Link  
              href={item.href}
              className={cn(`flex text-black text-sm hover:bg-ui-gray-light py-2 px-4 rounded-lg cursor-pointer w-full ml-4 text-[15px] font-semibold`, isActive && 'bg-ui-gray-light font-bold')}
            >
              {item.label}
            </Link>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiderbarItem;