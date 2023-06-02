import { Node, Edge, Path } from '../model/DbModel';

import { edges, path } from './data';

export async function fetchNodes(): Promise<Node[]> {
  const url = 'http://localhost:8080/getNodes';
  const nodes: Node[] = []
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    data.forEach((x: any) => {
      nodes.push({ key: `key-${x.name.toLowerCase()}`, name: x.name });
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  return nodes;
};


export const fetchEdges = (): Edge[] => {
  // TODO: Fetch Edges from your API
  return edges;
};

export const fetchPath = (): Path => {
  // TODO: Fetch Path from your API
  return path;
};
