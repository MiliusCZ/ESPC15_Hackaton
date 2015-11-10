var SharePointHelper = function (options, dataSource) {
    this.options = options,
    this.dataSource = dataSource
}

SharePointHelper.prototype.init = function (callback) {
    var spInstance = this;
    ExecuteOrDelayUntilScriptLoaded(function () {
        sharepointReady(spInstance, callback);
    }, "sp.js");
}

SharePointHelper.enumerateSharePointData = function (spItemCollection, columnData) {
    var resultCollection = new Array();

    var enumerator = spItemCollection.getEnumerator();

    while (enumerator.moveNext()) {
        var spItem = enumerator.get_current();

        var resultRow = {};

        $.each(columnData, function (index, value) {
            resultRow[value.propertyName] = spItem.get_fieldValues()[value.spColumnName];
        });

        resultCollection.push(resultRow);
    }

    return resultCollection;
}

SharePointHelper.getDefaultQuery = function (rowLimit) {
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><RowLimit>' + rowLimit + '</RowLimit></View>');

    return camlQuery;
}

SharePointHelper.executeQueryAsync = function (ctx, callback) {
    ctx.executeQueryAsync(Function.createDelegate(this, callback, Function.createDelegate(this, this.onSharePointQueryFailed)));
}

function sharepointReady(spInstance, callback) {
    var ctx = new SP.ClientContext(spInstance.options.siteUrl);

    callback(ctx, spInstance);
}

function onSharePointQueryFailed(sender, args) {
    LogHelper.log("Asynchronous SharePoint call failed");
    LogHelper.log(args);
}