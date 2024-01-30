# Photo gallery
Stores images to MongoDB utilizing multer. This solution is easy to extend to uploading multiple files at once. **_Todo: 1. gridFS for bigger than 16Mb pics._**     
### try it    
[app on Render](https://photo-gallery-mwyi.onrender.com/)

## Prerequisites

npm package manager and mongodb uri

## Installing
```
/photo-gallery/server>npm install
/photo-gallery/client>npm install
```
create `.env` file with content:
```
    MONGODB_URI=mongodb://127.0.0.1:27017
    PORT=8000
    NODE_ENV=developtment
```
fix urlPrefix in client/src/util/config.js (see comments)...    
    
__option A__ usage in production mode:
1. set `NODE_ENV=production`
2. build and run   
```
/photo-gallery/client>npm run build
/photo-gallery/client>cp -r build ../server
/photo-gallery/server>node server.js
```
and open http://localhost:8000/ in browser. ___Now folder ./server has all what you need to deploy this on a live system___

__option B__ usage in development mode:
```
/photo-gallery/server>node server.js
/photo-gallery/client>npm start
```

what it looks like:
![kuvagalleria](https://github.com/juhaj77/photo-gallery/blob/main/IGCapture.PNG)

