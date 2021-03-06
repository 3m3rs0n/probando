import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addState } from "../../redux/actions/cytoscape";
import { setSourceNode, setTargetNode } from "../../redux/actions/edgeCreator";
import { setDisplay } from "../../redux/actions/modalStyle";
import { setNewNodePosition } from "../../redux/actions/nodeCreator";
import { setNewPopperPosition } from "../../redux/actions/popperCreator";
import { nextIndex } from "../../redux/actions/currentIndex";
import cytoscape from "cytoscape";
import popper from 'cytoscape-popper';



cytoscape.use( popper );

const Graph = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => state.toolbar);
    const currentIndex = useSelector((state) => state.currentIndex);
    const cytoscapeData = useSelector((state) => state.cytoscapeData[currentIndex]);
    const sourceNode = useSelector((state) => state.edgeCreator.source);

    const [cy, setCy] = useState(cytoscape());

    

    useEffect(() => {
        const newCy = cytoscape({
            container: document.getElementById("cy"),
            style: cytoscapeData.style,
            zoomingEnabled: false,
            userZoomingEnabled: false,
            panningEnabled: false,
            userPanningEnabled: false,
        });
        if (cytoscapeData.elements) {
            if (cytoscapeData.elements.nodes) {
                cytoscapeData.elements.nodes.forEach((element) => {
                    newCy.add(element);
                });
            }
            if (cytoscapeData.elements.edges) {
                cytoscapeData.elements.edges.forEach((element) => {
                    newCy.add(element);
                });
            }
        }
        setCy(newCy);
    }, [cytoscapeData]);

    if (toolbar.node) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target === cy) {
                dispatch(setDisplay("block"));
                dispatch(setNewNodePosition(e.position));
            }
        });
    } else if (toolbar.edge) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target !== cy) {
                if (sourceNode === "") {
                    dispatch(setSourceNode(e.target._private.data.id));
                } else {
                    dispatch(setTargetNode(e.target._private.data.id));
                    dispatch(setNewNodePosition(e.position));
                    dispatch(setDisplay("block"));
                }
            }
        });
    } else if (toolbar.eraser) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            const toDelete = cy.$(`#${e.target._private.data.id}`);
            cy.remove(toDelete);
            dispatch(addState(cy.json(), currentIndex));
            dispatch(nextIndex());
        });
    } else if (toolbar.popper) {
        cy.removeListener("tap");
        cy.on("tap", (e) => {
            if (e.target !== cy) {
                dispatch(setDisplay("block"));
                dispatch(setNewPopperPosition(e.target))
            }
        });
    }
    return <div id="cy"></div>;
};

export default Graph;
