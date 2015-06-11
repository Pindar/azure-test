  
  var azure = require('azure-storage');
  
  var tableSvc = azure.createTableService();
  tableSvc.createTableIfNotExists('mytable', function(error, result, response){
      if(error){
          console.log('Error while creating table', error);
  		return;
      }
  	
  	// Table exists or created
  });
  
  
  function insertEntitiy(entity) {
    tableSvc.insertEntity('mytable', entity, function (error, result, response) {
        if(error){
         console.log('Error while inserting to table', error);
  	   return; 
      }	
  	 console.log('Entity inserted');
  });
  
    
  }
  
  
  function query(res) {
    var query = new azure.TableQuery()
    .top(5)
    .where('PartitionKey eq ?', 'datapoints');
  
    tableSvc.queryEntities('mytable', query, null, function(error, result, response) {
      var errorMsg;
      if(error) {
        errorMsg = 'Error while query entities';
    	  console.log(errorMsg, error);
        res.send(errorMsg);
    	 	return;
      }
  
      console.log('Query Results:');
      console.log(result.entries.length);
      console.log(result.entries);
      
      res.send('Top Five: ' + JSON.stringify(result.entries));
    });
    
  }
  
  
  module.exports = {
    query: query,
    insertEntitiy: insertEntitiy
  };