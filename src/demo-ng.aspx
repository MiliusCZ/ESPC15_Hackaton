<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script type="text/javascript" src="../utils/datehelper.js"></script>
    <script type="text/javascript" src="../utils/loghelper.js"></script>

    <link rel="stylesheet" type="text/css" href="../lib/bootstrap-3.3.5.min.css">

    <script type="text/javascript" src="../lib/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../lib/bootstrap-3.3.5.min.js"></script>
    <script type="text/javascript" src="../lib/angular-1.4.7.min.js"></script>
    <script type="text/javascript" src="../lib/angular-filter-0.5.5.min.js"></script>

    <script type="text/javascript" src="demo-ng.js"></script>

    <script type="text/javascript" data-app-id="DgAzubS5xJeBaVyYqefB2w" src="https://c64.assets-yammer.com/assets/platform_js_sdk.js"></script>
</head>
<body>
    <div ng-app="myApp" ng-controller="myCtrl">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header hidden-xs">
                    <a class="navbar-brand" href="#">Goomer;)
                    </a>
                </div>

                <div class="navbar-text navbar-right" style="margin-right: 15px">
                    <span id="yammer-login" ng-model="yammerLogin"></span>
                    <script>
                        yam.connect.loginButton('#yammer-login', function (resp) {
                            if (resp.authResponse) {
                                document.getElementById('yammer-login').innerHTML = 'Welcome, ' + resp.user.full_name;
                            }
                        });
                    </script>
                </div>
            </div>
        </nav>
        <div class="page-header text-center">
            <h1><span style="color:#2196F3">G</span><span style="color:#FF5722">o</span><span style="color:#FFAB00">o</span><span style="color:#2196F3">mer;)</span> <small class="hidden-sm hidden-xs">A Google-like Yammer knowledge search</small></h1>
        </div>
        <div class="container">
            <div class="jumbotron text-center">

                <div class="form-group">
                    <input type="text" class="form-control" id="searchTerm" placeholder="Start typing for search" ng-model="SearchTermItem" ng-change="change(SearchTermItem)">
                </div>

                <p><a class="btn btn-primary btn-lg" href="#" role="button" ng-click="postMessage()">Post a question</a></p>
            </div>
        </div>
        <div class="container">
            <div class="alert alert-info" role="alert" ng-show="loading">{{ loading }} </div>
            <div class="alert alert-warning" role="alert" ng-show="SearchTermItem&&!loading&&!dataSource.pagesAvailable&&!dataSource.messagesAvailable">There are no validated guides, feel free to post the question</div>
            <div class="alert alert-success" role="alert" ng-show="submitting">{{ submitting }}</div>
            <div class="alert alert-danger" role="alert" ng-show="error">{{ error }}</div>
        </div>

        <div class="container" ng-show="dataSource.pagesAvailable">
            <h2>Validated knowledge</h2>
            <span ng-repeat-start="page in dataSource.pages" ng-show="false"></span>

            <div>
                <a href="{{ page.web_url }}" target="_blank">
                    <strong>{{ page.name }}</strong>
                </a>

                <p>{{ page.description | limitTo:200 }}</p>
            </div>

            <span ng-repeat-end="" ng-show="false"></span>
        </div>
    </div>
</body>
</html>
