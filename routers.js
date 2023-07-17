require('./connection');
const express = require('express');
const routers = express.Router();
const Product = require('./model/Product');
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');

routers.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        // res.status(404).send({
        //     'message' : 'error',
        //     'data' : null
        // });
        res.send({
            'message' : 'list product',
            'data' : products
        });
    } catch (error) {
        res.status(500).send({
            'message' : error,
            'data' : null
        });
    }    
});

routers.get('/product/filter', async (req, res) => {
    try {
        const products = await Product.find()
        .select('name price stock')
        .where({
            stock : {
                $lte : 200,
                $gte : 0
            }
        })
        .limit(3)
        .sort({
            price : -1
        })
        .exec();
        res.send({
            'message' : 'list product',
            'data' : products
        });
    } catch (error) {
        res.status(500).send({
            'message' : error,
            'data' : null
        });
    }    
});

routers.post('/product', async (req, res) => {
    try {
        const { name, price, stock, status } = req.body;

        const product = await Product.create({
            name : name,
            price : price,
            status : status,
            stock : stock
        });

        res.status(201).send({
            'message' : 'Berhasil insert data',
            'data' : product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message' : error.message,
            'data' : null
        });
    }    
});

routers.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send({ message: 'Data tidak ditemukan', data: null });
        }
        // test : 64a5162a6f5f4937b2c92781
        return res.send({
            message: 'Data product',
            data: product
        });
    } catch (error) {
        res.status(500).send({
            'message' : error.message,
            'data' : null
        });
    }    
});

routers.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.deleteOne({
            _id : new ObjectId(req.params.id)
        });
        
        if(product.deletedCount == 0) return res.status(404).send({ message: 'Data tidak ditemukan', data: null });  
        return res.send({
            message: 'Data berhasil dihapus',
            data: null
        });
    } catch (error) {
        res.status(500).send({
            'message' : error.message,
            'data' : null
        });
    }    
});

routers.put('/product/:id', multer().none(), async (req, res) => {
    try {
        const { name, price, stock, status } = req.body;
        const product = await Product.updateOne(
            { _id : new ObjectId(req.params.id) },
            {
                name : name,
                price : price,
                stock : stock,
                status : status

            },
            { runValidators : true }
        );
        
        if(product.matchedCount < 1){
            return res.status(404).send({ message: 'Data tidak ditemukan', data: null });
        }

        // if(!product.modifiedCount < 1){
        //     return res.status(500).send({ message: 'Data gagal diupdate', data: null });
        // }

        return res.send({ message: 'Data berhasil diubah', data: null });
    } catch (error) {
        res.status(500).send({
            'message' : error.message,
            'data' : null
        });
    }    
});

module.exports = routers;