
let keys = new Map();
let equals = new Map();
let records = new Map();

function format(nodes) {

  client = {
      personName: nodes[0].pp,
      level: 0,
      siblingLevel: 0,
      relation: '',
      personID: Number(nodes[0].pid),
      to: ''
  }

  const result = [];
  nodes.forEach((node)=> result.push(node));

  // console.log('format function called', result);

  return {result, client};

}

function joinFamilies(visited, key, family){
  if(visited[key] == 1) return;
  visited[key] = 1;
  records.get(key).forEach((record) => {
      family.push(record);
  })
  equals.get(key).forEach((otherKey) => {
      joinFamilies(visited, otherKey, family);
  })
}

function separateFamilies(relations){
  let key = -1;
  relations.forEach((row) => {
      if(keys.has(row.pid) && keys.has(row.sid)){
          equals.get(keys.get(row.pid)).push(keys.get(row.sid));
          equals.get(keys.get(row.sid)).push(keys.get(row.pid));
          records.get(keys.get(row.pid)).push(row);
      } else if(keys.has(row.pid)){
          oldKey = keys.get(row.pid);
          keys.set(row.sid, oldKey);
          records.get(oldKey).push(row);
      } else if(keys.has(row.sid)){
          oldKey = keys.get(row.sid);
          keys.set(row.pid, oldKey);
          records.get(oldKey).push(row);
      } else {
          key++;   /// represents the temporary family ID
          keys.set(row.pid, key);
          keys.set(row.sid, key);
          equals.set(key, []);
          records.set(key, [row]);
      }
  })

  // console.log('keys: ',keys);
  // console.log('records: ',records);
  // console.log('equals: ',equals);

  let visited = new Array(key+1).fill(0);
  let length = 0;
  const families = [];
  for(let i = 0; i <= key; i++){
      let family = [];
      if(visited[i] == 0){
          joinFamilies(visited, i, family);
          length += family.length;
          // console.log('Before', family);
          if(family.length) {
              families.push(format(family));
          }
      }
  }
  // console.log('Families: ',families)
  // console.log('resultArray: ',families[0].resultArray)
  keys = new Map();
  equals = new Map();
  records = new Map();
  return families;
}

module.exports = {
  separateFamilies
}