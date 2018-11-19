const fs = require('fs');
const path = require('path');

function Base(fileName) {
  this.db = {};
  this.filePath = path.join(__dirname.split(path.sep).splice(0,-1).join(), //will give us the parent dir
                            'db',
                            fileName);

  try{
    var content = JSON.parse(fs.readFileSync(this.filePath, { encoding: 'utf-8' }));
  }
  catch(error) {
    console.log(error);
    content = {lastId: 0, entities: {}}; 
  }
  finally {
    this.db.entities = content.entities;
    this.db.lastId = content.lastId;
  }
}

Base.prototype._writeToFile= function(entities, id, cb) {
  const lastId = id || this.db.lastId;
  fs.writeFileSync(this.filePath, JSON.stringify({lastId, entities}), cb);
}

Base.prototype.insert = function(entity, cb){
  const id = this.db.lastId + 1;
  this.db.entities[id] = {id, ...entity};

  this._writeToFile(this.db.entities, id, function(error) {
    if(error) {
      delete this.db.entities[id];
      cb(error);
    }
  });

  this.db.lastId = id;
  cb(undefined, this.db.entities[id]);
}

Base.prototype.deleteById = function(id, cb) {
  
  let entity = this.db.entities[id];

  if (entity) {
    delete this.db.entities[id];

    this._writeToFile(this.db.entities, undefined, function(err) {
      if(err){
        console.log(err);
        this.db.entities[id] = entity;
      }
    });
    cb();
  }
  else
    cb(`No entity with id: ${id}`);
}

Base.prototype.delete = function (query, cb) {
  
  this.get(query, (entities) => {

    if (entities.length > 0 ){

      entities.forEach(entity => {
        delete this.db.entities[entity["id"]]
      })

      this._writeToFile(this.db.entities, undefined, function(err) {
        err ? cb(err) : cb(undefined);
      });
    }

  })
}

Base.prototype.getById = function(id, cb) {
  let entity = this.db.entities[id];

  if(!entity) 
    cb(`No entity with id: ${id}`, undefined);

  else
    cb(undefined, entity);
}

Base.prototype.get = function(query, cb) {
  entityFields = Object.keys(query);
  result       = new Array();

  Object.keys(this.db.entities).forEach(entity => {
    matchesQuery = true;

    entityFields.forEach(field => {

      if (!(this.db.entities[entity][field] == query[field])){
        matchesQuery = false;
      }

    });

    if (matchesQuery)
      result.push(this.db.entities[entity]);
  });

  cb(result);
}

module.exports.Base = Base;