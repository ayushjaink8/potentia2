
import { exactRelations, oppositeMapWithGender, rMap, siblingMap, oppositeMap, genderMap } from "../relationDictionary";


//  Basic 8 Relations:    (All the other relations can be mapped using these relations but visa versa can't be done correctly)
// mother, father,
// brother, sister, wife, husband
// son, daughter

const item = [
  {
    id: 231,
    personID: 2006,
    relatedTo: 'Moin Khan',
    notes: 'Hello Moin khan',
    childrenDetails: [
      {
        id: 232,
        personID: 2006,
        relatedTo: 'A',
        notes: 'Hello A',
      },
      {
        id: 233,
        personID: 2006,
        relatedTo: 'B',
        notes: 'Hello B',
      },
      {
        id: 234,
        personID: 2006,
        relatedTo: 'C',
        notes: 'Hello C',
      },
    ],
  },
  {
    id: 235,
    personID: 2006,
    relatedTo: 'Moin',
    notes: 'Hello Moin',
    childrenDetails: [
      {
        id: 236,
        personID: 2006,
        relatedTo: 'John',
        notes: 'Hello Jhon',
      },
    ],
  },
  {
    id: 237,
    personID: 2006,
    relatedTo: 'Priya',
    notes: 'Hello Priya',
    childrenDetails: [
      {
        id: 238,
        personID: 2006,
        relatedTo: 'Child1',
        notes: 'Hello Child1',
      },
      {
        id: 239,
        personID: 2006,
        relatedTo: 'Child2',
        notes: 'Hello Child2',
      },
      {
        id: 240,
        personID: 2006,
        relatedTo: 'Child3',
        notes: 'Hello Child3',
      },
      {
        id: 241,
        personID: 2006,
        relatedTo: 'Child4',
        notes: 'Hello Child4',
      },
    ],
  },
  {
    id: 242,
    personID: 2006,
    relatedTo: 'dharshini',
    notes: 'Hello dharshini',
    childrenDetails: [],
  },
]

const SaveGenderData = (nodes, FamilyGenderDataMap) => {
  nodes.forEach((relation) => {

    const sid = relation.ClientID_2;
    const givenRel = relation.csvRelation;

    if( !(FamilyGenderDataMap.has(sid)) && genderMap[givenRel] !== undefined ){
      FamilyGenderDataMap.set(sid, genderMap[givenRel]);
    }

  })

}


const checkRelations = (nodes) => {

  const relationSet = new Set(["mother","father","brother","sister","wife","husband","son","daughter"]);

  for (let i=0; i<nodes.length; i++) {
    let givenRel = nodes[i].csvRelation;
    if(!relationSet.has(givenRel)) return false;
  };

  return true;
}


function sortData(hashMap){

  let resultArray = [];
  hashMap.forEach((value, key) => {
    let data = { key, value };
    resultArray.push(data);
  });
  resultArray.sort((e1,e2)=>{
    if(e1.value.gLevel < e2.value.gLevel){
      return 1;
    } else if (e1.value.gLevel === e2.value.gLevel && e1.value.siblingLevel > e2.value.siblingLevel){
      return 1;
    } else return -1;
  })

  return resultArray;
}

// const AssignRelation = (node,otherPerson) => {

//   const relationWithHead = exactRelations[otherPerson.csvRelation + '+' + node.csvRelation];

//   if(relationWithHead){
//     return relationWithHead;
//   }

//   return node.csvRelation;

// }

const GetMemberWithHighestLevel = (nodes) => {



}



export function TreeLogic(data) {

  let Family_id = data.id;

  let nodes = [...(data.value)];
  console.log('formulate called: ', data);

  const valid = checkRelations(nodes);


  if(valid){

    const FamilyGenderDataMap = new Map();
    SaveGenderData(nodes, FamilyGenderDataMap);

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
    let itr = 0;

    do {

      let tempMap = new Map(hashMap);   // making a copy of current state of hashmap
      noChange = false;

      itr++;
      console.log("\nAfter", itr, "Iteration: ", tempMap);

      for (let i = 0; i < nodes.length; i++) {

        let node = nodes[i];   // current relation is called as node   whereas   nodes refers to the array of relations

        if (tempMap.get(node.ClientID_1) !== undefined && tempMap.get(node.ClientID_2) === undefined) {


          let otherPerson = tempMap.get(node.ClientID_1);
  
          // let newPerson = AssignRelationToSid(Family_id, node, otherPerson);
  
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
  
          // hashMap.set(node.ClientID_2, newPerson);
  
          nodes.splice(i, 1);
          i--;
          noChange = true;          // To make sure a disjoin set doesn't make an infinite loop
        }
  
        else if (tempMap.get(node.ClientID_2) !== undefined && tempMap.get(node.ClientID_1) === undefined) {
  
          const possibleGender = FamilyGenderDataMap[node.ClientID_2];
          const possibleRelation = oppositeMapWithGender[node.csvRelation];
  
  
          if(possibleGender && possibleRelation){

            console.log(' i am called for this node: ', node);
  
            let otherPerson = tempMap.get(node.ClientID_2);
  
            let personID = Number(node.ClientID_1);
            let gLevel = otherPerson.gLevel - rMap[node.csvRelation];
            let siblingLevel = otherPerson.siblingLevel + siblingMap[node.csvRelation];
  
  
            // let relation = oppositeMap[node.csvRelation];        // check for gender map here to get the exact relation instead of ambigious!
  
            let relation = possibleRelation[possibleGender];
  
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
          }  else if (node.csvRelation === 'wife' || node.csvRelation === 'husband'){
  
  
            let otherPerson = tempMap.get(node.ClientID_2);
  
            let personID = Number(node.ClientID_1);
            let gLevel = otherPerson.gLevel - rMap[node.csvRelation];
            let siblingLevel = otherPerson.siblingLevel + siblingMap[node.csvRelation];
  
  
            let relation = oppositeMap[node.csvRelation];        // check for gender map here to get the exact relation instead of ambigious!
  
            // let relation = possibleRelation[possibleGender];
  
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
  
        }

      }       // ignoring those relations in which both pid and sid are already defined ...!!

    } while (nodes.length > 0 && noChange);

    if(nodes.length > 0){
      console.log('Relations Ignored or Unhandled: ', nodes);
    }

    const resultArray = sortData(hashMap);         // convert the hashMap into a sorted a array

    console.log('\nreturn result: ', resultArray, head);

    return resultArray;


  } else return false;


}