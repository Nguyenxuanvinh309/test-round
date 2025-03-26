const getPokemonList = (page?: string | number, type?: string) => ({ 
  queryKey: ['pokemon', `${page}`, `${type}`],
  url: `/api/pokemon?limit=24&page=${page}&type=${type || ''}`,
  enabled: !!page
});

export {
  getPokemonList,
}