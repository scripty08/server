# @scripty/server

# Description

Setting up a node server for a website can be a pain. This express wrapper will install
and preconfigure many dependencies with which you can run a one page application in react. Admittedly, not every use case is covered
but that actually wasn´t the goal. The main goal was to keep it easy and clean.

Features:

- prerendering (no server side rendering)
- compression
- body parsing
- favicon middleware
- webpack-hot-middleware for hot modules reloading
- preconfigured static paths
- initialized routing

# Usage
```bash
npm install -s @scripty/server
```

##### Client: server.js

```javascript
import { Server, IndexController } from '@scripty/server';

const init = async () => {
    let app = new Server();
    await app.addController(new IndexController({ title: 'For title tag' }));
    await app.addController(new ExampleController());
    app.start(3000);
};

init().catch((err) => {
    console.error(err.message);
});

```

##### Client: ExampleController.js
```javascript
export class ExampleController {
    init(server, router) {
        router.post('/create', this.createAction);
        router.get('/read', this.readAction);
        server.use(router);
    }

    createAction(req, res) {
        res.json({example: 'foo'})
    };

    readAction(req, res) {
        res.json({example: 'foo'})
    };
}
```

# Static Files
if you want to access your static files you have to create following folders in your project:

```
project
│   README.md
│   file001.txt
│
└───public
│   │
│   │
│   │
│   └───images
│   │    │   image1.png
│   │    │   image2.jpg
│   │    │   ...
│   │
│   └───files
│   │    │   file1.txt
│   │    │   file2.zip
│   │    │   ...
```

You can access your files on server this way:

https://localhost:3000/files/file1.txt

https://localhost:3000/images/image1.png


# What´s next?
- add possibility to configure meta data
- extending readme
