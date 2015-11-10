var DateHelper = function () { }

DateHelper.convertDate = function (dateIn) {
    if (!dateIn)
        return null;

    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return String(yyyy + '-' + mm + '-' + dd); // Leading zeros for mm and dd
}