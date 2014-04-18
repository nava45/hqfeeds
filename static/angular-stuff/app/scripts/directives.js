angular.module('hqFeeds')
    .directive('feedDetails', ['FeedsService', '$sce',
        function(FeedsService, $sce) {
            return {
                restrict: 'A',
                templateUrl: '/static/angular-stuff/app/views/feed_details_widget.html',
                scope: {
                    feedDetailsData: '='
                },
                link: function($scope, $element, $attrs) {
                    $scope.sanitize_description = function() {
                            return $sce.trustAsHtml($scope.feedDetailsData.description);
                    };
                }
            };
        }]).directive('feedInfo', ['FeedsService','$rootScope', '$interval',
        function(FeedsService, $rootScope, $interval) {
            return {
                restrict: 'A',
                templateUrl: '/static/angular-stuff/app/views/feeds_info_widget.html',
                scope: {
                    feedInfoData: '='
                },
                link: function($scope, $element, $attrs) {
                    $scope.show_feed = function() {
                        return $scope.feed_info_data;
                    };

                    $scope.get_feeds_for_uri = function(uri_info, uri_label, feed_label) {
                        console.log("This is the URI to be obtianed " , uri_info);
                        FeedsService.set_feed_uri (uri_info, uri_label, feed_label);
                        $rootScope.$broadcast("UPDATE_FEED_DETAILS","");
                        console.log("Emitting signal to update changes everywhere ");
                    };

//                    $interval(function() {
//                        console.log("Fetching and updating any feed updates !! ");
//                        $rootScope.$broadcast("UPDATE_FEED_DETAILS","");
//                    }, 50000);

                }
            };
        }]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var model = $parse($attrs.fileModel);
                var modelSetter = model.assign;

                $element.bind('change', function(){
                    $scope.$apply(function(){
                        modelSetter($scope, $element[0].files[0]);
                        $scope.setFile($scope.myFile);
                    });
                });
            }
        };

        }]);