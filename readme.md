#TrailLike

![map](http://images.nationalgeographic.com/wpf/media-content/richmedia/0/473/project/trail-maps/img/glacier-main-610.jpg)


##Scope


####Pitch
Trying to decide what trail to take on your next hike?  Too hard to figure out how steep your trail is from your paper map?  Let TrailLike help you and your friends make a choice!  Choose some trails, see how steep they are, and vote on them with your friends.

####Goal
TrailLike will provide a beautiful, secure, and well-built full-stack app solution with a map and other visualizations, and with a backend database, augmented with Firebase-hosted commenting to allow multiple users to pick and curate several trails of interest, see their elevation profiles and other details, vote on the choices, and allow others to see their selections.

##User Stories

####A general user without a login may:
- navigate to the app and see map and search bar
- search for a trail by name or near a location, and click on one found
- collect several trails into a trip
- see the chosen trail or trip added to the list and give it a name
- see the trail with a thumbnail of its elevation profile in a list of other trails 
- click the trail in the list to open a modal showing a 3D-like representation, the elevation profile, Google Street View images where present, nearby amenities, distance/travel time, carbon foot print, or other details
- sign up to use the features available to a logged in user
 
####A logged in user may:
- perform all the actions above
- receive an invitation from another user to use the app and log in to vote on a trail, or start their own trail selection process and invite others to join
- navigate to the app and see map, search bar, and any currently selected trails
- upvote or downvote the trail in the list
- see the votes of others
- add a comment to the trail item
- mark a the highest voted trail item as final which closes voting 

##Planning

<details><summary>Notes on development</summary>
######Breaking up the user stories above into tasks and technologies to test
Good advice: try the trail visulation piece first and back out to something simpler if it proves to challenging for the available time.

######Visualization Goal
Demonstrate a user interaction between a map, a profile, and Google Street View.

Needs: a map with a route, an elevation profile of that route, and Street Views at places along the route.
Should give a longitude/latitude that will change with user interaction at any of the three views whcih in turn change each of the other views

Don't forget to add referrer restrictions to Google SV Console so others can't use my streetview API

Then...
######Basic app
Rails, to build structure around users and their trips, votes, comments.
Angular mini-app in the front-end to handle search UI and voting
Firebase for commenting

######Map
Google or MapBox, query locations in radius around a search term or a clicked point

######Search
OuterSpatial API data queried by MapBox map interactions

######Concatenation
Link several trails together and treat as one.  Simple object concatenation?

######Add to List
Angular

######Trail display  
3D-like representation built in WebGL or MapBox tilt.  Show nearby amenities as icons from OuterSpatial.  Calculate 3D distance. Calculate travel time based on a metric that must already exist?  Calculate calories burned.  Build into a beautiful display.

######Generate elevation profile
Turn trail or concatenation of trails into an elevation profile.  Show using D3.

######Commenting
Build a Firebase backend to allow real-time comments and voting.  Show on the trail page and the main page.

######Users
bcrypt and auth and flash messages and restrictions on various pages

######Friendly URLs
Clean URLs for sharing trips

####MVP
Map with search putting results on a list.



</details>

<details><summary>Wireframes</summary>
![wireframe](https://ucarecdn.com/8ebec341-bc84-4563-9fcb-a99672b3334b/Wireframe.png =200x) 
![show](https://ucarecdn.com/5c2052c8-5e8b-4f07-ab06-e39f3f3578e8/ShowPage.jpg =200x)
![signup](https://ucarecdn.com/c20252cd-8dc1-45f7-a17b-511f2771a13c/SignUp.jpg =200x)
![profile](https://ucarecdn.com/a2e849fa-0965-4424-a5a4-71c57d8382fd/Profile.jpg =200x)
</details>

##Install

This is a web-hosted application. Please navigate to [link coming soon](http://google.com)

##Task List 
only partially completed

- [x] basic Angular app
- [x] View
- [ ] Firebase
- [ ] button to add trail - use OpenTrails API
- [ ] add trail list - use table module
- [ ] add modal
- [ ] add comment
- [ ] add voting
- [ ] add final to stop voting
- [ ] add map - use map module
- [ ] add trails - use OpenTrails
- [ ] convert trail geometry to elevation profile - use grid module, use loading module
- [ ] add share button functionality

##Technologies Used

- HTML/CSS/Javascript
- Bootstrap
- Angular
  - ngIf, ngSrc, ngController, ngApp, ngRepeat, ngModel
- Angular Modules
- Custom angular directive for parsing JSON
- Ruby on Rails
- Firebase to allow three-way data binding
   - or use  ActionCable  instead?
- embedded MapBox or OuterSpatial map
- OuterSpatial API
- more...


##Wish List
- overlay the trail profiles on each other, which would need to...
- recalculate the trail profiles based on a consistent y-axis among listed trails to enable an "apples-to-apples" comparison
- use WebGL, Three.js, or A-Frame to provide a 3D-like experience of the trail data
- link to OuterSpatial for data updating
- export trips to PDF Maps
- add photos taken with PDF Maps back into the app


