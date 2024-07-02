import Questions from '../models/questionSchema.js';
import Results from '../models/resultSchema.js';
import questions, {answers} from '../database/data.js';

// get all questions
export async function getQuestions(req, res){
    try{
        const q = await Questions.find();
        res.json(q)
    }catch(error){
        res.json({error})
    }
}
// post all questions
export async function insertQuestions(req, res){
    try {
        const data = await Questions.insertMany({questions, answers});
        res.json({msg: "data saved successfully", data});
    }catch(error){
        res.json({error})
    }
}
// export async function insertQuestions(req, res){
//     try{
//         Questions.insertMany({questions, answers}, function(err, data){
//             res.json({msg: 'data saved successfully'})
//         })
//     }catch(error){
//         res.json({error})
//     }
// }
// delete all posts
export async function dropQuestions(req, res){
    try{
        await Questions.deleteMany();
        res.json({msg: "questions deleted successfully.."})
    }catch(error){
        res.json({error})
    }
}
// get all result
export async function getResult(req, res){
    try{
        const r = await Results.find();
        res.json(r)
    }catch(error){
        res.json({error})
    }
}
// post all result
// export async function storeResult(req, res){
//     try{
//         const {username, result, attempts, points, achived} = req.body;
//         if(!username && !result) throw new Error('data not provided');
//         Results.create({username, result, attempts, points, achived}, function(err, data){
//             res.json({msg: "result saved successfully"})
//         })
//     }catch(error){
//         res.json({error})
//     }
// }
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;

        // Check if either username or result is not provided
        if (!username || !result) {
            throw new Error('Username or result not provided');
        }

        // Use async/await with Results.create
        const data = await Results.create({ username, result, attempts, points, achived });

        // Send success response
        res.json({ msg: "Result saved successfully", data });
    } catch (error) {
        // Send user-friendly error response
        res.json({ error: error.message || 'Internal Server Error' });
    }
}
// delelte all result
export async function dropResult(req, res){
    try{
        await Results.deleteMany();
        res.json({msg: "result deleted successfully..."})
    }catch(error){
        res.json({error})
    }
}