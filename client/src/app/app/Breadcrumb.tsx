'use client';

import {
  Box,
  ChevronsUpDown,
  CloudCog,
  FolderKanban,
  Table2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SelectionMenu({ defaultLabel = 'Select' }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          {defaultLabel} <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {/* <DropdownMenuLabel>Choose</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <Link href='/app/datasets'>
            <DropdownMenuItem>
              <Table2 />
              <span>Datasets</span>
              {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          <Link href='/app/projects'>
            <DropdownMenuItem>
              <FolderKanban />
              <span>Projects</span>
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}

          <Link href='/app/projects'>
            <DropdownMenuItem>
              <Box />
              <span>Deployed Models</span>
              <DropdownMenuShortcut>
                <CloudCog />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(segment => segment !== '');

  const mapper: { [key: string]: JSX.Element } = {
    app: <BreadcrumbLink href='/app'>Dashboard</BreadcrumbLink>,
    projects: SelectionMenu({ defaultLabel: 'Projects' }),
    datasets: SelectionMenu({ defaultLabel: 'Datasets' }),
    models: SelectionMenu({ defaultLabel: 'Deployed Models' }),
    new: <span>New</span>,
    css: <span>CSS Battle</span>,
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => (
          <div key={segment} className='flex items-center justify-center'>
            <BreadcrumbItem key={segment}>
              <BreadcrumbPage>
                {mapper[segment] || <span>{segment}</span>}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index < segments.length - 1 && (
              <BreadcrumbSeparator className='ml-2.5' />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
