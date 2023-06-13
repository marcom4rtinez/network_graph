import { Node, Edge, Path } from '../model/DbModel';

const apiEndpoint = "http://localhost:8080/"

export async function fetchNodes(): Promise<Node[]> {
  const endpoint = 'getNodes';
  const nodes: Node[] = []
  try {
    const response = await fetch(apiEndpoint + endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    data.forEach((x: any) => {
      nodes.push({ key: x.key, name: x.name });
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  return nodes;
};


export async function fetchEdges(): Promise<Edge[]> {
  const endpoint = 'getLinks';
  const edges: Edge[] = []
  try {
    const response = await fetch(apiEndpoint + endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    data.forEach((x: any) => {
      edges.push({ key: x.from + x.to, fromNodeKey: x.from, toNodeKey: x.to });
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  return edges;
};


// This is for future use of highlight path
const path: Path = {
  nodes: [],
  edges: [],
  // nodes: ['key-xr-4', 'key-xr-1', 'key-xr-2'],
  // edges: ['key-edge-3', 'key-edge-1'],
};

export const fetchPath = (): Path => {
  // TODO: Fetch Path from your API
  return path;
};


