# grunt-merge-tap-files
Merge several tap.log files into one tap.log file.

##Why
This grunt task is build because if often have more than one tap logs in the same project. 
In the Jenkins configuration you can only to refer one tap.log file. Whith this task you can merge many tap logs in one tap log file. 

## Install
Install grunt-replace-configvalues:
```bash
 npm install grunt-merge-tap-files --save-dev
```

## Than inside the Gruntfile.js
```javascript

   // load the task
   grunt.loadNpmTasks('grunt-merge-tap-files');

   // configure the task
   grunt.initConfig({
        mergetapfiles: {
            options: {
                cmd: '/out',
                src: ['tap1.log', 'tap2.log'],
                outputFile: 'tapmerged.log'
            }
        }
   });  

   // and than run the task
   grunt.registerTask('default', ['mergetapfiles']);
```