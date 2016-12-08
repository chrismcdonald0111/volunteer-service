volunteerService.controller('CalendarController', function($http, $scope, $compile, $timeout, uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.date = date;
        $scope.newDate;
        $scope.year;
        $scope.month;
        $scope.day;
        $scope.viewMonth;
        $scope.organizationName;
        $scope.contactName;
        $scope.phoneNumber;
        $scope.contactEmail;
        $scope.numberOfVolunteers;
        $scope.typeOfServiceProject;

        /* event source that contains custom events on the scope */
        $scope.events = [];
        $scope.clickOnDate = function(date, jsEvent, view)
        {
            $scope.day = date.format('D');
            $scope.month = date.format('M');
            $scope.year = date.format('YYYY');
            $scope.newDate = new Date($scope.year, $scope.month, $scope.day);
            $scope.viewMonth = view.start._d.getMonth() + 2;
            if($scope.viewMonth == 13) {
                $scope.viewMonth = 1;
            }

            /* check if an event exists for the date clicked on */
            var eventExists = false;
            for(var k = 0; k<$scope.events.length; k++) {
                if($scope.day == $scope.events[k].day) {
                    eventExists = true;
                    break;
                }
            }
            if(!eventExists && $scope.month == $scope.viewMonth && $scope.year >= $scope.date.getFullYear()) {
                if($scope.month == $scope.date.getMonth() + 1) {
                    if($scope.day > $scope.date.getDate()) {
                        $scope.openModal();
                    }
                }
                else if($scope.year == $scope.date.getFullYear()) {
                    if($scope.month > $scope.date.getMonth() + 1) {
                        $scope.openModal();
                    }
                }
                else {
                    $scope.openModal();
                }
            }
        };

        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };

        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                title: $scope.organizationName,
                start: new Date($scope.year, $scope.month - 1, $scope.day)
            });
        };
        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };

        $scope.renderCalendar = function(calendar) {
            $timeout(function() {
                if(uiCalendarConfig.calendars[calendar]){
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };

        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };

        $scope.retrieveMonthViewEvents = function(view) {
            $scope.getEventsMonth(view.start._d.getMonth() + 2, view.start._d.getFullYear());
        };

        $scope.loadMonthEvents = function(response) {
            for(var k = 0; k<$scope.events.length + 2; k++) {
                $scope.events.splice(0, 1);
            }
            for(var i = 0; i<response.data.length; i++) {
                $scope.events.push({
                    title: response.data[i].organization_name,
                    start: new Date(response.data[i].year, response.data[i].month - 1, response.data[i].day),
                    day: response.data[i].day,
                    month: response.data[i].month,
                    year: response.data[i].year,
                    contact_name: response.data[i].contactName,
                    phone_number: response.data[i].phoneNumber,
                    contact_email: response.data[i].contactEmail,
                    number_of_volunteers: response.data[i].numberOfVolunteers,
                    type_of_service_project: response.data[i].typeOfServiceProject,
                    color: '#a90329'
                });
            }
        };

        $scope.openModal= function(){
            $("#myModal").modal('show');
        };

        $scope.closeModal= function(){
            $("#myModal").modal('hide');
        };

        $scope.submitForm = function() {
            if ($scope.userForm.$valid) {
                $scope.postEvent();
                $scope.postEmail();
                $scope.getEventsMonth($scope.month, $scope.year);
                $scope.closeModal();
                window.location.reload();
            }
        };

        $scope.uiConfig = {
            calendar:{
                height: 550,
                editable: false,
                eventLimit: 1,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                dayClick: $scope.clickOnDate,
                viewRender: $scope.retrieveMonthViewEvents,
                eventRender: $scope.eventRender
            }
        };

        $scope.getEventsMonth = function(month, year) {
            $http({
                method: 'GET',
                url: 'http://34.193.243.89:3000/service/' + month + '/' + year
            }).then(function successCallback(response){
                $scope.loadMonthEvents(response);
            }, function errorCallback(response) {
            });
        };

        $scope.postEvent = function() {
            $http({
                method: 'POST',
                url: 'http://34.193.243.89:3000/service/new',
                data: {
                    date: $scope.newDate,
                    year: $scope.year,
                    month: $scope.month,
                    day: $scope.day,
                    organization_name: $scope.organizationName,
                    contact_name: $scope.contactName,
                    phone_number: $scope.phoneNumber,
                    contact_email: $scope.contactEmail,
                    number_of_volunteers: $scope.numberOfVolunteers,
                    type_of_service_project: $scope.typeOfServiceProject
                }
            }).then(function successCallback(response){
                //console.log(response);
            }, function errorCallback(response) {
            });
        };

        $scope.postEmail = function() {
            $http({
                method: 'POST',
                url: 'http://34.193.243.89:3000/email/send',
                data: {
                    date: $scope.newDate,
                    year: $scope.year,
                    month: $scope.month,
                    day: $scope.day,
                    organization_name: $scope.organizationName,
                    contact_name: $scope.contactName,
                    phone_number: $scope.phoneNumber,
                    contact_email: $scope.contactEmail,
                    number_of_volunteers: $scope.numberOfVolunteers,
                    type_of_service_project: $scope.typeOfServiceProject
                }
            }).then(function successCallback(response){
                //console.log(response);
            }, function errorCallback(response) {
            });
        };

        /* event sources array*/
        $scope.eventSources = [$scope.events];
});