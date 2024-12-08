import fs from 'fs';

// console.clear();

const sampleInputPath = './sample-1.txt';
const input1Path = './input.txt';

const sampleInput = fs.readFileSync(sampleInputPath, 'utf-8');
const input1 = fs.readFileSync(input1Path, 'utf-8');

const parseMap = (input: string) => {
  return input.split('\r\n').map(row => row.split(''));
}

const drawMap = (map: string[][], antinodes?: AntennaLocation[]) => {
  const clone = map.map(row => row.slice());
  if (antinodes) {
    for (const { y, x } of antinodes) {
      // if (clone[y][x] === '.') {
      clone[y][x] = '#';
      // }
    }
  }
  const mapStr = clone.map(row => row.join('')).join('\n');
  console.log(mapStr);
}


const sampleMap = parseMap(sampleInput);
drawMap(sampleMap);

const inputMap = parseMap(input1);
drawMap(inputMap);

interface AntennaLocation {
  x: number;
  y: number;
}

const getAntenaLocations = (map: string[][]) => {
  const antennaLocations: { [frequency: string]: AntennaLocation[] } = {};

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const frequency = map[y][x];
      if (frequency !== ".") {
        if (!antennaLocations[frequency]) {
          antennaLocations[frequency] = [];
        }
        antennaLocations[frequency].push({ x, y });
      }
    }
  }
  return antennaLocations;
}

//  y -> row
// x -> col
const getAntiNodes = (
  map: string[][],
  antennaLocations: {
    [frequency: string]: AntennaLocation[];
  }) => {
  const antinodes: Set<string> = new Set();


  const isVithinMap = (loc: AntennaLocation) => {
    return loc.y >= 0 && loc.y < map.length && loc.x >= 0 && loc.x < map[loc.y].length
  }

  const isAntena = (loc: AntennaLocation) => {
    // return map[loc.y][loc.x] !== '.';
    return false;
  }

  const getNodes = () => antinodes.values().toArray().map(pos => {
    const [y, x] = pos.split(',').map(Number);
    return { x, y };
  });

  for (const frequency in antennaLocations) {
    const locations = antennaLocations[frequency];
    if (locations.length < 2) continue;

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const loc1 = locations[i];
        const loc2 = locations[j];

        antinodes.add(`${loc1.y},${loc1.x}`);
        antinodes.add(`${loc2.y},${loc2.x}`);

        let diffX = loc2.x - loc1.x;
        let diffY = loc2.y - loc1.y;

        console.log('diffX', diffX);
        console.log('diffY', diffY);
        diffX


        let tmp1 = {...loc1};
        while(true){
          const newLoc1 = { x: tmp1.x - diffX, y: tmp1.y - diffY };
          if (!isVithinMap(newLoc1) ) {
            break;
          }
          antinodes.add(`${newLoc1.y},${newLoc1.x}`);
          tmp1.x = newLoc1.x;
          tmp1.y = newLoc1.y;

          drawMap(map, getNodes());
        }
        let tmp2 = {...loc2}
        while(true){
          const newLoc2 = { x: tmp2.x + diffX, y: tmp2.y + diffY };
          if (!isVithinMap(newLoc2)) {
            break;
          }
          antinodes.add(`${newLoc2.y},${newLoc2.x}`);
          tmp2.x = newLoc2.x;
          tmp2.y = newLoc2.y;
          drawMap(map, getNodes());
        }

      }
    }
  }

  // return positions of antinodes
  return getNodes();
}

// console.log(sampleMap);
const antenaLocations = getAntenaLocations(sampleMap);
console.log(antenaLocations);
const antinodes = getAntiNodes(sampleMap, antenaLocations);
console.log(antinodes);
drawMap(sampleMap, antinodes);
console.log(antinodes.length);
console.log('end');


const antenaLocations2 = getAntenaLocations(inputMap);
console.log(antenaLocations2);
const antinodes2 = getAntiNodes(inputMap, antenaLocations2);
console.log(antinodes2);
drawMap(inputMap, antinodes2);
console.log(antinodes2.length);
console.log('end');