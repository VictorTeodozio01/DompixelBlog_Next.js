'use client';
import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core'; 
import PaginaInicial from '../app/PaginaInicial/page';

export default function HomePage() {

  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme('light'); 
  }, [setColorScheme]);

  return ( 
    <>
      <PaginaInicial></PaginaInicial>  
    </>
  );
}
