#!/usr/bin/env node

class Vertex {
    constructor(value) {
      this.value = value;
      this.adjacentVertices = [];
    }
  
    addAdjacentVertex(vertex) {
      this.adjacentVertices.push(vertex);
    }
  
    static bfsTraverse(startingVertex) {
      const queue = [];
      const visitedVertices = {};
  
      visitedVertices[startingVertex.value] = true;
      queue.push(startingVertex);
  
      while (queue.length > 0) {
        const currentVertex = queue.shift();
        console.log(currentVertex.value);
  
        for (const adjacentVertex of currentVertex.adjacentVertices) {
          if (!visitedVertices[adjacentVertex.value]) {
            visitedVertices[adjacentVertex.value] = true;
            queue.push(adjacentVertex);
          }
        }
      }
    }

    static bfsSearch(startingVertex, targetValue) {
        if (startingVertex.value == targetValue) {
            return startingVertex;
        }
        const queue = [];
        const visitedVertices = {};
    
        visitedVertices[startingVertex.value] = true;
        queue.push(startingVertex);
    
        while (queue.length > 0) {
          const currentVertex = queue.shift();
          if (currentVertex.value == targetValue) {
            console.log(`${currentVertex.value} == ${targetValue}!`);
            return currentVertex;
          } else {
            console.log(`${currentVertex.value} =/= ${targetValue}`);
          }
          

    
          for (const adjacentVertex of currentVertex.adjacentVertices) {
            if (!visitedVertices[adjacentVertex.value]) {
              visitedVertices[adjacentVertex.value] = true;
              queue.push(adjacentVertex);
            }
          }
        }
        return null;
      }
  }

const rey = new Vertex("rey");
const kylo = new Vertex("kylo");
const finn = new Vertex("finn");
const poe = new Vertex("poe");
const hux = new Vertex("hux");
const snoke = new Vertex("snoke");
const phasma = new Vertex("phasma");
const maz = new Vertex("maz");
const babuFrik = new Vertex("babu frik");

rey.addAdjacentVertex(kylo);
rey.addAdjacentVertex(finn);
rey.addAdjacentVertex(maz);

finn.addAdjacentVertex(rey);
finn.addAdjacentVertex(poe);
finn.addAdjacentVertex(babuFrik);

poe.addAdjacentVertex(finn);
poe.addAdjacentVertex(hux);

kylo.addAdjacentVertex(rey);
kylo.addAdjacentVertex(snoke);
kylo.addAdjacentVertex(phasma);

hux.addAdjacentVertex(poe);
hux.addAdjacentVertex(phasma);

snoke.addAdjacentVertex(kylo);
phasma.addAdjacentVertex(kylo);
phasma.addAdjacentVertex(hux);

maz.addAdjacentVertex(rey);
babuFrik.addAdjacentVertex(finn);

Vertex.bfsTraverse(rey);
console.log("\n");

Vertex.bfsSearch(rey, "phasma");
console.log("\n");

console.log(Vertex.bfsSearch(rey, "hux"));
console.log("\n");

console.log(Vertex.bfsSearch(snoke, "zorii"))