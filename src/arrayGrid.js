export var ArrayGrid = (function () {
  var instanceArrayGrid;

  return {
    size: 40,
    getInstance: function () {
      if (!instanceArrayGrid) {
        instanceArrayGrid = [];
        for(var i = 0; i < this.size; i++) {
            instanceArrayGrid[i] = [];
            for(var j = 0; j < this.size; j++) {
                instanceArrayGrid[i][j] = !Math.floor((Math.random()) * 10);
            }
        }
      }
      return instanceArrayGrid;
    },
    setInstance: function(newArrayGrid) {
      instanceArrayGrid = newArrayGrid;
    }
  };
})();
