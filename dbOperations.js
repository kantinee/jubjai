module.exports = {
    getRecords: function(req, res) {    
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.DATABASE_URL || "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from employee");

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
  
    

    addRecord : function(req, res){
        var pg = require('pg');  
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        var score = (int(req.query.q1) + int(req.query.q2)+int(req.query.q3)+int(req.query.q4)+int(req.query.q5)+int(req.query.q6)+int(req.query.q7)+int(req.query.q8)+int(req.query.q9)+int(req.query.q10)+int(req.query.q11)+int(req.query.q12)+int(req.query.q13)+int(req.query.q14)+int(req.query.q15)+int(req.query.q16)+int(req.query.q17)+int(req.query.q18)+int(req.query.q19)+int(req.query.q20))/20 ;
        var Level = "0";
        if (score<0.2){Level="ระดับ 0 : ไม่มีภาวะซึมเศร้า"; ximg="https://i.imgur.com/I5KX4Hb.png";}
        else if (0.2<=score<1.08){Level="ระดับ 1 : มีอารมณ์เศร้าบ้าง แต่อยู่ในระดับปกติที่คนทั่วไปก็สามารถรู้สึกเช่นนี้ได้" ; ximg="https://i.imgur.com/xEBK5HD.jpg";}
        else if (1.08<=score<1.37){Level="ระดับ 2 : มีภาวะซึมเศร้าปานกลาง ควรสังเกตอารมณ์ตนเองอย่างใกล้ชิด ถ้าความรู้สึกเช่นนี้คงอยู่ต่อเนื่องไปอีกประมาณ 2 สัปดาห์ หรือเริ่มรู้สึกว่าสภาพอารมณ์รบกวนการทำงานหรือการใช้ชีวิตประจำวัน ควรขอคำแนะนำหรือความช่วยเหลือจากผู้เชี่ยวชาญด้านสุขภาพจิต หรือโทร 1323 สายด่วนสุขภาพจิตฟรี ตลอด 24 ชั่วโมง"; ximg="https://i.imgur.com/7IIJDgD.jpg";}
        else if (1.37<=score<1.52){Level="ระดับ 3 : มีความเสี่ยงที่จะอยู่ในภาวะซึมเศร้า ควรพบผู้เชี่ยวชาญด้านสุขภาพจิตเพื่อรับการตรวจวินิจฉัยและดูแลอย่างเหมาะสม หรือเริ่มจากโทรปรึกษาสายด่วนสุขภาพจิต 1323 โทรฟรี ตลอด 24 ชั่วโมง"; ximg="https://i.imgur.com/oYWzFWJ.jpg";}
        else if (score>=1.52){Level="ระดับ 4 : มีความเสี่ยงที่จะอยู่ในภาวะซึมเศร้า ควรพบผู้เชี่ยวชาญด้านสุขภาพจิตเพื่อรับการตรวจวินิจฉัยและดูแลอย่างเหมาะสม หรือเริ่มจากโทรปรึกษาสายด่วนสุขภาพจิต 1323 โทรฟรี ตลอด 24 ชั่วโมง"; ximg="https://i.imgur.com/sQU6Z19.jpg";}
        else {Level="ไม่สามารถประเมินได้"; ximg="http://fb.sanook.com/static_content/widget/full/graphic_1/1234/310234/7e4f4fe57089d9be1640f93dfa5a9ad5_1233737640.gif";};
        client.connect();
        var query = client.query("insert into tmhq (fbid,score,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20) "+ 
                                "values ('"+req.query.fName+"','"+
                                score +"','"+
                                req.query.q1+"','"+
                                req.query.q1+"','"+
                                req.query.q2+"','"+
                                req.query.q3+"','"+
                                req.query.q4+"','"+
                                req.query.q5+"','"+
                                req.query.q6+"','"+
                                req.query.q7+"','"+
                                req.query.q8+"','"+
                                req.query.q9+"','"+
                                req.query.q10+"','"+
                                req.query.q11+"','"+
                                req.query.q12+"','"+
                                req.query.q13+"','"+
                                req.query.q14+"','"+
                                req.query.q15+"','"+
                                req.query.q16+"','"+
                                req.query.q17+"','"+
                                req.query.q18+"','"+
                                req.query.q19+"','"+
                                req.query.q20+"')");
                                
    
        query.on("end", function (result) {          
            client.end(); 
            dialog.showMessageBox({ message: Level, buttons: ["OK"],title:"แจ้งผลการทดสอบ TMHQ",type:"info" });
            res.write('Success');
            res.end(); 
                        
            /*var dname = 0;
            dname = req.query.fName.length % 2;
            if (dname == 0)
                res.redirect('/feedback.html?fbid='+req.query.fName);
            else 
                res.redirect('https://m.me/JubjaiBot');*/
             
        });

    },
    /*
    addFeedback : function(req, res){
        
        console.write("in dbOperation addFeedback");
        
        var post_data = req.body;
        var pg = require('pg');  
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        //var conString = process.env.DATABASE_URL;
        var client = new pg.Client(conString);

        client.connect();
        //var query = client.query("insert into feedback (fbid,age,sex,edu,job,email,qcb1,qcb2,qcb3,qcb4,goodcb,badcb,qq1,qq2,qq3,qq4,goodq,badq,qa1,qa2,qacomment) "+ 
        //                        "values ('"+  post_data.fName +"','" + post_data.age +"','" + post_data.sex +"','" + post_data.edu+"','" + post_data.job+"','" + post_data.email+"','" + post_data.qcb1+"','" + post_data.qcb2+"','" + post_data.qcb3+"','" + post_data.qcb4+"','" + post_data.goodcb+"','" + post_data.badcb+"','" + post_data.qq1+"','" + post_data.qq2+"','" + post_data.qq3+"','" + post_data.qq4+"','" + post_data.goodq+"','" + post_data.badq+"','" + post_data.qa1+"','" + post_data.qa2+"','" + post_data.qacomment   +"')");
        var query = client.query("insert into feedback (fbid,age) "+ 
                                "values ('"+  post_data.fName +"','"+
                                post_data.age+"')");
                                
        query.on("end", function (result) {   
            //console.write(result);       
            client.end(); 
            res.write('Success');
            res.end();  
        }
    );
        
    },
       
     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from employee Where id ="+req.query.id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    */
    createTable : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "CREATE TABLE tmhq"+
                                    "("+
                                    "fbid character varying(50),"+
                                    "q1 character varying(1),"+
                                    "q2 character varying(1),"+
                                    "q3 character varying(1),"+
                                    "q4 character varying(1),"+
                                    "q5 character varying(1),"+
                                    "q6 character varying(1),"+
                                    "q7 character varying(1),"+
                                    "q8 character varying(1),"+
                                    "q9 character varying(1),"+
                                    "q10 character varying(1),"+
                                    "q11 character varying(1),"+
                                    "q12 character varying(1),"+
                                    "q13 character varying(1),"+
                                    "q14 character varying(1),"+
                                    "q15 character varying(1),"+
                                    "q16 character varying(1),"+
                                    "q17 character varying(1),"+
                                    "q18 character varying(1),"+
                                    "q19 character varying(1),"+
                                    "q20 character varying(1),"+
                                    "id serial NOT NULL"+
                                  ")");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Created');
            res.end();  
        });

    },
    
    dropTable : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL || "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Drop TABLE employee");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });

    }

    
};