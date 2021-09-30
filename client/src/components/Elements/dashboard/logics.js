
import { exactRelations, oppositeMapWithGender, rMap, siblingMap, oppositeMap, genderMap } from "../relationDictionary";

const SaveGenderData = (nodes, FamilyGenderDataMap) => {
  nodes.forEach((relation) => {

    const sid = relation.ClientID_2;
    const givenRel = relation.csvRelation;

    if( !(FamilyGenderDataMap.has(sid)) && genderMap[givenRel] !== undefined ){
      FamilyGenderDataMap.set(sid, genderMap[givenRel]);
    }

  })

  // console.log('gender map: ', FamilyGenderDataMap);

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

  console.log('After sorting: ', resultArray);

  return resultArray;
}


const handleAmbiguity = (relation) => {
  console.log('ambigious function executed');

}

const handleIndirect = (relation) => {
  console.log('indirect executed');

}

const AssignRelation = (node,otherPerson) => {
  // console.log('AssignRelation executed...', otherPerson);

  const relationWithHead = exactRelations[otherPerson.csvRelation + '+' + node.csvRelation];

  if(relationWithHead){
    return relationWithHead;
  }

  return node.csvRelation;

}

const AssignRelationToSid = (Family_id, node, otherPerson) => {

  console.log('AssignRelationToSid called...', otherPerson);


  let personID = Number(node.ClientID_2);
  let gLevel = otherPerson.gLevel + rMap[node.csvRelation];
  let exactRelationFlow = otherPerson.exactRelationFlow + "'s " + node.csvRelation;

  let relation = '';
  let relation_flow = '';
  let siblingLevel;
  let relationType = '';

  const relationWithHead = exactRelations[otherPerson.relation + '+' + node.csvRelation];

  if(relationWithHead){
    relation = relationWithHead;
    relation_flow = "Head's " + relationWithHead;
    siblingLevel = siblingMap[relationWithHead];
    relationType = 'exact';
  }

  else{
    //assign sibling level here and shorten the relation_flow if possible! add another tentativeRelation to the object from the relation_flow!
    relation_flow = otherPerson.relation_flow + "'s " + relation;
    relation = '';
    relationType = 'indirect'
  }


  let returnObject = {
    Family_id,
    personID,
    personName: node.ClientName_2,
    gLevel,
    siblingLevel,
    relation,
    exactRelationFlow,
    relation_flow,
    relationType,
  }

  return returnObject;


}



export function formulate(data) {

  let Family_id = data.id;
  let nodes = [...data.value];

  console.log('formulate called: ', nodes);

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
    console.log("\nAfter", itr,"Iteration: ", tempMap);

    for (let i = 0; i < nodes.length; i++) {

      let node = nodes[i];   // current relation is called as node   whereas   nodes refers to the array of relations

      // if (tempMap.get(node.ClientID_1) !== undefined && tempMap.get(node.ClientID_2) === undefined) {


      //   let otherPerson = tempMap.get(node.ClientID_1);

      //   let newPerson = AssignRelationToSid(Family_id, node, otherPerson);

      //   let personID = Number(node.ClientID_2);
      //   let gLevel = otherPerson.gLevel + rMap[node.csvRelation];
      //   let relation = AssignRelation(node,otherPerson);
      //   let siblingLevel = otherPerson.siblingLevel + siblingMap[relation];
      //   let relation_flow = otherPerson.relation_flow + "'s " + relation;

      //   hashMap.set(node.ClientID_2, {
      //     Family_id,
      //     personID,
      //     personName: node.ClientName_2,
      //     gLevel,
      //     siblingLevel,
      //     relation,
      //     relation_flow,
      //     relationType: "exact",
      //   });

      //   console.log('newPerson: ',newPerson)

      //   // hashMap.set(node.ClientID_2, newPerson);

      //   nodes.splice(i, 1);
      //   i--;
      //   noChange = true;          // To make sure a disjoin set doesn't make an infinite loop
      // }

      // else if (tempMap.get(node.ClientID_2) !== undefined && tempMap.get(node.ClientID_1) === undefined) {

      //   let personID = Number(node.ClientID_1);
      //   let gLevel = tempMap.get(node.ClientID_2).level - rMap[node.csvRelation];
      //   let siblingLevel = tempMap.get(node.ClientID_2).siblingLevel + siblingMap[node.csvRelation];
      //   let relation = oppositeMap[node.csvRelation];        // check for gender map here to get the exact relation instead of ambigious!
      //   let relation_flow = tempMap.get(node.ClientID_2).relation_flow + "'s " + relation;

      //   // hashMap.set(node.ClientID_1, {
      //   //   Family_id,
      //   //   personID,
      //   //   personName: node.ClientName_1,
      //   //   gLevel,
      //   //   siblingLevel,
      //   //   relation,
      //   //   relation_flow,
      //   //   relationType: "exact",
      //   // });

      //   // nodes.splice(i, 1);
      //   // i--;
      //   // noChange = true;

      // }


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

          console.log(' i am called for this node: ', node);

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

  const resultArray = sortData(hashMap);         // convert the hashMap into a sorted a array

  // console.log('\nreturn result: ', resultArray, head);

  return resultArray;
}
