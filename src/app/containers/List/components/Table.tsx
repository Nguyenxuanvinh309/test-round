/* eslint-disable @next/next/no-img-element */
import { Flex, Pagination, Table, Text  } from "@mantine/core";
import { IPokemon, IPokemonData } from "../models/type";
import { useRouter } from "next/navigation";

type TProps = 
  Record<'activePage', number> &
  Record<'filters', Array<string>> &
  Record<'data', Array<IPokemonData> | undefined> &
  Record<'onSetPage', (value: number) => void>;

const TableComponent = ({
  data,
  activePage,
  filters,
  onSetPage
}: TProps) => {
  const router = useRouter();
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
    <>
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
            onSetPage(e);
          }}
        />
      </Flex>
    </>
  );
};
export default TableComponent;