import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "./models/user.model";
import { Todo } from "./models/todo.model";
import { ApiError} from './utils/errorApi'
import { errorHandler } from "./middlewares/error.middleware";
import { asyncHandler } from "./utils/asyncHandler";
import { Document, Types } from "mongoose";

const app = express();
const salt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post("/register", asyncHandler(async (req: any, res:any) => {
  

  const { email, username, password } = req.body;

  [email, username, password].forEach((element) => {
    if (element === undefined) {
      throw new ApiError("all field should filled", 401);
    }
  });
  if (!email.includes("@")) {
    throw new ApiError("enter a valid email", 401);
  }

  let isUserExist = await User.find({ email });

  if (isUserExist) {
    throw new ApiError("user is already exist", 402);
  }

  const newUser = await User.create({
    email,
    password: bcrypt.hashSync(password, salt),
    username,
  });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    throw new ApiError("something went wrong in creating user", 402);
  }
  res
    .status(200)
    .json({ user: createdUser, msg: "user created succussfully" });

  res.send("success");
  
}));




app.post("/login",  asyncHandler( async (req: any, res: any) => {
 
  
    const { email, password } = req.body;

    [email, password].forEach((element) => {
      if (element === undefined) {
        throw new ApiError("all field should filled", 401);
      }
    });

    const user: any = await User.findOne({ email });
    console.log(user);

    if (!user) {
      throw new ApiError("user  not exist", 401);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError("password is wrong", 402);
    }

    res.json({ user });

}));

app.post("/add-todo/:user", async (req, res) => {

  const {user} = req.params
  const {task} = req.body;

  try {
    if (!task) {
      throw new ApiError("enter a task", 400);
    }

    let isExist = await Todo.findOne({ owner: user });

    if (!isExist) {
      let taskObj = await Todo.create({
        owner: user,
        tasks: [{task} ],
      });
    } else {
      let newTodo = await Todo.updateOne(
        { owner: user },
        { $push: { tasks: { task: task } } }
      );
      // await isExist?.save();
    }

    let todos = await Todo.findOne({owner: user})
    res.status(200).json({todos})
  } catch (error) {
    console.log("error in logging task", error);
  }
});



app.get('/get-todo/:user' ,async (req, res) => {

    const {user} = req.params;
    let todos = await Todo.findOne({owner:user })

    res.status(200).send({todos})
    
})


app.patch('/remove-todo/:owner',async (req, res) => {
 try {
   let {owner} = req.params;
   let {id} = req.body;
   let deleteTodo = await Todo.updateOne({owner: owner}, {$pull: {tasks:{ _id: id}}})
   
   let todos = await Todo.findOne({owner:owner })
   res.status(200).send({todos})


 } catch (error) {
  console.log('error while removing todo',error)
  
 }


})

app.patch('/edit-todo/:owner',async (req, res) => {
  try {
    let {owner} = req.params;
    let  {task, id }= req.body;
    let updatedTodo = await Todo.updateOne({owner: owner}, {$set: {"tasks.$[element].task": task}},  { arrayFilters: [ { "element._id" : { $eq : id} } ] })
    
    let todos = await Todo.findOne({ owner:owner })
    res.status(200).send({todos})
 
 
  } catch (error) {
   console.log('error while removing todo',error)
   
  }
})

app.use(errorHandler)


export default app;
