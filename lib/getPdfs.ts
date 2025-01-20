export async function getPdfs() {
  const res = await fetch('https://lilar-e.github.io/libraryJSON/data.json', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

