const input =
    `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const part1 = (input: string) => {
    const lines = input.split('\n');
    const map = lines.map(it => it.split(''));
    // y -> row
    // x -> col 

    //  map regionId to set of points
    const regions: {
        [regionId: string]: Set<string>;
    } = {};

    // map point to regionId
    const pointToRegion: {
        [point: string]: string;
    } = {};

    const allPoints = map.flatMap((row, rowIndex) => {
        return row.map((col, colIndex) => {
            return { row: rowIndex, col: colIndex, value: col };
        });
    });

    const registerPoint = (row: number, col: number, regionId: string) => {
        if (!regions[regionId]) {
            regions[regionId] = new Set<string>();
        }
        regions[regionId].add(`${row}-${col}`);
        pointToRegion[`${row}-${col}`] = regionId;
    }

    const searchForSiblings = (row: number, col: number, regionId: string, regionValue: string) => {
        console.log('searchForSiblings', row, col, regionId, regionValue);
     
        const value = map[row][col];
        if (value !== regionValue) {
            return;
        }

        registerPoint(row, col, regionId);

        if (map[row + 1]?.[col] && !pointToRegion[`${row + 1}-${col}`]) {
            searchForSiblings(row + 1, col, regionId, regionValue);
        }
        if (map[row]?.[col + 1] && !pointToRegion[`${row}-${col + 1}`]) {
            searchForSiblings(row, col + 1, regionId, regionValue);
        }
        if(map[row - 1]?.[col] && !pointToRegion[`${row - 1}-${col}`]) {
            searchForSiblings(row - 1, col, regionId, regionValue);
        }
        if(map[row]?.[col - 1] && !pointToRegion[`${row}-${col - 1}`]) {
            searchForSiblings(row, col - 1, regionId, regionValue);
        }
    }

    allPoints.forEach(({ row, col, value }) => {
        if (pointToRegion[`${row}-${col}`]) {
            return;
        };
        // let's create a region for this point and let's explore all the points that are connected to this point
        let regionId = String(Object.keys(regions).length + '-' + value);
        registerPoint(row, col, regionId);
        searchForSiblings(row, col, regionId, value);
    });





    const printRegions = () => {
        for (const key in regions) {
            const [id, char] = key.split('-');
            const mapOfRegion = regions[key];
            const tempMap = map.map(it => it.map(() => '.'));
            for (const point of mapOfRegion) {
                const [row, col] = point.split('-').map(Number);
                tempMap[row][col] = char;
            }
            const tempMapStr = tempMap.map(it => it.join('')).join('\n');
            console.log(`Region:${char}:\n`, tempMapStr);
        }
    }

    printRegions();

    let total = 0;
    for (const regionId in regions) {
        const region = regions[regionId];
        const area = region.size;
        const perimeter = region.values().toArray().reduce((acc, point) => {
            const [row, col] = point.split('-').map(Number);
            const siblings = [
                `${row - 1}-${col}`,
                `${row + 1}-${col}`,
                `${row}-${col - 1}`,
                `${row}-${col + 1}`
            ];
            return acc + siblings.filter(it => !region.has(it)).length;
        }, 0);
        console.log('Region:', regionId, 'Area:', area, 'Perimeter:', perimeter);
        total += area * perimeter;
    }
    console.log('Total:', total);
}


part1(input);