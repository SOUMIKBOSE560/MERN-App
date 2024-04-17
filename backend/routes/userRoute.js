
const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.use(express.json())

router.get("/", (req, res) => {
    res.send("app is running");
})



// Route to save user data
router.post('/createuser', async (req, res) => {
    try {
      const { name, email, age } = req.body;
  
      // Create a new user
      const userData = await User.create({
        name: name,
        email: email,
        age: age
      });
  
      return res.status(201).json(userData);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
     
        return res.status(400).json({ error: 'Email is already in use' });
      }
  
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });



//Router to get all data 

router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "No Users found" });
        }
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

})



//Router to delete all data
router.delete('/deleteallusers', async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json('All users deleted successfully!');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


//Router to get a user or object by Id
router.get("/getuserbyid/:id", async (req, res) => {
    try {
        let id = req.params.id.trim(); 
        console.log(id);
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;


//Router  to delete a user with the specific id
router.delete("/deleteuser/:id", async (req, res) => {
    let id = req.params.id;
    console.log(id);
    if (!User.exists(id)) {
        return res.status(404).send('No user with the id' + id);

    }
    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json('user deleted successfully');
    }
    catch (e) {
        return res.status(400).send(e);
    }


})


//Router to update user
router.put("/updateuser/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        if (!req.body) {
            return res.status(400).json("error : undefined request body")
        }

        const { name, email, age } = req.body;

        await User.findByIdAndUpdate(userId, req.body);
        return res.status(200).json(req.body);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }


})


//Router to get user 2nd approach
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);
   try {
    if(user){
    return res.status(200).json(user);
    }
   } catch (error) {
    return res.status(400).json("not found");
   }

});


// router.get('/:id', async (req, res) => {
//     try {
//       let id = req.params.id;
//       const user = await User.findById(id);
  
//       if (user) {
//         return res.status(200).json(user);
//       } else {
//         return res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });