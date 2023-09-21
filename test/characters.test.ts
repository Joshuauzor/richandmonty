export async function fetchCharacters(): Promise<ICharacters[]> {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const responseData = await response.json();
  return responseData.results as ICharacters[];
}

beforeEach(() => {
  fetchCharacters();
});

describe('Fetching Tests', () => {
  it('Should return the array of characters', async () => {
    const response = await fetchCharacters();
    expect(Array.isArray(response)).toBe(true);
  });
});
