volunteerService.controller('CalendarController',
    function($scope, $compile, $timeout, uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.year;
        $scope.month;
        $scope.day;

        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        $scope.clickOnDate = function(date, jsEvent, view)
        {
            $scope.day = date.format('D');
            $scope.month = date.format('M');
            $scope.year = date.format('YYYY');
            // console.log($scope.day);
            // console.log($scope.month);
            // console.log($scope.year);
            // $scope.year = date.getYear();
            // $scope.month = date.getMonth();
            // $scope.day = date.getDay();
            $scope.addEvent();
            // alert('Clicked on: ' + date.format());
            //
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            //
            // alert('Current view: ' + view.name);
            //
            // // change the day's background color just for fun
            // $(this).css('background-color', 'red');
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
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
            // console.log($scope.day);
            // console.log($scope.month);
            // console.log($scope.year);
            var newDate = new Date($scope.year, $scope.month, $scope.day);
            console.log(d);
            console.log(m);
            console.log(y);
            console.log(newDate.getDate());
            // y = newDate.getFullYear();
            // m = newDate.getMonth();
            // d = newDate.getDate();
            console.log(d);
            console.log(m);
            console.log(y);
            $scope.events.push({
                title: 'Custom',
                start: new Date(y, m, $scope.day),
                className: ['newVolunteerService']
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
        /* Change View */
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
        /* config object */
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
                    //function(date, jsEvent, view) {
                    // $scope.events.push({
                    //     title: 'New Volunteer Service',
                    //     start: new Date(y, m, 28),
                    //     end: new Date(y, m, 29),
                    //     className: ['newVolunteerService']
                    // });
                    //addEvent();

                    // alert('Clicked on: ' + date.format());
                    //
                    // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    //
                    // alert('Current view: ' + view.name);
                    //
                    // // change the day's background color just for fun
                    // $(this).css('background-color', 'red');

                //}
                eventRender: $scope.eventRender
            }
        };

        // $scope.changeLang = function() {
        //     if($scope.changeTo === 'Hungarian'){
        //         $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        //         $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        //         $scope.changeTo= 'English';
        //     } else {
        //         $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //         $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        //         $scope.changeTo = 'Hungarian';
        //     }
        // };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    });
/* EOF */