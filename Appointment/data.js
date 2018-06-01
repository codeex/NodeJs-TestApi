var Mock = require('mockjs');
var Random = Mock.Random;
var TwData = {
    'Id' :"s00000",
    'Name':'SX2121',
    'Domain':'PUBLIC'
};
var TwdData = {
    'Id' :TwData.Id,
    'Name':'SX2121',
    'Domain':'PUBLIC',
    'ProcessCondition':'天',
    'ProcessUnit':'地'
};
var dData = {
    'Id':'d0001',
    'Name':'dockxxx',
    'Type':'Tx1',
    'WhId':'WhId'

};
var data = {   
    SaveDock:{
        "IsEdit": false,
        "DockId": dData.Id,
        "DockName": dData.Name,
        "DockType": dData.Type,
        "LocationId": "Id",
        "LocationGid": "gid",
        "WhId": dData.WhId,
        "WhName": "WhName",
        "DockWindowId": TwData.Id,
        "ProcessAbilityQty": 10.0,
        "IsActive": 11,
        "DomainName": "PUBLIC",
        "AuthUsers":"aaa,bbb,ccc,ddd,eee,fffff"
    },
    GetDock:{
        DockId:dData.Id
    },
    GetDockList:{
        "QueryModel":{"Items":[{"Field":"DockId","Method":"Contains","Value":dData.Id}]},
        "PageInfo":{"CurrentPage":1,"PageSize":20,"SortField":"CreatedDate","SortDirection":"DESC","IsPaging":true,"IsGetTotalCount":true}
    },
    GetDockListByText:{
        "WhId": dData.WhId,
        "Text": dData.Id
    },
    GetDockListByText2:{
        "WhId": dData.WhId,
        "Text": dData.Name
    },
    DeleteDock:{
        "Pks":[{'DockId': dData.Id}]
    },
 SaveTimeWindow : Mock.mock(
    {
        'IsEdit': false,
        "DockWindowId": TwData.Id,
        "DockWindowName": TwData.Name,
        "ProcessAbilityQty|+1": 4.0,
        "IsActive": 5,
        "DomainName": TwData.Domain,
        "Remark": "sample string 7"
      }
    ),
    GetTimeWindow : {
        "DockWindowId": TwData.Id
    },
    GetTimeWindowList:{
        "QueryModel":{"Items":[{"Field":"DockWindowId","Method":"Contains","Value":TwData.Id}]},
        "PageInfo":{"CurrentPage":1,"PageSize":20,"SortField":"CreatedDate","SortDirection":"DESC","IsPaging":true,"IsGetTotalCount":true}
    },
    GetTimeWindowListByText:{
        "Text":TwData.Id
    },
    GetTimeWindowListByText1:{
        "Text":TwData.Name
    },
    DeleteTimeWindow:{
        "Pks":[{'DockWindowId':TwData.Id}]
    },
    SaveTimeWindowDetail:{
        'IsEdit': false,
        "DockWindowId": TwdData.Id,
        "StartTime": Random.now('yyyy-MM-dd 12:mm:ss') ,
        "EndTime": Random.now('yyyy-MM-dd 14:mm:ss') ,
        "ProcessAbilityQty": 4.0,
        "IsActive": 5,
        "ProcessCondition": TwdData.ProcessCondition,
        "ProcessUnit": TwdData.ProcessUnit
    },
    RepeatSaveTimeWindowDetail1:{
        'IsEdit': false,
        "DockWindowId": TwdData.Id,
        "StartTime": Random.now('yyyy-MM-dd 9:mm:ss') ,
        "EndTime": Random.now('yyyy-MM-dd 13:mm:ss') ,
        "ProcessAbilityQty": 4.0,
        "IsActive": 5,
        "ProcessCondition": TwdData.ProcessCondition,
        "ProcessUnit": TwdData.ProcessUnit
    },
    RepeatSaveTimeWindowDetail2:{
        'IsEdit': false,
        "DockWindowId": TwdData.Id,
        "StartTime": Random.now('yyyy-MM-dd 13:mm:ss') ,
        "EndTime": Random.now('yyyy-MM-dd 15:mm:ss') ,
        "ProcessAbilityQty": 4.0,
        "IsActive": 5,
        "ProcessCondition": TwdData.ProcessCondition,
        "ProcessUnit": TwdData.ProcessUnit
    },
    RepeatSaveTimeWindowDetail3:{
        'IsEdit': false,
        "DockWindowId": TwdData.Id,
        "StartTime": Random.now('yyyy-MM-dd 18:mm:ss') ,
        "EndTime": Random.now('yyyy-MM-dd 12:mm:ss') ,
        "ProcessAbilityQty": 4.0,
        "IsActive": 5,
        "ProcessCondition": TwdData.ProcessCondition,
        "ProcessUnit": TwdData.ProcessUnit
    },
    ModifySaveTimeWindowDetail:{
        'IsEdit': true,
        'TimeFrame':'',
        "DockWindowId": TwdData.Id,
        "StartTime": Random.now('yyyy-MM-dd 9:mm:ss') ,
        "EndTime": Random.now('yyyy-MM-dd 12:mm:ss') ,
        "ProcessAbilityQty": 10.0,
        "IsActive": 10,
        "ProcessCondition": TwdData.ProcessCondition + '-mdf',
        "ProcessUnit": TwdData.ProcessUnit + '-mdf'
    },
    GetTimeWindowDetailByText:{
        'DockWindowId':TwdData.Id,
        'Text':'12'
    },
    GetTimeWindowDetailList:{
        
        "QueryModel":{"Items":[{"Field":"DockWindowId","Method":"Equal","Value":TwdData.Id}]},
        "PageInfo":{"CurrentPage":1,"PageSize":20,"SortField":"CreatedDate","SortDirection":"DESC","IsPaging":true,"IsGetTotalCount":true}
        
        //'DockWindowId':TwdData.Id
    },
    DeleteTimeWindowDetail:{
        Pks: [{
            'DockWindowId':TwdData.Id,
            'TimeFrame':'xxx'
        }]
    },
    GetTimeWindowDetail:{
        'DockWindowId':TwdData.Id,
        'TimeFrame':'xxx'
    }

};
module.exports = data;