# The Image Gallery With Upload Feature
Stores images to MongoDB utilizing multer. This solution is easy to extend to uploading multiple files at once. **_Todo: 1. gridFS for bigger than 16Mb pics. 2. elegant navigation for overflowed images._**

### try it
[app on render](https://photo-gallery-mwyi.onrender.com/)

## Prerequisites

npm package manager and mongodb uri

## Installing
```
/img-gallery-with-upload/server>npm install
/img-gallery-with-upload/client>npm install
```
create `.env` file with content:
```
    MONGODB_URI=mongodb://127.0.0.1:27017
    PORT=8000
    NODE_ENV=developtment
```
__option A__ usage in production mode:
1. set `NODE_ENV=production`
2. build and run   
```
/img-gallery-with-upload/client>npm run build
/img-gallery-with-upload/client>cp -r build ../server
/img-gallery-with-upload/server>node server.js
```
and open http://localhost:8000/ in browser. ___Now folder ./server has all what you need to deploy this on a live system___

__option B__ usage in development mode:
```
/img-gallery-with-upload/server>node server.js
/img-gallery-with-upload/client>npm start
```

what it looks like:
![kuvagalleria](https://github.com/juhaj77/photo-gallery/blob/main/IGCapture.PNG)

