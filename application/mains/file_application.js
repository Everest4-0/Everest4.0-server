class FileApplication {
    FILE_TYPE = [
        {
            'jpg': 1,
            'jpeg': 1,
            'png': 1,
            'bmp': 1,
            'pdf': 2,
            'mp4': 3,
            'mpeg': 3
        }
    ]
    type = (ext) => {
        return typeof(this.FILE_TYPE[ext])==='number' ? this.FILE_TYPE[ext] : 0
    }
}


module.exports = new FileApplication();