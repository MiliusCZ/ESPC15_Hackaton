# Goomer;) 
## Team members
- Karol Teliscak
- Milos Turek

## Application description
Goomer;) - Google-like Yammer knowledge search is an application which allows users to ask questions and search for validated answers. If no answer is found or user is not satisfied, he can post a new question through application iterface to Yammer.

## Deployment
For full functionality, you need a working Yammer account, a Yammer group for posting and reading the articles (change the groupId variable in demo-ng.js) and a Yammer topic to mark the notes as validated (change the validatedTagId variable in demo-ng.js).
To use application, simply copy all three directories to your Office365 SharePoint document library and open page http://path-to-library/src/demo-ng.aspx.
Then use the Login to Yammer button and you are good to go ;)

## Technology used
- Yammer API
- Yammer application authentication
- Bootstrap
- Angular.js

## Technology highlights
- Created Yammer application
- Authenticated using Yammer account
- Communcation with Yammer API (search.json - GET and messages.json - POST)
- Performance throttling to avoid reaching API limits
- Asynchronous calls
