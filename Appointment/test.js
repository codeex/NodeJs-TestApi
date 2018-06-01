var requestBefore = require('supertest')('http://192.168.100.121');
var request = require('supertest')('http://192.168.100.121/api2/mark');
//var request = require('supertest')('http://192.168.100.121/api/SCMAppointmentService');
var loginUri = "/SCM.Cloud.Web/Login/Login";
var baseUri = "/api/SCMBaseService/GetTokenBySsid";
var user = {
    userid:'gavin',
    password:'admin'
};
var md5 = require('md5');
var assert = require('assert');
const should = require('should');
var token = "0f4ed4b0-b60a-4b64-bcd4-d8c46374e515";
var data=require("./data.js");
const cookieParser = require('cookie-parser');

describe('Appointment Api', function () {

    this.timeout(10000);  

    before('check http proxy ....', function (done) {  
        // console.log('userid='+user.userid +'&password='+ md5(user.userid + md5(user.password)));      
        requestBefore.post(loginUri)
            .send('userid='+user.userid +'&password='+ md5(user.userid + md5(user.password))) // x-www-form-urlencoded upload
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                var ssid ='';
                //console.log('login success！'); 
                res.header['set-cookie'].should.be.instanceof(Array);                   
                var arrCookie = res.header['set-cookie'][0].split(';');
                arrCookie.should.be.instanceof(Array);                
                for(var i=0;i<arrCookie.length;i++){
                    var nIndex = arrCookie[i].indexOf('SSID=');
                    if(nIndex >= 0){
                        ssid = arrCookie[i].substring(nIndex+5).replace(/(^\s*)|(\s*$)/g, '');
                        //console.log(ssid);  
                        break;
                    }
                }
                ssid.should.not.empty();   
                //console.log(ssid);                        
                requestBefore.post(baseUri)
                    .send({"v":{'SSID':ssid},"lg":"zh_cn","tk":token})
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err,res){               
                        // HTTP status should be 200
                        //res.status.should.equal(200);
                        var c = res.body.c;
                        var v = res.body.v;                        
                        // Error key should be false.
                        if(c != 200){
                            console.log('\tError['+c+']:' + res.body.msg);
                        }
                        c.should.equal(200);
                        v.should.not.empty();
                        v.Token.should.not.empty();                           
                        token = v.Token;
                        console.log('Token:' + token);
                        done();
                    });    
            }); 
    });

    it('SaveDock Api', function (done) {
        request.post('/SaveDock')
            .send({"v":data.SaveDock,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(200);                           
                //assert(v,{});
                done();
            });            
    });

    it('GetDock Api', function (done) {
        request.post('/GetDock')
            .send({"v":data.GetDock,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                //console.log('\tbody:' + res.body);
                c.should.equal(200);  
                 v.should.be.instanceof(Object);
                 v.should.not.empty();                
                 v.should.have.properties('DockId', 'DockName','DockType','LocationId','LocationGid','WhId','WhName','DockWindowId','ProcessAbilityQty','IsActive','DomainName');
                 v.DockId.should.equal(data.SaveDock.DockId); 
                 v.DockName.should.equal(data.SaveDock.DockName); 
                 v.DockType.should.equal(data.SaveDock.DockType); 
                 v.LocationId.should.equal(data.SaveDock.LocationId); 
                 v.LocationGid.should.equal(data.SaveDock.LocationGid); 
                 v.WhId.should.equal(data.SaveDock.WhId); 
                 v.WhName.should.equal(data.SaveDock.WhName); 
                 v.DockWindowId.should.equal(data.SaveDock.DockWindowId); 
                 v.ProcessAbilityQty.should.approximately(data.SaveDock.ProcessAbilityQty,0.001); 
                 v.IsActive.should.equal(data.SaveDock.IsActive);  
                 v.DomainName.should.equal(data.SaveDock.DomainName);                         
                //assert(v,{});
                done();
            });            
    });

    it('GetDockList Api', function (done) {
        request.post('/GetDockList')
            .send({"v":data.GetDockList,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.ListValue.should.be.instanceof(Array); 
                v.ListValue[0].should.have.properties('DockId');
                v.ListValue[0].DockId.should.containEql(data.SaveDock.DockId);                                       
                //assert(v,{});
                done();
            });            
    });
    it('GetDockListByText Id Api', function (done) {
        request.post('/GetDockListByText')
            .send({"v":data.GetDockListByText,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Array);  
                v[0].should.containEql({"DockId" : data.SaveDock.DockId}); 
                v[0].should.containEql({"AuthUsers" : data.SaveDock.AuthUsers});      
                v[0].should.containEql({"DockName" : data.SaveDock.DockName});
                v[0].should.containEql({"DockType" : data.SaveDock.DockType});
                v[0].should.containEql({"LocationId" : data.SaveDock.LocationId});
                v[0].should.containEql({"LocationGid" : data.SaveDock.LocationGid});
                                                
                //assert(v,{});
                done();
            });            
     });    

     it('GetDockListByText Text Api', function (done) {
        request.post('/GetDockListByText')
            .send({"v":data.GetDockListByText2,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Array);  
                v[0].should.containEql({"DockId" : data.SaveDock.DockId});                                       
                //assert(v,{});
                done();
            });            
     }); 
     it('DeleteDock Api', function (done) {
        request.post('/DeleteDock')
            .send({"v":data.DeleteDock,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }                
                c.should.equal(200);  
                done();
            });            
     });       

    it('SaveTimeWindow Api', function (done) {
        request.post('/SaveTimeWindow')
            .send({"v":data.SaveTimeWindow,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(200);                           
                //assert(v,{});
                done();
            });            
    });

    it('GetTimeWindow Api', function (done) {
        request.post('/GetTimeWindow')
            .send({"v":data.GetTimeWindow,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                //console.log('\tbody:' + res.body);
                c.should.equal(200);  
                 v.DockWindowId.should.equal(data.SaveTimeWindow.DockWindowId); 
                 v.DockWindowName.should.equal(data.SaveTimeWindow.DockWindowName); 
                 v.ProcessAbilityQty.should.approximately(data.SaveTimeWindow.ProcessAbilityQty,0.001);  
                 v.DomainName.should.equal(data.SaveTimeWindow.DomainName);                         
                //assert(v,{});
                done();
            });            
    });

    it('GetTimeWindowList Api', function (done) {
        request.post('/GetTimeWindowList')
            .send({"v":data.GetTimeWindowList,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.ListValue.should.be.instanceof(Array);  
                v.ListValue[0].DockWindowId.should.containEql(data.SaveTimeWindow.DockWindowId);                                       
                //assert(v,{});
                done();
            });            
    });

    it('GetTimeWindowListByText Id Api', function (done) {
        request.post('/GetTimeWindowListByText')
            .send({"v":data.GetTimeWindowListByText,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Array);  
                v[0].DockWindowId.should.containEql(data.SaveTimeWindow.DockWindowId);                                       
                //assert(v,{});
                done();
            });            
     });    

     it('GetTimeWindowListByText Text Api', function (done) {
        request.post('/GetTimeWindowListByText')
            .send({"v":data.GetTimeWindowListByText1,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Array);  
                v[0].should.containEql({"DockWindowId" : data.SaveTimeWindow.DockWindowId});                                       
                //assert(v,{});
                done();
            });            
     });  
     /**********开始子项测试****************** */
     it('SaveTimeWindowDetail Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.SaveTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(200);                                            
                //assert(v,{});
                done();
            });            
    });
    it('SaveTimeWindowDetail RepeatInsert Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.SaveTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 100003){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(100003);                           
                //assert(v,{});
                done();
            });            
    });
    it('SaveTimeWindowDetail timespan1 Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.RepeatSaveTimeWindowDetail1,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 100006){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(100006);                           
                //assert(v,{});
                done();
            });            
    });
    it('SaveTimeWindowDetail timespan2 Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.RepeatSaveTimeWindowDetail2,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 100006){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(100006);                           
                //assert(v,{});
                done();
            });            
    });
    it('SaveTimeWindowDetail timespan3 Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.RepeatSaveTimeWindowDetail3,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 100005){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(100005);                           
                //assert(v,{});
                done();
            });            
    });   

    it('GetTimeWindowDetailByText Api', function (done) {
        request.post('/GetTimeWindowDetailByText')
            .send({"v":data.GetTimeWindowDetailByText,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                //console.log('\tbody:' + res.body);
                c.should.equal(200); 
                 v.should.be.instanceof(Array);
                 v.should.not.empty();
                 data.ModifySaveTimeWindowDetail.TimeFrame = v[0].TimeFrame;
                 data.GetTimeWindowDetail.TimeFrame = data.ModifySaveTimeWindowDetail.TimeFrame;
                 data.DeleteTimeWindowDetail.Pks[0].TimeFrame =  data.ModifySaveTimeWindowDetail.TimeFrame;
                 v[0].should.have.properties('DockWindowId', 'IsActive','ProcessAbilityQty','ProcessCondition','ProcessUnit'); 
                 v[0].DockWindowId.should.equal(data.SaveTimeWindowDetail.DockWindowId); 
                 v[0].IsActive.should.equal(data.SaveTimeWindowDetail.IsActive); 
                 v[0].ProcessAbilityQty.should.approximately(data.SaveTimeWindowDetail.ProcessAbilityQty,0.001);  
                 v[0].ProcessCondition.should.equal(data.SaveTimeWindowDetail.ProcessCondition);   
                 v[0].ProcessUnit.should.equal(data.SaveTimeWindowDetail.ProcessUnit);    
                //assert(v,{});
                done();
            });            
    });

    it('GetTimeWindowDetailList Api', function (done) {
        request.post('/GetTimeWindowDetailList')
            .send({"v":data.GetTimeWindowDetailList,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                // console.log( res.body);
                c.should.equal(200);  
                v.ListValue.should.be.instanceof(Array);  
                v.ListValue[0].DockWindowId.should.containEql(data.SaveTimeWindowDetail.DockWindowId);                                       
                //assert(v,{});
                done();
            });            
    });
    
    it('SaveTimeWindowDetail Modify Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.ModifySaveTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(200);                           
                //assert(v,{});
                done();
            });            
    });

    it('GetTimeWindowDetailByText Api', function (done) {
        request.post('/GetTimeWindowDetailByText')
            .send({"v":data.GetTimeWindowDetailByText,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                //console.log('\tbody:' + res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Array);
                 v.should.not.empty();                 
                 v[0].should.have.properties('DockWindowId', 'IsActive','ProcessAbilityQty','ProcessCondition','ProcessUnit'); 
                 v[0].DockWindowId.should.equal(data.ModifySaveTimeWindowDetail.DockWindowId); 
                 v[0].IsActive.should.equal(data.ModifySaveTimeWindowDetail.IsActive); 
                 v[0].ProcessAbilityQty.should.approximately(data.ModifySaveTimeWindowDetail.ProcessAbilityQty,0.001);  
                 v[0].ProcessCondition.should.equal(data.ModifySaveTimeWindowDetail.ProcessCondition);   
                 v[0].ProcessUnit.should.equal(data.ModifySaveTimeWindowDetail.ProcessUnit);   
                 v[0].TimeFrame.should.equal(data.ModifySaveTimeWindowDetail.TimeFrame);   
                //v.ProcessUnit.should.equal(data.ModifySaveTimeWindowDetail.ProcessUnit);    
                //assert(v,{});
                done();
            });            
    });
    
    
    it('GetTimeWindowDetail Api', function (done) {
        request.post('/GetTimeWindowDetail')
            .send({"v":data.GetTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                //console.log('\tbody:' + res.body);
                c.should.equal(200);  
                v.should.be.instanceof(Object);
                 v.should.not.empty();                 
                 v.should.have.properties('DockWindowId', 'IsActive','ProcessAbilityQty','ProcessCondition','ProcessUnit'); 
                 v.DockWindowId.should.equal(data.ModifySaveTimeWindowDetail.DockWindowId); 
                 v.IsActive.should.equal(data.ModifySaveTimeWindowDetail.IsActive); 
                 v.ProcessAbilityQty.should.approximately(data.ModifySaveTimeWindowDetail.ProcessAbilityQty,0.001);  
                 v.ProcessCondition.should.equal(data.ModifySaveTimeWindowDetail.ProcessCondition);   
                 v.ProcessUnit.should.equal(data.ModifySaveTimeWindowDetail.ProcessUnit);   
                 v.TimeFrame.should.equal(data.ModifySaveTimeWindowDetail.TimeFrame);   
                //v.ProcessUnit.should.equal(data.ModifySaveTimeWindowDetail.ProcessUnit);    
                //assert(v,{});
                done();
            });            
    });
    
    it('DeleteTimeWindowDetail Api', function (done) {
        request.post('/DeleteTimeWindowDetail')
            .send({"v":data.DeleteTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }                
                c.should.equal(200);  
                done();
            });            
     });  
     it('SaveTimeWindowDetail Api', function (done) {
        request.post('/SaveTimeWindowDetail')
            .send({"v":data.SaveTimeWindowDetail,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }
                c.should.equal(200);                                            
                //assert(v,{});
                done();
            });            
    });
     /**********结束子项测试******************* */


     it('DeleteTimeWindow Api', function (done) {
        request.post('/DeleteTimeWindow')
            .send({"v":data.DeleteTimeWindow,"lg":"zh_cn","tk":token})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err,res){
                // HTTP status should be 200
                //res.status.should.equal(200);
                var c = res.body.c;
                var v = res.body.v;
                // Error key should be false.
                if(c != 200){
                    console.log('\tError['+c+']:' + res.body.msg);
                }                
                c.should.equal(200);  
                done();
            });            
     });       
});