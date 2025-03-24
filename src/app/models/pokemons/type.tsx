export interface IPokemon {
  id?: string;
  name: string;
  url: string;
  image?: string;
  imageBack?: string;
  types?: {
    name: string;
  }[]
};

export interface IPokemonData {
  count: number;
  results: IPokemon[]
  totalPage?: number;
}