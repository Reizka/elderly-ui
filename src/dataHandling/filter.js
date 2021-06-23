import { csvParse } from 'd3-dsv'
import { group } from 'd3-array'
//import cvs from '../../public/cetools.csv'
import { Functions } from '../config/firebase'


const read = async () =>{
    console.log("started")
    const lines = await fetch('/cetools.csv');
    const text = await lines.text()
    const obj = await csvParse(text)
    console.log("OBJ ",obj);

    const getBool = (d) => {
        if (d === 'y') return true
        if (d === 'n') return false
        return d
      }
    
      const mappedObj = obj.map((d, i) => {
        const nd = Object.keys(d).reduce(
          (acc, k) => ({ ...acc, [k.replace(/\n|\↵|\s| /g, '')]: d[k].replace(/\n|\↵|\r?\n|\r/g, '') }),
          {}
        )
        const newNd = Object.keys(nd).reduce((acc, k) => ({ ...acc, [k]: getBool(nd[k]) }), {})
        return {
          ...newNd,
          id: d.code,
        }
      })

   return mappedObj;
}


const createFeedBacktObjectForArray = (element) => {
    var feedback = {
        code: element.code,
        count: 1,
        strongNegative: element.likert === "0" ? 1 : 0,
        negative: element.likert === "1" ? 1 : 0,
        positive: element.likert === "2" ? 1 : 0,
        strongPositive: element.likert === "3" ? 1 : 0,
        c_guideline: [],
        c_check: []
    }
    if (element.CHECK) {
        feedback.c_check.push(element.CHECK)
    }
    if (element.GUIDELINE) {
        feedback.c_guideline.push(element.GUIDELINE)
    }
    return feedback;
}

const guidelineCodes = async (comments) => {
    
    let listedFeedback = [];
    for (let index = 0; index < comments.length; index++) {
            if (comments[index] !== null && comments[index].length > 0) {

                //console.log("DOMMN#", comments[index])

                const userComments = comments[index];

            

                userComments.forEach(element => {
                    //flag
                    let feedbackListed = false;
                    //create object
                    let feedback = createFeedBacktObjectForArray(element);
                    //if already objects added to list, check whether to update existing one, or push a new one
                    if(listedFeedback.length > 0){
                        for (let j = 0; j <  listedFeedback.length-1; j++) {
                            let lf = listedFeedback[j];
                            if (lf.code === feedback.code) {
                                    //mark flag
                                    feedbackListed = true;
                                    //update fields
                                    lf.count = lf.count+1,
                                    lf.strongNegative = feedback.strongNegative !== 0 ? lf.strongNegative + 1 : lf.strongNegative,
                                    lf.negative= feedback.negative !== 0 ? lf.negative + 1 : lf.negative,
                                    lf.positive= feedback.positive !== 0 ? lf.positive + 1 : lf.positive,
                                    lf.strongPositive= feedback.strongPositive !== 0 ? lf.strongPositive + 1 : lf.strongPositive,
                                    lf.c_guideline = lf.c_guideline.concat(feedback.c_guideline)
                                    lf.c_check= lf.c_check.concat(feedback.c_check);
                                    //update element inside the array

                                    listedFeedback[j] = lf;
                                    
                                    break;
                            }
                        }
                    }

                    if (feedbackListed == false) {
                        listedFeedback.push(feedback);
                    }
                })   
        }
    }
    //sort to same order as the codes 1-12x
    listedFeedback.sort((a,b)=>{
        return a.code - b.code;
    });

  
    const getAllGuidelines = Functions.httpsCallable('getAllGuidelines')
    const editedGuidelines =  await getAllGuidelines({}).then((e) => e.data)
    const wGlAdded = MergeOriginalAndEditedGuidelinesToComments(listedFeedback,await read(), editedGuidelines)
    console.log("WGLA ",wGlAdded);

   
    return wGlAdded;
}

const MergeOriginalAndEditedGuidelinesToComments = (listedfb, guidelines, editedGuidelines)=>{
   return listedfb.map(e =>{
        const gl = guidelines.filter(y => {return y.code === e.code})
        const egl = editedGuidelines.filter(x =>{return x.code === e.code})
        return {
            fb:e,
            gl:gl[0], //not sure why, but this works
            egl:egl[0]
        }
    })

}



export {
    guidelineCodes
}