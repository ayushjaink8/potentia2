
import { exactRelations, oppositeMapWithGender, rMap, siblingMap, oppositeMap, genderMap } from "../relationDictionary";


function sortData(hashMap){

  let resultArray = [];
  hashMap.forEach((value, key) => {
    // let data = { key, value };
    resultArray.push(value);
  });

  console.log('before sort: ',resultArray)
  resultArray.sort((e1,e2)=>{
    if(e1.gLevel < e2.gLevel){
      return 1;
    } else if (e1.gLevel === e2.gLevel && e1.siblingLevel > e2.siblingLevel){
      return 1;
    } else return -1;
  })

  return resultArray;
}


export function ClntClntRelLogic(data) {

  let Family_id = data.id;
  let nodes = [...data.value];

  let headID = nodes[0].ClientID_1;
  let headName = nodes[0].ClientName_1;

  let hashMap = new Map();

  let head = {
      Family_id,
    personID: Number(headID),
    personName: headName,
    gLevel: 0,
    siblingLevel: 0,
    relation: "",
    exactRelationFlow: "Head",
    relation_flow: "Head",
    relationType: "exact",        //  types:   exact  ||  indirect  ||   ambigious
  };

  hashMap.set(headID, head);       // global map which will be the resulting output

  let noChange;
  // let itr = 0;

  do {

    let tempMap = new Map(hashMap);   // making a copy of current state of hashmap
    noChange = false;

    // itr++;
    // console.log("\nAfter", itr,"Iteration: ", tempMap);

    for (let i = 0; i < nodes.length; i++) {

      let node = nodes[i];   // current relation is called as node   whereas   nodes refers to the array of relations

      if (tempMap.get(node.ClientID_1) !== undefined && tempMap.get(node.ClientID_2) === undefined) {

        let otherPerson = tempMap.get(node.ClientID_1);

        let personID = Number(node.ClientID_2);
        let gLevel = otherPerson.gLevel + rMap[node.csvRelation];
        let relation = node.csvRelation;
        let siblingLevel = otherPerson.siblingLevel + siblingMap[relation];
        let relation_flow = otherPerson.relation_flow + "'s " + relation;

        hashMap.set(node.ClientID_2, {
          Family_id,
          personID,
          personName: node.ClientName_2,
          gLevel,
          siblingLevel,
          relation,
          relation_flow,
          relationType: "exact",
        });

        nodes.splice(i, 1);
        i--;
        noChange = true;          // To make sure a disjoin set doesn't make an infinite loop
      }

      else if (tempMap.get(node.ClientID_2) !== undefined && tempMap.get(node.ClientID_1) === undefined) {

        let otherPerson = tempMap.get(node.ClientID_2);

        let personID = Number(node.ClientID_1);
        let gLevel = otherPerson.gLevel - rMap[node.csvRelation];
        let siblingLevel = otherPerson.siblingLevel + siblingMap[node.csvRelation];
        let relation = oppositeMap[node.csvRelation];          // check for gender map here to get the exact relation instead of ambigious!
        let relation_flow = otherPerson.relation_flow + "'s " + relation;

        hashMap.set(node.ClientID_1, {
          Family_id,
          personID,
          personName: node.ClientName_1,
          gLevel,
          siblingLevel,
          relation,
          relation_flow,
          relationType: "exact",
        });

        nodes.splice(i, 1);
        i--;
        noChange = true;

      }


    }       // ignoring those relations in which both pid and sid are already defined ...!!

  } while (nodes.length > 0 && noChange);

  const resultArray = sortData(hashMap);         // convert the hashMap into a sorted a array

  // console.log('\nreturn result: ', resultArray, head);

  return resultArray;
}
