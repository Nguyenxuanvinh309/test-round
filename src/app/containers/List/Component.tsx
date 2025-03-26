'use client'
import { Flex, Loader, MultiSelect  } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import {useEffect, useState } from "react";
import { FILTER } from "@/utils/constants";
import { useFetch } from "@/app/hooks";
import { IPokemonData } from "./models/type";
import { getPokemonList } from "./services";
import TableComponent from "./components/Table";

const Component = () => {
  const [activePage, setPage] = useState<number>(1);
  const [filters, setFilter] = useState<Array<string>>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const type = searchParams.get("type") || "";
  const {
    data, isLoading
  } = useFetch<Array<IPokemonData>>(getPokemonList(page, type));

  const queryString = filters.map(type => `${encodeURIComponent(type)}`).join(',');

  useEffect(() => {
    router.push(`/?page=${page}${queryString ? `&type=${queryString}` : ''}`);
  }, [page, router, queryString]);

  useEffect(() => {
    if (page) setPage(Number(page || 1));
  }, [page]);

  
  const handleSetPage = (value: number) => setPage(value);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Flex gap={10} direction={'column'} w={'100%'} mih={1000} miw={500}>
          {
            isLoading ? <Flex justify={'center'} w={'100%'}><Loader /></Flex> : (
              <>
                <MultiSelect
                  placeholder="Type of pokemon"
                  data={FILTER}
                  value={filters}
                  onChange={(e) => {
                    setFilter(e as unknown as string[]);
                    const queryString = e.map(type => `${encodeURIComponent(type)}`).join(',');
                    router.push(`/?page=${page}${queryString ? `&type=${queryString}` : ''}`);
                  }}
                  w={"100%"}
                />
                <TableComponent
                  activePage={activePage}
                  data={data}
                  filters={filters}
                  onSetPage={handleSetPage}
                />
              </>
            )
          }
        </Flex>
      </main>
    </div>
  );
};
export default Component;