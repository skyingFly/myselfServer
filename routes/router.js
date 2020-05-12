const express = require('express')
const fs = require('fs')
const router = express.Router()

const mongoose = require('mongoose')
let lists = require('../models/list')
let informations = require('../models/information')
let projects = require('../models/project')
let works = require('../models/work')

mongoose.connect('mongodb://localhost:27017/myself', {useNewUrlParser: true})

let db = mongoose.connection

db.on('open', () => {
    console.log('链接成功')
})
db.on('error', () => {
    console.log('链接失败')
})

router.get('/lists', function (req, res, next) {
    //查询mongoDB的lists数据
    lists.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            let list = JSON.parse(JSON.stringify(doc[0]))
            res.json({
                menusList: list.menusList
            })
        }
    })
})
.get('/informations', function (req, res, next) {
    informations.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                data: doc[0]
            })
        }
    })
})
.get('/projects', (req, res, next) => {
    projects.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            let list = JSON.parse(JSON.stringify(doc[0]))
            res.json({
                dataList: list.dataList
            })
        }
    })
})
.get('/works', (req, res, next) => {
    works.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            let list = JSON.parse(JSON.stringify(doc[0]))
            let files = fs.readdirSync('./resource/images')
            let dataList = []
            list.workList.map((item, index) => {
                let obj = item
                obj.url = `http://localhost:3000/images/${files[index]}`
                dataList.push(obj)
            })
            res.json({
                dataList: dataList
            })
        }
    })
})


module.exports = router
