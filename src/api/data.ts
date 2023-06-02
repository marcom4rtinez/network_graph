import { Node, Edge, Path } from '../model/DbModel';
// export const nodes: Node[] = [
//   {
//     key: 'key-xr-1',
//     name: 'XR-1'
//   },
//   {
//     key: 'key-xr-2',
//     name: 'XR-2'
//   },
//   {
//     key: 'key-xr-3',
//     name: 'XR-3'
//   },
//   {
//     key: 'key-xr-4',
//     name: 'XR-4'
//   },
//   {
//     key: 'key-xr-5',
//     name: 'XR-5'
//   },
//   {
//     key: 'key-xr-6',
//     name: 'XR-6'
//   },
//   {
//     key: 'key-xr-7',
//     name: 'XR-7'
//   },
//   {
//     key: 'key-xr-8',
//     name: 'XR-8'
//   }
// ];

export const edges: Edge[] = [
  {
    key: 'key-edge-1',
    fromNodeKey: 'key-xr-1',
    toNodeKey: 'key-xr-2',
  },
  {
    key: 'key-edge-2',
    fromNodeKey: 'key-xr-1',
    toNodeKey: 'key-xr-3',
  },
  {
    key: 'key-edge-3',
    fromNodeKey: 'key-xr-1',
    toNodeKey: 'key-xr-4',
  },
  {
    key: 'key-edge-4',
    fromNodeKey: 'key-xr-2',
    toNodeKey: 'key-xr-3',
  },
  {
    key: 'key-edge-5',
    fromNodeKey: 'key-xr-2',
    toNodeKey: 'key-xr-4',
  },
  {
    key: 'key-edge-6',
    fromNodeKey: 'key-xr-3',
    toNodeKey: 'key-xr-4',
  },
];

export const path: Path = {
  nodes: ['key-xr-4', 'key-xr-1', 'key-xr-2'],
  edges: ['key-edge-3', 'key-edge-1'],
};
