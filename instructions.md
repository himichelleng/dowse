Get started with dowse
-------------------------------------
This is a boilerplate application for Node.js with Cloudant service.

The sample is a Favorites Organizer application, that allows users to organize and manage their files in different categories, while those files are persisted into the database in the background. This application supports uploading files of different types. In the sample, it clearly demonstrates how to access the database service that binds to the application using cradle node.js API.

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/buildingweb.html#install_cf).
2. [Download the starter application package](https://console-classic.ng.bluemix.net:443/rest/../rest/apps/5293a573-eb55-43ea-8fe6-4e7d52d7f08d/starter-download).
3. Extract the package and 'cd' to it.
4. Connect to Bluemix:

		cf api https://api.ng.bluemix.net

5. Log into Bluemix:

		cf login -u siuman.ng@gmail.com
		cf target -o siuman.ng@gmail.com -s dowse
		
6. Deploy your app:

		cf push dowse -c "node app.js" -m 512M

7. Access your app: [dowse.mybluemix.net](http://dowse.mybluemix.net)
