const mongoose = require("mongoose");
const users = require('./models/user');

var data = [
    {
        username:"admin",
        hash:"89ab56b5dc5577f4c83dc49d3e1bcaa1102c48fd830a2af959515126348faec51e7cb22b8c94e45886f7da2bc9a5e6a74af5870f393d45164db8b980a9cffefe9a02e04d095f8f84be0342f1392198ca3914348972f66c3d9598cf6933c3a64688e7317ff30e3547744483c805d18e45e62c803453e507def1232f5da0aee9d02ce2f8a94c1cca3be67a42b9bfa5efe8217a920c760c90ee079fe844b3a6e984ade791fa1a4c46b297d07efa4e71782872f5e61624d6ea361a43b166cb5e0e9c92d5cc99020627efbbca8bc03bff4aad72c9c85e3a988b59b8a43920b3689b7e6461536ba690a7c10f06210f226a216c75b1f6b8af567f624cb48642f5c4bdd59a728670e4dbc6c31f23a49ab696a096e6fc4d68384d7c130a549646036521892a5a383b7db569f3ab6187c57bb5e632c7ffb355aaaf37ba11e93cfd522ddc4cda48f23284590e59d46eeccf9c3c56589297ac498ee6c72f078501fe82e7b84df2ddc3d8ae465d00ad7afa302809fa03a98c1c249435ffa09f0f7f3b3cb73d48c1818f4a141874ea25677a41dc67da7a97864d43309ca967cf5af08fa71485f551afcae9829762b9f6baf0e7f5076db0e1642978e820dbf97ad9e11ec2d5e93076bdd6790a5ed53275620963a556726e9d781bf3efa3b2761dfd2a22f06992fd3bce6831b5e364cf013bd80321c08362cd854f95f24125e6205314d8571a1aae",
        salt: "c02c29557c80e7b76a718f02dcf2e1f545da38a3b48cb778d4b3af5bb4799ccc"
    }
]

function seedDB() {
    users.remove({}, function (err) {
        if(err) {
            console.log(err);
        }
        data.forEach(function (seed) {
            users.create(seed, function (err, user) {
                if(err) {
                    console.log(err)
                } else {
                    console.log('created admin user');
                }
            })
        })
    })
}

module.exports = seedDB;
