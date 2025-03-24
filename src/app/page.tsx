/* eslint-disable @next/next/no-img-element */

'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Loader, MultiSelect, Pagination, Table, Text  } from "@mantine/core";
import useFetch from "./hooks/useFetch";
import { getPokemonList } from "./models/pokemons";
import { IPokemon, IPokemonData } from "./models/pokemons/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FILTER } from "@/utils/constants";

const Home = () => {
  const [activePage, setPage] = useState(1);
  const [filters, setFilter] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const type = searchParams.get("type") || "";
  const {
    data, isLoading
  } = useFetch<IPokemonData[]>(getPokemonList(page, type));

  const queryString = filters.map(type => `${encodeURIComponent(type)}`).join(',');

  useEffect(() => {
    router.push(`/?page=${page}${queryString ? `&type=${queryString}` : ''}`);
  }, [page, router, queryString]);

  useEffect(() => {
    if (page) setPage(Number(page || 1));
  }, [page]);

  const results = (data as unknown as IPokemonData)?.results || [];
  const rows = results?.map((element: IPokemon) => (
    <Table.Tr key={element.name}>
      <Table.Td style={{ textAlign: "center" }}>{element.id}</Table.Td>
      <Table.Td style={{ textAlign: "center" }}>{element.name}</Table.Td>
      <Table.Td>
        <Flex gap={20} justify={'center'} w={'100%'}>
          <img src={element.image} alt={element.name} width={50} height={50} />
          <img src={element.imageBack} alt={element.name} width={50} height={50} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

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
                <Table w={500}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                      <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                      <Table.Th style={{ textAlign: "center" }}>Image</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                {
                  results?.length === 0 ? 
                    <Flex justify={'center'} w={'100%'}>
                      <Text ta="center" size="lg">Not found</Text>
                    </Flex> : 
                  <></>
                }
                <Flex justify={'center'} w={'100%'}>
                <Pagination 
                  value={activePage}
                  total={(data as unknown as IPokemonData)?.totalPage || 0}
                  onChange={(e) => {
                    const queryString = filters.map(type => `${encodeURIComponent(type)}`).join(',');
                    router.push(`/?page=${e}${queryString ? `&type=${queryString}` : ''}`);
                    setPage(e);
                  }}
                />
                </Flex>
              </>
            )
          }
        </Flex>
      </main>
    </div>
  );
};
export default Home;