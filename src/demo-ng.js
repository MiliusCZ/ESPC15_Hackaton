var groupId = 6672154;
var validatedTagId = 10184903;

this.app = angular.module('myApp', []);
this.app.controller('myCtrl', function ($scope, $q) {

    $scope.submitting = false;
    $scope.loading = false;
    $scope.searchTerm = '';
    $scope.dataSource = {
        messages: new Array(),
        pages: new Array()
    };

    $scope.waiting = {};

    $scope.change = function (item) {
        $scope.searchTerm = item;
        $scope.loading = "Searching for validated guides..";

        //Wait for user pauses after writing to avoid yammer api treshold
        clearTimeout($scope.waiting);
        $scope.waiting = setTimeout(function () { $scope.search(); }, 500);
    }

    $scope.search = function () {
        if ($scope.searchTerm == '') {
            $sope.loading = false;
            return;
        }

        var modifiedSearchTerm = $scope.searchTerm + "*";
        console.log("searching " + modifiedSearchTerm);

        var loadDeferred = $q.defer();

        var promise = loadDeferred.promise;

        promise.then(function (data) {
            $scope.dataSource = data;
            $scope.loading = false;
        });

        yam.getLoginStatus(function (response) {
            if (response.authResponse) {
                console.log("logged in");
                yam.platform.request({
                    url: "search.json",
                    method: "GET",
                    data: {
                        "search": modifiedSearchTerm,
                        "page": "1",
                    },
                    success: function (data) {
                        console.log("The request was successful.");
                        console.dir(data);

                        var resultData = {
                            pages: $.grep(data.pages, function (value, index) {
                                var idExists = false;
                                $.each(value.topics, function (tIndex, tValue) {
                                    if (tValue.id == validatedTagId) {
                                        idExists = true;
                                        return;
                                    }
                                });
                                return idExists;
                            })
                        };
                        resultData.pages = $.grep(resultData.pages, function (value, index) { return value.group_id == groupId });
                        resultData.pagesAvailable = resultData.pages ? resultData.pages.length > 0 : false;

                        loadDeferred.resolve(resultData);
                    },
                    error: function (user) {
                        alert("There was an error with the request.");
                    }
                });
            }
            else {
                alert("not logged in")
            }
        }
        );

        $scope.postMessage = function () {
            $scope.loading = "Posting your question";

            var loadDeferred = $q.defer();

            var promise = loadDeferred.promise;

            promise.then(function () {
                $scope.loading = false;
                $scope.submitting = "Your question was posted..";
                $scope.SearchTermItem = "";
                setTimeout(function () {
                    $scope.submitting = false;
                    $scope.$apply();
                }, 1000);
            });

            yam.getLoginStatus(function (response) {
                if (response.authResponse) {
                    console.log("logged in");
                    yam.platform.request({
                        url: "messages.json",
                        method: "POST",
                        data: {
                            "body": $scope.searchTerm,
                            "group_id": groupId,
                        },
                        success: function (data) {
                            console.log("Your question was successfully submitted.");
                            loadDeferred.resolve();
                        },
                        error: function (user) {
                            alert("There was an error posting your question.");
                        }
                    });
                }
                else {
                    alert("not logged in")
                }
            });
        }
    }
});


