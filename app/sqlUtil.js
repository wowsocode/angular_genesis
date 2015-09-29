var mysql = require('mysql');
var util = require('util');
var async = require('async');

var connection = mysql.createConnection({
    database: "insainey_hapi",
    connectionLimit: 10,
    host: "70.39.234.39",
    user: "insainey_hapi",
    password: ")apqGdxv9]Bk"
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution is: ', rows[0].solution);
});
 
connection.end();
// var default_config = {
//     database: "insainey_hapi",
//     connectionLimit: 10,
//     host: "70.39.234.39",
//     user: "insainey_hapi",
//     password: ")apqGdxv9]Bk" /* dev test settings here */
// };

// var connection = mysql.createConnection(default_config);

// connection.connect();
// .connect(function (err) {
//     if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });


var sqlConfig;

var pool = null;
var connections = {
    active: 0,
    opened: 0,
    closed: 0,
    errors: 0,
    queries: 0
};

exports.start = function start(config, cb) {

    sqlConfig = config;
    exports.testSQL(cb);

    var interval = 14400000; // 4 Hours
    if (global.appConfig.debug) {
        interval = 3600000; // Hourly
    }
    setInterval(SQLStatus, interval);

};
exports.testSQL = function testSQL(cb) {

    // Test SQL Working
    openSQLConnection(function(conn) {
        if (conn) {
            console.log("Connection tested successfully");
            conn.release();
            if (cb) {
                cb(null);
            }

        } else {
            if (cb) {
                cb(new Error("Testing SQL Failed"));
            }
        }
    });

    // var test_data = [{"dateTimeStamp":1418135355000,"location":"C02UQ5ULT","user":null,"text":"<@U024TE6S5|gary.nakanelua> has left the channel"},{"dateTimeStamp":1418119735000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"HttpStatusCode [500], uri: /aime/Fronts.svc/fronts/site/{siteId}, - at Gannett.Modules.Utilities.CoreClient.CoreClientBase.HandleErrors(IRestRequest request, IRestResponse response, Boolean rethrow) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\CoreClientBase.cs:line 146 at Gannett.Modules.Utilities.CoreClient.CoreClientBase.Execute(IRestRequest request) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\CoreClientBase.cs:line 44 at RestSharp.RestClient.Execute[T](IRestRequest request) at Gannett.Modules.Utilities.CoreClient.CoreClientBase.Execute[T](RestRequest request) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\CoreClientBase.cs:line 53 at Gannett.Modules.Utilities.CoreClient.FrontsServiceAgent.GetFrontsBySite(Int64 siteId, Boolean seriesOnly, Boolean sort, String status) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\FrontsServiceAgent.cs:line 188 at Gannett.Modules.Utilities.CoreClient.FrontsServiceAgent.GetFrontsBySite(Int64 siteId, Boolean seriesOnly, String status) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\FrontsServiceAgent.cs:line 175 at Gannett.Modules.Utilities.CoreClient.FrontsServiceAgent.GetFronts(Int64 siteId, String searchTerm, Boolean inActiveOnly) in l:\\Workspace\\Workflow-MultiSite\\DNN\\DesktopModules\\UDMW\\Utilities\\CoreClient\\FrontsServiceAgent.cs:line 45 at DotNetNuke.Modules.ManageFronts.View.rtlFronts_NeedDataSource(Object sender, TreeListNeedDataSourceEventArgs e)"},{"dateTimeStamp":1418074659000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"3AM RP/RB: <https://confluence.gannett.com/display/GDPREL/5.9.5.0+Production+GDP+Release>"},{"dateTimeStamp":1418073351000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"i'll take care of it now"},{"dateTimeStamp":1418073347000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"oh shit, sorry got sidetracked with work"},{"dateTimeStamp":1418072239000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"finish"},{"dateTimeStamp":1418072235000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"seth can we finsh"},{"dateTimeStamp":1418070090000,"location":"C02UQ5ULT","user":"U02MT4ZR1","text":"Hey Guys, GDPREL-4317\t\nPush updates for <http://marcoislandflorida.com|marcoislandflorida.com> mappings is what I was mentioning."},{"dateTimeStamp":1418069963000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"thanks seth"},{"dateTimeStamp":1418069747000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"Environment has achieved normality. Anything you still can't cope with is therefore your own problem."},{"dateTimeStamp":1418069676000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"enabling second half"},{"dateTimeStamp":1418069673000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"confirmed phx is good"},{"dateTimeStamp":1418069662000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"looks good"},{"dateTimeStamp":1418069654000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"confirmed moc is good"},{"dateTimeStamp":1418069628000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"ok"},{"dateTimeStamp":1418069541000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"bcast finishing up on the second half"},{"dateTimeStamp":1418069371000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"uscp finishing up on the second half"},{"dateTimeStamp":1418068975000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"ok"},{"dateTimeStamp":1418068896000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"i concur, enabling first half and disabling second"},{"dateTimeStamp":1418068745000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"both looks good on first half"},{"dateTimeStamp":1418068708000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"and checking broadcast now"},{"dateTimeStamp":1418068703000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"uscp looks good"},{"dateTimeStamp":1418068695000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"you can check that too"},{"dateTimeStamp":1418068555000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"bcast is finishing up for 1st half"},{"dateTimeStamp":1418068533000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"for ip in {{42..91},{129..158}}; do echo -n \"$ip - \" ; curl -s -H \"Host: <http://ux.app.com|ux.app.com>\" <http://10.186.50>.$ip/ | grep -i window.site_static_path; done"},{"dateTimeStamp":1418068510000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"for ip in {{42..91},{129..158}}; do echo -n \"$ip - \" ; curl -s -H \"Host: <http://ux.app.com|ux.app.com>\" <http://10.189.50>.$ip/ | grep -i window.site_static_path; done"},{"dateTimeStamp":1418068458000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"you can check first half uscp"},{"dateTimeStamp":1418068455000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"uscp"},{"dateTimeStamp":1418068454000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"bcastmob"},{"dateTimeStamp":1418068453000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"can i check"},{"dateTimeStamp":1418068450000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"bcast installing for first half"},{"dateTimeStamp":1418068444000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"ok"},{"dateTimeStamp":1418068415000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"for uscp-web"},{"dateTimeStamp":1418068408000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"first half finishing up now"},{"dateTimeStamp":1418068055000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"ok"},{"dateTimeStamp":1418068035000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"toggling down first set"},{"dateTimeStamp":1418067913000,"location":"C02UQ5ULT","user":"U02QL89JR","text":":raised_hands:"},{"dateTimeStamp":1418067829000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"updating SF now"},{"dateTimeStamp":1418067809000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"okey dokey"},{"dateTimeStamp":1418066631000,"location":"C02UQ5ULT","user":"U02QL89JR","text":":information_desk_person:"},{"dateTimeStamp":1418066344000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"can we please start the prod"},{"dateTimeStamp":1418066338000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"Broadcast-mobile 1.4"},{"dateTimeStamp":1418066321000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"uscp-web 45.1.1"},{"dateTimeStamp":1418066170000,"location":"C02UQ5ULT","user":"U02QL89JR","text":"HI"},{"dateTimeStamp":1417813613000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"Sri has you covered"},{"dateTimeStamp":1417813605000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"if I am... I won't be managing any releases, ha"},{"dateTimeStamp":1417813591000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"pffffyt"},{"dateTimeStamp":1417813185000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"Nico"},{"dateTimeStamp":1417812960000,"location":"C02UQ5ULT","user":"U02HA1ZM3","text":"You gonna be up?"},{"dateTimeStamp":1417812553000,"location":"C02UQ5ULT","user":"U02J8HH00","text":"3 AM Runbook/Release Plan: <https://gannett.jira.com/wiki/display/GDPREL/5.9.3.1+Production+GDP+Release>"}];
    // console.log(convertHistoryDataToArray(test_data));
};

exports.getConnection = function(cb) {
    openSQLConnection(cb);
};

// open sql
/***
 * Opens connection to SQL and calls back with (connection)
 * @param callback connection or null
 */
function openSQLConnection(callback) {

    if (!pool) { // if no pool create pool
        if (sqlConfig) {} else if (global.appConfig) {
            sqlConfig = global.appConfig.sql || default_config;
        } else {
            sqlConfig = default_config;
        }
        pool = mysql.createPool(sqlConfig);

        pool.on('connection', function(statusConn) {

            connections.opened = connections.opened + 1;
            connections.active = connections.active + 1;

            statusConn.on('end', function(err) {
                if (err) {
                    console.error(err);
                    connections.errors = connections.errors + 1;
                }
                connections.closed = connections.closed + 1;
                connections.active = connections.active - 1;
            });

        });
        pool.getConnection(sqlPoolHandler);
    } else {
        pool.getConnection(sqlPoolHandler);
    }

    function sqlPoolHandler(err, connection) {
        if (err) {
            if (err.fatal) {
                pool.end(function() {
                    pool = mysql.createPool(sqlConfig);
                });
            } else {
                console.error(err);
            }
            callback(null);
        } else {
            connections.queries = connections.queries + 1;
            callback(connection);
        }
    }

}

function SQLStatus() {

    if (pool) {
        console.log("SQL STATUS :: %j", connections);
    }
}

module.exports = exports;