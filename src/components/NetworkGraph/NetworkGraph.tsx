import { MultiGraph } from 'graphology';
import { Sigma } from 'sigma';
import React, { useEffect, useState } from 'react';
import './NetworkGraph.scss';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import { Settings } from 'sigma/settings';
import forceAtlas2 from "graphology-layout-forceatlas2";

import { fetchEdges, fetchNodes, fetchPath } from '../../api/api';
import { Node, Edge, Path } from '../../model/DbModel';
import { SigmaEdge, SigmaNode } from '../../model/SigmaModel';
import routerImg from '../../assets/img/router.svg';
import routerHighlightedImg from '../../assets/img/router-highlighted.svg';


type NetworkGraphProps = {
  pathHighlighted: boolean;
};

const NetworkGraph = (props: NetworkGraphProps): JSX.Element => {
  const { pathHighlighted } = props;

  const [graphRef, setGraphRef] = useState<React.RefObject<HTMLDivElement>>();
  const [renderer, setRenderer] = useState<Sigma>();
  const [path, setPath] = useState<Path>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [sigmaNodes, setSigmaNodes] = useState<SigmaNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [sigmaEdges, setSigmaEdges] = useState<SigmaEdge[]>([]);


  useEffect(() => {
    setGraphRef(React.createRef<HTMLDivElement>());
  }, []);

  useEffect(() => {
    if (nodes?.length !== 0) {
      drawGraph();
    }
  }, [graphRef, path, sigmaNodes, sigmaEdges]);

  useEffect(() => {
    if (pathHighlighted) {
      setPath(getPath());
    } else {
      setPath(undefined);
    }
  }, [pathHighlighted]);

  useEffect(() => {
    fetchNodes().then(result => {
      setNodes(result)
      fetchEdges().then(result => {
        setEdges(result)
      });
    });
  }, []);

  useEffect(() => {
    setSigmaNodes(convertToSigmaNodes(nodes));
  }, [nodes]);


  useEffect(() => {
    setSigmaEdges(convertToSigmaEdges(edges));
  }, [edges]);



  const getPath = (): Path => {
    return fetchPath();
  };

  const drawGraph = (): void => {
    const container = graphRef?.current;
    if (container === undefined || container == null) {
      return;
    }

    resetGraph();

    const graph = new MultiGraph();
    const settings: Partial<Settings> = {
      stagePadding: 100,
      nodeProgramClasses: {
        image: getNodeProgramImage(),
      },
      labelColor: { color: '#2b2c30' },
    };

    addNodesToGraph(graph, sigmaNodes);
    addEdgesToGraph(graph, sigmaEdges);

    forceAtlas2.assign(graph, 600);
    const sigmaRenderer = new Sigma(graph, container, settings);

    setRenderer(sigmaRenderer);
  };

  const resetGraph = (): void => {
    renderer?.clear();
    renderer?.kill();
    renderer?.refresh();
  };

  const convertToSigmaNodes = (nodes: Node[]): SigmaNode[] => {
    const sigmaNodes = new Array<SigmaNode>();
    nodes.forEach((node) => {
      const sigmaNode: SigmaNode = {
        key: node.key,
        label: node.name,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30,
        type: 'image',
        image: routerImg,
      };

      if (pathHighlighted && path?.nodes.includes(node.key)) {
        sigmaNode.image = routerHighlightedImg;
      }

      sigmaNodes.push(sigmaNode);
    });

    return sigmaNodes;
  };

  const convertToSigmaEdges = (edges: Edge[]): SigmaEdge[] => {
    const sigmaEdges = new Array<SigmaEdge>();

    edges.forEach((edge) => {
      const sigmaEdge: SigmaEdge = {
        key: edge.key,
        from: edge.fromNodeKey,
        to: edge.toNodeKey,
        size: 3,
        color: '#004643',
      };

      if (pathHighlighted && path?.edges.includes(edge.key)) {
        sigmaEdge.size = 5;
        sigmaEdge.color = '#6b0f1a';
      }

      sigmaEdges.push(sigmaEdge);
    });

    return sigmaEdges;
  };

  const addNodesToGraph = (graph: MultiGraph, nodes: SigmaNode[]): void => {
    nodes.forEach((node) => {
      graph.addNode(node.key, node);
    });
  };

  const addEdgesToGraph = (graph: MultiGraph, edges: SigmaEdge[]): void => {
    edges.forEach((edge) => {
      graph.addEdge(edge.from, edge.to, edge);
    });
  };

  return <div className="NetworkGraph" ref={graphRef}></div>;
};

export default NetworkGraph;
