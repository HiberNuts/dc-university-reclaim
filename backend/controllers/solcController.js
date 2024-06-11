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