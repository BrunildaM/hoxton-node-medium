import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({include: {blogs: true}})
        res.send(users)
    } catch (error) {
        //@ts-ignore
        res.status(400).send({error: error.message})
    }
})


//get the current user
app.get('/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const user = await prisma.user.findUnique({where: {id: userId}, include: {blogs: true}})
res.send(user)
  } catch (error) {
    //@ts-ignore
    res.status(400).send({error: error.message})
  }
})

// Get all the posts

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { user: true, likes: true, responds: true },
    });
    res.send(blogs);
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message });
  }
});

// Get a specific post
app.get("/blogs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { user: true, likes: true, responds: true },
    });
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ error: "Blog not found" });
    }
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

// Create a post
// needs to check if the user that will create the post exists
//(just to show a nicer error message bc already works perfectly fine bc of catch),
// also data will be specified not just req.body

app.post("/blogs", async (req, res) => {
  try {
    const blog = await prisma.blog.create({ data: req.body });
    res.send(blog);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});


//To create a comment
 
  // app.patch('/addCommentToBlog', async (req, res) => {
  //   const blogId = Number(req.body.blogId)
  //   const userId = Number(req.body.userId)
  //   const comment = req.body.comment
  
  //   const blog = await prisma.blog.update({
  //     where: { id: blogId },
  //     data: {
  //       responds: {
  //           //@ts-ignore
  //         create: {
  //           comment: comment
  //         }
  //       }, user: {connect: {id: userId}}
  //     },
  //     include: {
  //       responds: true
  //     }
  //   })
  
  //   res.send(blog)
  // })


// Get all comments
  app.get('/responds', async (req, res) => {
    try {
      const comments = await prisma.responds.findMany({include: {blog: true, user: true}})
      res.send(comments)
    } catch (error) {
      //@ts-ignore
      res.status(400).send({error: error.message})
    }
  })


// create a new comment
app.post('/responds', async (req, res) => {
    try {
        const comment = await prisma.responds.create({ data: req.body });
        res.send(comment);
      } catch (error) {
        //@ts-ignore
        res.status(400).send({ error: error.message });
      }
})




// Delete a blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const blog = await prisma.blog.delete({
      where: { id },
    });
    res.send(blog);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Click: http://localhost:${port}`);
});
