const db = require("../models");
const Contests = db.Contests;
const Programs = db.Programs;
var solc = require('solc');

exports.compiler = async (req, res) => {
    try {
      const {content}=req.body
      console.log(content)
      var input = {
        language: 'Solidity',
        sources: {
          'test.sol': {
            content,
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      
      var output = JSON.parse(solc.compile(JSON.stringify(input)));
      for (var contractName in output.contracts['test.sol']) {
        console.log(
          contractName +
            ': ' +
            output.contracts['test.sol'][contractName].evm.bytecode.object
        );
      }
      res.status(200).send(output)
    } catch (error) {
      console.error("Error while compiling", error);
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  };

exports.createModel=async(req,res)=>{
    try{
           if(req.body.model=='contest')
             await createContest(req)
           if(req.body.model=="program")
             await createProgram(req)
           res.status(200).send(createdContest)
    }
    catch(error)
    {
      res.status(500).send({ message: error.message || "Internal Server Error", error });
    }
}

exports.updateModel=async(req,res)=>{
  try{
    // console.log("--->",req.body);
    if(req.body.model=='contest')
      await updateContest(req)
    if(req.body.model=="program")
      await updateProgram(req)
    res.status(200).send({error:false,message:"Entry updated in db"})
  }
  catch(error)
  {
  res.status(500).send({ message: error.message || "Internal Server Error", error });
  }
}


createContest = async (req) => {
    try {
      const {id:strapiId,title,description,participants,startDate,endDate,image,details,rules,warnings,level}=req.body.entry
      const mappedRules=req.body.entry.rules[0].children.map(child=>child.children[0].text)
      const mappedWarnings=req.body.entry.warnings[0].children.map(child=>child.children[0].text)
      const createdContest=new Contests({strapiId,title,participants,startDate,endDate,image:image.url,details,rules:mappedRules,warnings:mappedWarnings,level})
      await createdContest.save()
      console.log("new contest saved[+]")
    } catch (error) {
      console.log("Failed to save contest");
      return;
    }
  };

updateContest=async(req,res)=>{
    try {
        const { id: strapiId, title, description, participants, startDate, endDate, image, details, rules, warnings, level } = req.body.entry;
        const mappedRules = req.body.entry.rules[0].children.map(child => child.children[0].text);
        const mappedWarnings = req.body.entry.warnings[0].children.map(child => child.children[0].text);

        const updateData = {
          title,
          description,
          participants,
          startDate,
          endDate,
          image: image.url,
          details,
          rules: mappedRules,
          warnings: mappedWarnings,
          level
        };
        const updatedContest = await Contests.findOneAndUpdate(
          { strapiId: strapiId },
          updateData,
          { new: true, useFindAndModify: false } // new: true returns the updated document
        );
      
        if (!updatedContest) {
          console.log("Contest failed to update becoz not found in db")
        }
        console.log("contest update done")
        return;

    }
    catch(error)
    {
       console.log(error.message);
       console.log("Contest failed to update")
    }
}

createProgram=async(req)=>{
  try{
     const {id:strapiId,contestid,duration,boilerplate_code,description}=req.body.entry;
     const mappedDescription=description[0].children.map(child=>child.children[0].text);
     const createdProgram=new Programs({strapiId,contestId:contestid,duration,boilerplate_code,description:mappedDescription});
     await createdProgram.save();
     console.log("new program saved[+]");
  }
  catch(error)
  {
    console.log(error.message);
    console.log("Failed to save new program")
  }
}

updateProgram=async(req)=>{
  try {
      const {id:strapiId,contestid,duration,boilerplate_code,description}=req.body.entry;
      const mappedDescription=description[0].children.map(child=>child.children[0].text);
      const updateData = {
        duration,
        contestId:contestid,
        boilerplate_code,
        description:mappedDescription
      };
      const updatedProgram = await Programs.findOneAndUpdate(
        { strapiId: strapiId },
        updateData,
        { new: true, useFindAndModify: false } // new: true returns the updated document
      );
    
      if (!updatedProgram) {
        console.log("Update failed, program not found in db")
      }
      console.log("program update done")
      return;

  }
  catch(error)
  {
     console.log(error.message)
     console.log("Failed to update program");
  }
}