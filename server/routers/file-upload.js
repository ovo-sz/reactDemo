/*
处理文件上传的路由
 */
const multer = require('multer')//文件上传中间件
const path = require('path')//路径模块
const fs = require('fs');//文件模块
//文件上传到这个路径 ../public/upload
const dirPath = path.join(__dirname, '..', 'public/upload')// ../public/upload
// 设置文件保存的规则
const storage = multer.diskStorage({
  limits: {
    fileSize: '3MB'
  },
  // destination:用来确定上传的文件应该放在哪里
  destination: function (req, file, cb) { //函数需手动创建文件夹
    // console.log('destination()', file,req,cb)
    if (!fs.existsSync(dirPath)) {//判断 该文件是否存在
      // 没存在就创建文件夹 在保存
      fs.mkdir(dirPath, function (err) { //mkdir创建文件夹
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)//保存在指定文件夹中
        }
      })
    } else {
      //存在就直接保存
      cb(null, dirPath)//保存在指定文件夹中
    }
  },
  // 设置文件的保存名字
  filename: function (req, file, cb) {
    //file 
    console.log('filename()', file, cb, req)
    var ext = path.extname(file.originalname)//originalname 图片的扩展名
    cb(null, file.fieldname + '-' + Date.now() + ext)
    // 保存文件格式为 图片名称+-+当前保存的时间+图片后缀名

    // *时间戳-6位随机字符.文件后缀
    // const timeStamp = Date.now();
    // const ramdomStr = Math.random().toString(36).slice(-6);
    // const ext = path.extname(file.originalname);// 用户计算机上的文件名称originalname
    // const filename = `${timeStamp}-${ramdomStr}${ext}`;
    // cb(null, filename);
    //*或者使用UUID 唯一
    // let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
    // let fileName = UUID.v1()
    // cb(null, fileName + extName)
  },
  fileFilter(req, file, cb) {  //过滤验证文件后缀名
    const extname = path.extname(file.originalname);
    console.log(extname)
    const whitelist = [".jpg", ".gif", ".png"];
    if (whitelist.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your ext name of ${extname} is not support`));//这种报错格式为 multer.MulterError
    }
    //*另一种形式的图片格式
    // var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    // // file.mimetype 为文件的格式
    // if (acceptableMime.indexOf(file.mimetype) !== -1) {
    //     cb(null, true)
    // } else {
    //     cb(null, false)
    // }
  },
})
const upload = multer({ storage })
//上传多个upload.array('img', 12) 
//上传单个upload.single('img') 
const uploadSingle = upload.single('image');//接收一个单个文件上传的指定名字图片 image
module.exports = function fileUpload(router) {
  // 上传图片
  router.post('/manage/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) { //错误处理
      if (err) {
        return res.send({
          status: 1,
          msg: '上传文件失败'
        })
      }
      var file = req.file;
      res.send({
        status: 0,
        data: {
          name: file.filename,//返回图片名
          url: 'http://localhost:5000/upload/' + file.filename//返回图片的访问路径
        }
      })

    })
  })

  // 删除图片
  router.post('/manage/img/delete', (req, res) => {

    const { name } = req.body
    //dirPath = 存放图片的路径     name 图片的名称
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 1,
          msg: '删除文件失败'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })
  //获取图片
  router.get("/manage/img/:filename", (req, res) => {
    const absPath = path.resolve(
      __dirname,
      "../public/upload/",
      req.params.filename
    );
    res.download(absPath, req.params.filename);//内置支持断点续传
  });
}
